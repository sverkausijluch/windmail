import React from 'react'
import axios from "axios"
import AnswerBlock from "../elements/AnswerBlock"
import CreateRoom_wrap from '../wraps/CreateRoom_wrap.js'
import ConfirmWindow_wrap from '../wraps/ConfirmWindow_wrap.js'

class RoomHeader extends React.Component {
	constructor(props) {
		super(props)
		this.openOptionsWin = this.openOptionsWin.bind(this)
		this.saveRoom = this.saveRoom.bind(this)
		this.wrapperRef = React.createRef()
		this.handleClickOutside = this.handleClickOutside.bind(this)
		this.roomLoad = this.roomLoad.bind(this)
		this.state = {
			answer: {
				'text': '',
				'created_at': '',
				'author': {},
			},
		}
	}
	componentDidMount() {
	    this.roomLoad(this.props.id)
	    document.addEventListener("mousedown", this.handleClickOutside)
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.id !== this.props.id) {
			this.roomLoad(nextProps.id)
		}
	}
	componentWillUnmount() {
	    document.removeEventListener("mousedown", this.handleClickOutside)
	}
	roomLoad = (id) => {
	    axios.get('http://'+window.location.host+'/api/room/' + id).then(room => {
    			this.props.set_room(room.data)
    			return room.data.id
    		}).then((roomid)=>{
        	    axios.get('../../api/is-room-saved/'+roomid).then(res => {
        	        this.props.set_room_saved(res.data)
        		})
    		}).then(()=>{
    			let answer = {
    				'text': this.props.room.message,
    				'created_at': this.props.room.created_at,
    				'author': this.props.room.author,
    				'room': this.props.id
    			}
    			this.setState({
    				answer: answer
    			})
    		}).then(()=>{
    		    $.ajax({
        			type: 'post',
        			url: '../api/send-view/'+this.props.room.id,
        			cache: false,
        			dataType: "json",
    		    })
    		})
	}
	handleClickOutside = (event) => {
	    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && event.target!=document.getElementById('options_btn')) {
            let block = document.getElementById('options_block')
            if(!block.classList.contains('hide')) {
                block.classList.add('hide')
    		}
        }
	}
	openOptionsWin = () => {
		let options_block = document.getElementById('options_block')
		if(options_block.classList.contains('hide')) {
			options_block.classList.remove('hide')
		} else {
			options_block.classList.add('hide')
		}
	}
	saveRoom = () => {
		let saved_status = this.props.room_saved
		let set_saved_status = (status) => {
			this.props.set_room_saved(status)
		}
		$.ajax({
			type: 'post',
			url: '../api/save-room/'+this.props.room.id,
			cache: false,
			data: {saved_status:saved_status},
			dataType: "json",
			success: function(data) {
				set_saved_status(data)
			},
			error: function(xhr){
				console.log(JSON.parse(xhr.responseText))
			}
		})
	}
	editRoom = () => {
	    this.props.set_window("editroom")
	}
	render() {
		return (
			<>
    			{(() => {
    				if (this.props.window === 'editroom') {
    					return <div className="shadow"><CreateRoom_wrap room={this.props.room}/></div>
    				} else {
    					return (
    						''
    				    )
    				}
    			})()}
    			{(() => {
    			    if (this.props.confirm_window === 'roomdeleteconfirm') {
    					return <div className="shadow"><ConfirmWindow_wrap operation="delete_room" /></div>
    				} else if (this.props.confirm_window === 'answerdeleteconfirm') {
    					return <div className="shadow"><ConfirmWindow_wrap operation="delete_answer" /></div>
    				} else {
    					return ('')
    				}
    			})()}
				{this.props.room.cover?(<img src={this.props.room.cover} className="room-cover-img" />):''}
				<div className="room-tags">
					{this.props.room.tags.map((tag, index) => {
						return (
							<li key={index} className="tag">
								{tag.name}
							</li>
						)
					})}
				</div>
				<header className="room-header">
					<div className="room-info">
						<h2 className={this.props.room.color+'-text'}>{this.props.room.name}</h2>
						<div className="options">
							<div className="options-field">
								<div className="options-btn" onClick={this.openOptionsWin} id="options_btn">опции темы</div>
								<div className="options-block hide" id="options_block" ref={this.wrapperRef}>
									<ul>
										<li onClick={this.saveRoom} className="underline-hover blue-text">{this.props.room_saved==1 ? 'сохранено' : 'в закладки'}</li>
										{this.props.room.author.name==this.props.user.profile_name ?
                                              (<li onClick={this.editRoom} className="underline-hover blue-text">редактированить</li>):""
                                          }
									</ul>
								</div>
							</div>
						</div>
					</div>
				</header>
				<div className="answers">
					<AnswerBlock answer={this.state.answer} />
				</div>
			</>
		)
	}
}

export default RoomHeader