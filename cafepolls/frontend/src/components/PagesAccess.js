import React, {useEffect, useState} from 'react'
import axios from "axios"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Profile_wrap from './wraps/Profile_wrap'
import Main_wrap from "./wraps/Main_wrap"
import SocialMenu_wrap from './wraps/SocialMenu_wrap'
import Room from "./rooms/Room"
import Settings from "./user/Settings"
import ProfileSettings from "./user/ProfileSettings"
import SearchPage_wrap from "./wraps/SearchPage_wrap"
import DocumentationPage from "./documentation/DocumentationPage"
import MessagePage from "./user/MessagePage"
import Register from './user/Register'
import ProfileCreate from './user/ProfileCreate'
import DocImage from './documentation/DocImage'
import RegistrationCode from './user/RegistrationCode'
import WalkPage_wrap from "./wraps/WalkPage_wrap"

class PagesAccess extends React.Component {
  constructor(props) {
    super(props)
		this.state = {
			doc_access: 0,
			prevention_to: "",
		}
  }
  componentDidMount() {
        let setGroups = (value) => {
            this.props.set_groups(value)
        }
        let setUser = (value) => {
            this.props.set_user(value)
        }
        let setAccess = (groups) => {
            let pn = window.location.pathname.slice(1)
            let extractPn = pn.substr(0, pn.indexOf('/'))
            if(extractPn=='documentation') {
                let check = (checked_groups, user_groups) => {
                    return user_groups.filter(x=>checked_groups.indexOf(String(x))!=-1) != 0
                }
                let section_id = pn.replace(extractPn+'/','');
                axios.get(window.location.origin+'/doc/get-section-type/'+section_id).then(data => {
        			let types = data.data.groups
                    if(check(types, groups)) {
                        this.setState({
                			doc_access: 1
                		})
                    }
        		})
            }
        }
        let auth_pr = axios.get('http://'+window.location.host+'/api/get-user').catch(function (error) {
                setGroups([0])
                return Promise.reject(error)
            })
        let set_user_pr = auth_pr.then(user => {
        		let this_user = user.data
        		if(!this_user.profile) {
        		    setUser({id:this_user.id,name:this_user.username})   
        		    setGroups([1])
                    return Promise.reject('*Создайте профиль')
        		} else {
        		    setUser({id:this_user.id,name:this_user.username,profile_id:this_user.profile.id,profile_name:this_user.profile.name,profile_avatar:this_user.profile.avatar})   
        		    let get_groups = this_user.profile.groups
                    let new_groups = []
                    get_groups.forEach((group) => {
                        new_groups.push(group.type)
                    })
                    setGroups(new_groups)
                    setAccess(new_groups)
        		}
            })
  }
  render() {
    if((!this.state.prevention_to=='')&&(!(this.props.user_groups.includes(3)))&&(!(this.props.user_groups.includes(4)))&&(!(this.props.user_groups.includes(5)))) {
        return (
            <BrowserRouter>
            	<Routes>
                    <>
                        <Route path="*" element={<WalkPage_wrap code='4' prevention_to={this.state.prevention_to} />} />
                    </>
            	</Routes>
            </BrowserRouter>
        )
    }
    return (
        <BrowserRouter>
        	<Routes>
    		{(() => {
    		    if (this.props.user_groups.includes(2)){
    		    //основным участникам
        			return (
        			    <>
            			    <Route path="" element={<Main_wrap />} />
            			    <Route path="search" element={<SearchPage_wrap />} />
            			    <Route path="room/:room_id" element={<Room />} />
            			    <Route path="settings" element={<Settings />} />
            			    <Route path="profile-settings" element={<ProfileSettings />} />
            			    <Route path="social-menu" element={<SocialMenu_wrap />} />
            			    <Route path="illustration/:id" element={<DocImage />} />
            			    <Route path="profile/:id" element={<Profile_wrap />} />
        			        <Route path="change-email-email" element={<MessagePage type="change-email-email" />} />
            			    <Route path="password-email" element={<MessagePage type="password-email" />} />
            			    <Route path="*" element={<Main_wrap />} />
        			    </>  
        			 )
        		} else if (this.props.user_groups.includes(1)){
    		    //только для неподтвержденных
        			return (
        			    <>
        			        <Route path="registration-continue" element={<MessagePage type="registration-continue" />} />
                            <Route path="profile-create" element={<ProfileCreate isProfile={this.props.user.profile_id} />} />
                            <Route path="*" element={<MessagePage type="registration-continue" />} />
        			    </>  
        			 )
        		} else if (this.props.user_groups.includes(0)){
        		//не вошли
        		    return (
        			    <>
        			        <Route path="password-email" element={<MessagePage type="password-email" />} />
        			        <Route path="documentation/1" element={<DocumentationPage id="1" />} />
        			        <Route path="documentation/16" element={<DocumentationPage id="16" />} />
        			        <Route path="signup" element={<Register />} />
            			    <Route path="hello-i-invite-you" element={<RegistrationCode />} />
            			    <Route path="*" element={<WalkPage_wrap code='1' />} />
                        </>
                    )
        		} else {
        		    return ('')
        		}
        	})()}
    		{(() => {
    		    //для модераторов
        		if (this.state.doc_access){
        			return (
        			    <>
        		            <Route path="documentation/:item_id" element={<DocumentationPage />} />
        			    </>  
        			 )
        		} else {
        		    return (
        			    <>
        		            <Route path="documentation/:item_id" element={<WalkPage_wrap code='3' />} />
        			    </>  
        			 )
        		}
        	})()}
        	</Routes>
        </BrowserRouter>
    )
  }
}
export default PagesAccess
