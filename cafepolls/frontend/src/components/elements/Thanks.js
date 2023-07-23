import React from 'react'
import axios from "axios"

class Thanks extends React.Component {
	constructor(props) {
		super(props)
		this.sendThanks = this.sendThanks.bind(this)
		this.state = {
			is_sended: false,
		}
	}
	sendThanks = () => {
        let get_user_id = axios.get(window.location.origin+'/api/get-user-id-by-profile-id/'+this.props.answer.author.id).then(data => {
            return data.data.id
        })
        get_user_id.then(id=>{
    		let openWebsocket = () => {
    			let sendMsg = () => {
    			    let set_sended = () => {
    			        this.setState({
                			is_sended: true
                		})
    			    }
    				let send_event = (data) => {
    					let event_data = {
    						'recipients': data.recipients,
    						'object': data.object,
    						'text': data.text,
    						'sender': {'id':id,'name':this.props.user.profile_name,'avatar':this.props.user.profile_avatar},
    						'created_at': data.created_at,
    						'type': 'thanks',
    						'notif_type': data.type,
    					}
    					this['userSocket' + id].send(JSON.stringify(event_data))
    				
    				}
    				let closeWebsocket = () => {
    					this['userSocket' + id].close()
    				}
    				let ans_text = this.props.answer.text.substring(0, 100)
    				let author = id
    				let room = this.props.answer.room
    				let notification_data = {recipients:[author,],text:ans_text,type:0,object:room}
    				$.ajax({
    					type: 'post',
    					url: window.location.origin+'/api/add-notification',
    					cache: false,
    					data: notification_data,
    					success: function (data) {
    						let openWs = new Promise(function (resolve) {
    							send_event(data)
    							resolve()
    						})
    						openWs.then(closeWebsocket())
                			set_sended()
    					},
    					error: function (xhr, status, error) {
    						console.log(JSON.parse(xhr.responseText))
    					}
    				})
    			}
    			this['userSocket' + id] = new WebSocket(
    				'ws://' + window.location.host + '/ws/user/' + id)
    			this['userSocket' + id].onopen = function () {
    				sendMsg()
    			}
    		}
    		if(id !== this.props.user.id) {
    			openWebsocket()
    		} else {
    			alert("Пожалуйста!")
    		}
        })
	}
	render() {
		return (
		    <div className="btn" onClick={this.sendThanks}><i className="el-icon-star-off"></i> спасибо! {this.state.is_sended==true?(<img src="http://www.lenagold.ru/fon/clipart/z/zve/zvezd79.gif" className="send-success" />):""}</div>
		)
	}
}

export default Thanks