import React from 'react'
import axios from "axios"
import Notifications_wrap from "./wraps/Notifications_wrap"
import CiteMenu_wrap from "./wraps/CiteMenu_wrap"
import MainLogo from "./MainLogo"
import { Link, Navigate } from "react-router-dom"
import SearchHeaderForm_wrap from "./wraps/SearchHeaderForm_wrap"
import UserMenu from "./UserMenu"
import MediaQuery from 'react-responsive'
import '../../static/frontend/logo.png'

class SecondHeader extends React.Component {
	constructor(props) {
		super(props)
		this.showBlock = this.showBlock.bind(this)
		this.showNotifs = this.showNotifs.bind(this)
		this.wrapperRef = React.createRef()
		this.handleClickOutside = this.handleClickOutside.bind(this)
	}
	componentDidMount() {
			if (typeof this['userSocket' + this.props.user.id] == 'undefined') {
				this['userSocket' + this.props.user.id] = new WebSocket(
					'ws://' + window.location.host + '/ws/user/' + this.props.user.id)
			}	
			this['userSocket' + this.props.user.id].onmessage = (event) => {
				let notification = JSON.parse(event.data)
				notification['type'] = notification['notif_type']
				this.props.add_notification(notification)
				this.props.set_is_new_notifs(1)
			}
	    document.addEventListener("mousedown", this.handleClickOutside)
	}
	componentWillUnmount() {
	    document.removeEventListener("mousedown", this.handleClickOutside)
	    //this['userSocket' + this.props.user.id].close()
	}
	showNotifs = (e) => {
		let type = e.target.getAttribute('data-type')
		if(document.getElementById(type+'_block').classList.contains('hide')) {
			document.getElementById(type+'_block').classList.remove('hide')
    		if(this.props.is_new_notifs==1){
        		axios.get(window.location.origin+'/api/show-new-notifs').then(res => {
        			this.props.set_is_new_notifs(0)
        		})
    		}
		} else {
			document.getElementById(type+'_block').classList.add('hide')
		}
	}
	showBlock = (e) => {
		let type = e.target.getAttribute('data-type')
		if(document.getElementById(type+'_block').classList.contains('hide')) {
			document.getElementById(type+'_block').classList.remove('hide')
		} else {
			document.getElementById(type+'_block').classList.add('hide')
		}
	}
	handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && event.target!=document.getElementById('user_menu_btn')) {
            let menu_block = document.getElementById('profile_block')
            if(!menu_block.classList.contains('hide')) {
                menu_block.classList.add('hide')
    		}
        }
	}
	render() {
        return (
    			<header className="second-header">
    			    <MainLogo />
    				<CiteMenu_wrap />
    				<SearchHeaderForm_wrap />
    				<div className="profile-block">
    					<div className="flex-end">
    						<a href={"/profile/"+this.props.user.profile_id}><img src={this.props.user.profile_avatar} className="avatar" /></a>
    						<span className="name"><i className="el-icon-arrow-down" id="user_menu_btn" data-type="profile" onClick={this.showBlock}></i></span>
    						<i className={this.props.is_new_notifs?"el-icon-bell bell active-bell":"el-icon-bell bell"} id="notifications_btn" data-type="notifications" onClick={this.showNotifs}></i>
    					</div>
    					<div className="profile-menu hide" id="profile_block" ref={this.wrapperRef}>
    					    <UserMenu />
    					</div>
    					<Notifications_wrap />
    				</div>
    			</header>
    	  )
	}
}

export default SecondHeader
