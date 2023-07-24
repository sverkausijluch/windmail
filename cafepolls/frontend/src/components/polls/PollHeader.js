import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"

class PollHeader extends React.Component {
	constructor(props) {
		super(props)
		this.savePoll = this.savePoll.bind(this)
		this.setSavedStatus = this.setSavedStatus.bind(this)
		this.editPoll = this.editPoll.bind(this)
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.active_poll !== this.props.active_poll) {
    	    axios.get('http://'+window.location.host+'/api/is-poll-saved/'+nextProps.active_poll.id).then(res => {
    			this.props.set_poll_saved(res.data)
    		})
		}
		if (nextProps.poll_edited !== this.props.poll_edited) {
		    if(nextProps.poll_edited!=0) {
        		axios.get('http://'+window.location.host+'/api/poll/' + nextProps.poll_edited).then(poll => {
        			this.props.set_poll(poll.data)
        		})
		    }
		}
	}
	setSavedStatus = (status) => {
		this.props.set_poll_saved(status)
	}
	savePoll = () => {
	    let set_saved_status = (data) => {
	        this.setSavedStatus(data)
	    }
		let saved_status = this.props.poll_saved
		$.ajax({
			type: 'post',
			url: './api/save-poll/'+this.props.active_poll.id,
			cache: false,
			data: {saved_status:saved_status},
			dataType: "json",
			success: function(data) {
				set_saved_status(data)
			},
			error: function(xhr, status, error){
				console.log(JSON.parse(xhr.responseText))
			}
		})
	}
	editPoll = () => {
	    this.props.set_window("editpoll")
	}
	render() {
	  return (
          <header>
              <h3>{this.props.active_poll.question}</h3>
              <p className="author">Автор: <Link to={'/profile/'+this.props.active_poll.author.id}><span className="blue-text underline-hover">{this.props.active_poll.author.name}</span></Link></p>
              <p><span className="blue-text underline-hover" id="save_poll_btn" onClick={this.savePoll}>{this.props.poll_saved==1 ? 'сохранено' : 'в закладки'}</span></p>
              {this.props.active_poll.author.user.id==this.props.user.id ?
                  (<p><span className="blue-text underline-hover" id="save_poll_btn" onClick={this.editPoll}>редактировать</span></p>):""
              }
          </header>
	  )
	}
}

export default PollHeader
