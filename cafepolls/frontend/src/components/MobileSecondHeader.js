import React from 'react'
import axios from "axios"
import Notifications_wrap from "./wraps/Notifications_wrap"
import { Link, Navigate } from "react-router-dom"
import SearchHeaderForm_wrap from "./wraps/SearchHeaderForm_wrap"
import MediaQuery from 'react-responsive'
import CiteMenu_wrap from "./wraps/CiteMenu_wrap"

class MobileSecondHeader extends React.Component {
	constructor(props) {
		super(props)
		this.showBlock = this.showBlock.bind(this)
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.user !== this.props.user) {
			if (typeof this['userSocket' + nextProps.user.profile_id] == 'undefined') {
				this['userSocket' + nextProps.user.profile_id] = new WebSocket(
					'ws://' + window.location.host + '/ws/user/' + nextProps.user.profile_id)
			}
			this['userSocket' + nextProps.user.profile_id].onmessage = (event) => {
				let notification = JSON.parse(event.data)
				notification['type'] = notification['notif_type']
				this.props.add_notification(notification)
				let kolokolchik = document.getElementById('notifications_btn')
				kolokolchik.style.color = '#6b99ad'
			}
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
	render() {
        return (
    			<header className="second-header">
    				<CiteMenu_wrap />
    				<div className="profile-block">
    					<div className="flex-end">
    					    <div className="search-btn">
    				            <Link to="search"><i className="el-icon-search"></i></Link>
    				        </div>
    					    <div className="profile-btn">
        						<a href={"/profile/"+this.props.user.profile_id}><img src={this.props.user.profile_avatar} className="avatar" /></a>
        						<span className="name"><i className="el-icon-arrow-down" data-type="profile" onClick={this.showBlock}></i></span>
    						</div>
    					    <div className="notif-btn">
    						    <i className="el-icon-bell bell" id="notifications_btn" data-type="notifications" onClick={this.showBlock}></i>
    					    </div>
    					</div>
    					<div className="profile-menu hide" id="profile_block">
    						<ul>
    							<li>
    							<Link to="./settings">
    							<i className="el-icon-setting"></i> Настройки
    							</Link>
    							</li>
    							<li><a href="./logout/"><i className="el-icon-mobile"></i> Выход</a></li>
    						</ul>
    					</div>
    					<Notifications_wrap />
    				</div>
    			</header>
    	  )
	}
}

export default MobileSecondHeader
