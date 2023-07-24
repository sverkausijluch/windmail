import React from 'react'

class PollFooter extends React.Component {
	constructor(props) {
		super(props)
		this.openComments = this.openComments.bind(this)
		this.sendVoice = this.sendVoice.bind(this)
		this.socketVoiceSend = this.socketVoiceSend.bind(this)
	}
	componentDidMount(){
	    this['pollSocket'+this.props.active_poll.id] = new WebSocket(
					'ws://' + window.location.host + '/ws/poll/' + this.props.active_poll.id + '/')
        this['pollSocket'+this.props.active_poll.id].onmessage = e => {
			this.props.send_voice(1)
		}
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.active_poll.id !== this.props.active_poll.id) {
			if (typeof this['pollSocket' + this.props.active_poll.id] !== 'undefined') {
				this['pollSocket' + this.props.active_poll.id].close()
			} //закрывает старые сокет при смене опроса и открываем новый ->
			this['pollSocket'+nextProps.active_poll.id] = new WebSocket(
					'ws://' + window.location.host + '/ws/poll/' + nextProps.active_poll.id + '/')
            this['pollSocket'+nextProps.active_poll.id].onmessage = e => {
    			this.props.send_voice(1)
    		}
	    }
	}
	openComments = (e) => {
		this.props.set_comments_block('open')
	}
	socketVoiceSend = (option_id) => {
	    console.log(this.props.active_poll.id)
	    this['pollSocket'+this.props.active_poll.id].send(JSON.stringify({'selected_option': option_id}))
	}
	sendVoice = (e) => {
		e.preventDefault()
		let socket_send = (option_id) => {
		    this.socketVoiceSend(option_id)
		}
		let selected_option = document.getElementById('selected_option')
		let option_id = selected_option.getAttribute('data-id')
		let sending = () => {
                    $.ajax({
                        type: 'post',
                        url: './api/send-voice',
                        cache: false,
                        data: {option:option_id},
                        dataType: "json",
                        success: function(data) {
							socket_send(data.data.option)
                        },
                        error:  function(xhr, status, error){
                           console.log(JSON.parse(xhr.responseText))
                        }
                    })
		}
		setTimeout(sending(),5000)
	}
	render() {
	  return (
				<div>
                    <footer>
                        <span class="hide">{this.props.voice_sended}</span>
                        {this.props.voice_sended==0 ?
                            <button className="btn" onClick={this.sendVoice}>Ответить</button> : ''}
                        <p>Голосов отправлено: {this.props.voices_count}</p>
                    </footer>
                    <div className="to-comments" onClick={this.openComments}><span>комментарии</span></div>
				</div>
	  )
	}
}

export default PollFooter
