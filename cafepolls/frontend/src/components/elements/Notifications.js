import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import {specialtagstohtml,transformationforshow} from './TextEditor'
import parse from "html-react-parser"

class Notifications extends React.Component {
	constructor(props) {
		super(props)
		this.wrapperRef = React.createRef()
		this.handleClickOutside = this.handleClickOutside.bind(this)
	}
	componentDidMount() {
		axios.get(window.location.origin+'/api/get-notifications').then(notifications => {
			let notifications_list = notifications.data
			this.props.set_notifications(notifications_list)
		})
		axios.get(window.location.origin+'/api/is-new-notification').then(res => {
			if(res.data==1){
				this.props.set_is_new_notifs(1)
			}
		})
	    document.addEventListener("mousedown", this.handleClickOutside)
	}
	componentWillUnmount() {
	    document.removeEventListener("mousedown", this.handleClickOutside)
	}
	handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && event.target!=document.getElementById('notifications_btn')) {
            let notif_block = document.getElementById('notifications_block')
            if(!notif_block.classList.contains('hide')) {
                notif_block.classList.add('hide')
    		}
        }
	}
	render() {
		return (
			<div className="notifications-block hide" id="notifications_block" ref={this.wrapperRef}>
				<ul>
					{this.props.notifications.map((notification, index) => {
					    let text_for_notif = specialtagstohtml(notification.text)
						return (
							<li key={index}>
								<a href={`/room/${notification.object}`}>
									<div className="author">
										{notification.sender.name.length>13?(notification.sender.name.substring(0,15)+".."):notification.sender.name} <span className="date">{notification.created_at}</span>
										{notification.sender.avatar?(<img src={notification.sender.avatar} className="avatar" />):''}
									</div>
										{(() => {
											if (notification.type === 0) {
												return (
												    <p>
												        благодарит за ответ "{text_for_notif.length>99?parse(text_for_notif)+"..":parse(text_for_notif)}"
												    </p>
												    )
											} else if (notification.type === 1) {
												return (
												    <p>
												        {text_for_notif.length>99?parse(text_for_notif)+"..":parse(text_for_notif)}
												    </p>
												)
											} else if (notification.type === 2) {
												return (
												    <p>
												        отправляет сообщение в комнату "{text_for_notif.length>98?parse(text_for_notif)+"..":parse(text_for_notif)}"
												    </p>
												)
											} else {
												return (
													''
												)
											}
										})()}
								</a>
							</li>
						)
					})}
				</ul>
            </div>
		)
	}
}

export default Notifications