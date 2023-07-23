import React from 'react'
import CSRFToken from '../csrftoken'
import {specialtagstohtml,transformationforshow,inputTrigger} from '../elements/TextEditor'
import parse from "html-react-parser"
import axios from 'axios'

class AnswerForm extends React.Component {
	constructor(props) {
		super(props)
		this.sendForm = this.sendForm.bind(this)
		this.openConfirmWindow = this.openConfirmWindow.bind(this)
	}
	componentDidMount(){
	    if(this.props.id!=0){
	        let div_contenteditable = document.getElementById('editor_textarea'+this.props.id)
	        div_contenteditable.innerHTML = this.props.text
	    }
	}
	componentWillReceiveProps(nextProps, nextContext) {
	    if(nextProps.room.id!=this.props.room.id){
    		this.roomSocket = new WebSocket(
    				'ws://'+window.location.host+'/ws/room/'+nextProps.room.id)
    		this.roomSocket.onmessage = e => {
    				let data = JSON.parse(e.data);
    				let text = data['text']
    				let username = data['username']
    				let avatar = data['avatar']
    				let created_at = data['created_at']
    				let author_id = data['author_id']
    				let color = data['color']
    				let id = data['id']
                    this.props.set_new_answer({'id':id, 'text':text, 'author': {'id':author_id, 'name': username, 'avatar': avatar, 'color': color}, 'created_at': created_at, 'room': this.props.room.id})
    			    if(document.getElementById('new_answer_btn').classList.contains('hide')) {
    			        if(username!=this.props.user.profile_name) {
    			            document.getElementById('new_answer_btn').classList.remove('hide')
    			        }
    			    }
    		}
	    }
	}
	openConfirmWindow = () => {
	    this.props.set_confirm_object(this.props.id)
	    this.props.set_confirm_window('answerdeleteconfirm')
	}
    sendForm = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        let clear_form = () => {
            document.querySelector('#editor_textarea'+this.props.id).innerHTML=''
            if(this.props.id==0){
                inputTrigger()
            }
        }
        if(this.props.id!=0) {
            formData.append('edit_status', this.props.id)
        } else {
            formData.append('edit_status', 0)
        }
        let set_edit_res = (id,text) => {
            this.props.exec_res(text)
            localStorage.setItem('edit_res_answer'+id, text)
        }
        let sendAnswerSocketMsg = (data) => {
            if(this.roomSocket==undefined) {
                // на случай если по какой-то причине сокет не открылся
    		    this.roomSocket = new WebSocket(
    				'ws://'+window.location.host+'/ws/room/'+this.props.room.id)
            }
    		this.roomSocket.send(JSON.stringify({
    		    'type': 'new_answer',
                'text': data.text,
                'created_at': data.created_at,
                'username': data.author.name,
                'avatar': data.author.avatar,
                'color': data.author.color,
                'author_id': data.author.id,
                'id': data.id,
            }))
        }
        let create_answer = () => {
            $.ajax({
                type: 'post',
                url: '../api/create-answer/' + this.props.room.id,
                cache: false,
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    clear_form()
            		let line = document.querySelector('.progress-btn-line')
            		let send_btn = document.getElementById('send_btn')
            		send_btn.style.color = '#b9b5b5'
            		let width = 0
            		let its = 0
            		setInterval(()=>{
            		    if(its<10){
                		    width += 10
                		    line.style.width = width + "%"
            		    } else if(its==10){
            		        line.style.width = 0
            		        send_btn.style.color = '#8f8f91'
            		    }
            		    its++
            		},15)
                    if(data.edit_res!=undefined){
                        set_edit_res(data.answer.id,data.answer.text)
                    } else {
                        sendAnswerSocketMsg(data)
                        sendAppealEvent(data)
                        sendNewSavedRoomMsgEvent(data)
                    }
                },
                error: function (xhr, status, error) {
                    console.log(JSON.parse(xhr.responseText))
                }
            })
        }
        setTimeout(create_answer,300)
        
        
        //далее идут приключения с уведомлениями
        // общие функции: открытие сокета для пользователя по его id, закрытие сокета
        let openWsAndSendMsg = (type,data,recipient_id) => {
            if(this['userSocket' +  recipient_id]==undefined) {
                this['userSocket' +  recipient_id] = new WebSocket(
                	'ws://' + window.location.host + '/ws/user/' + recipient_id)
                this['userSocket' +  recipient_id].onopen = () => {
                    sendNotifEvent(type,data,recipient_id)
                }
            } else {
                sendNotifEvent(type,data,recipient_id)
            }
        }
        let closeWs = (id) => {
            this['userSocket' +  id].close()
            this['userSocket' +  id].onclose=()=>{console.log('ЗАКРЫЛСЯ СОКЕТ')}
        }
        let sendNotifEvent = (type,data,user_id) => {
            let author = {id:this.props.user.id,name:this.props.user.profile_name,avatar:this.props.user.profile_avatar}
            let notif_type = 0
            if(type=='saved_room_msg') {
                notif_type = 2
            } else if(type=='appeal') {
                notif_type = 1
            }
            let event_data = {
            	'recipients': user_id,
        		'object': data.object,
        	    'text': data.text,
        		'sender': {'id':author.id,'name':author.name,'avatar':author.avatar},
        		'created_at': data.created_at,
        	    'type': type,
        		'notif_type': notif_type,
        	}
            this['userSocket' + user_id].send(JSON.stringify(event_data))
        }
        let wsEvent = (type,data,recipient_id) => {
            let open_and_send = new Promise(function (resolve) {
              openWsAndSendMsg(type,data,recipient_id)
            })
        	open_and_send.then(user_id=>{
                closeWs(recipient_id)
            })
        }
        //уведомление обращения ->
        
        let sendAppealEvent = (data) => {
            //функция создания записи в бд
            let sendAppeal = (user_id, data) => {
                //данные, которые нам понадобятся->
                //аватар и имя автора(Profile),текст сообщения,id комнаты
            	let notification_data = {recipients:[user_id,],text:data.text,type:1,object:data.room}
        		$.ajax({
        			type: 'post',
        			url: window.location.origin+'/api/add-notification',
        			cache: false,
        			data: notification_data,
        			success: function (data) {
        			    wsEvent('appeal',data,user_id)
        			},
        			error: function (xhr, status, error) {
        				console.log(JSON.parse(xhr.responseText))
        			}
        		})   
            }
            //узнаем, есть ли в тексте сообщения обращение
            let regex = new RegExp('&lt;appeal to=([0-9]+) color=([a-z-]+)&gt;([^`]+?)&lt;/appeal&gt;','g')
            let text = formData.get('text')
            let test_to_appeal = regex.test(text)
            if(test_to_appeal){
                // если есть, извлечем id профиля участников, к которым обратились
                const id_list = text.match(/to=([0-9]+)/g);
                id_list.forEach((id) => {
                    let get_id = Number(id.match(/([0-9]+)/g))
                    //получим id пользователя, потому что уведомления должны отправлять по нему, а не по d профиля ->
                    axios.get('http://'+window.location.host+'/api/get-user-id-by-profile-id/'+get_id).then(res=>{
                        get_id = res.data.id
                        sendAppeal(get_id,data)
                    })
                })	
            }
        }
        
        //уведомление для тех, кто добавил эту комнату в закладки ->
        let sendNewSavedRoomMsgEvent = (data) => {
            let recipients = this.props.room.saved_by
            let room_name = this.props.room.name
            const index = recipients.indexOf(this.props.user.id)
            if (index > -1) {
              recipients.splice(index, 1);
            }
            if(recipients.length!=0) {
                let answer_data = {recipients:recipients,text:room_name,type:2,object:this.props.room.id}
            	$.ajax({
            		type: 'post',
            		url: window.location.origin+'/api/add-notification',
            		cache: false,
            		data: answer_data,
            		success: function (data) {
        			    data.recipients.forEach(member_id=>{
        			        wsEvent('saved_room_msg',data,member_id)
        			    })
            		},
            		error: function (xhr, status, error) {
            			console.log(JSON.parse(xhr.responseText))
            		}
            	}) 
            }
        }
    }
	render() {
        return (
            <form className="answer-textarea" onSubmit={this.sendForm}>
                {this.props.id==0?'':(<div className="text-btn delete-btn" onClick={this.openConfirmWindow}>Удалить</div>)}
                <CSRFToken/>
                <textarea className="hide" name="text" id="text" id={"answer_textarea"+this.props.id}></textarea>
                <button className='send-btn' id="send_btn">
                    {this.props.id!=0?'Сохранить':'Отправить'}
                    <div className="progress-btn-line"></div>
                </button>
            </form>
        )
	}
}

export default AnswerForm