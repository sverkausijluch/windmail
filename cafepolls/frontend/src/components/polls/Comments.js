import React from 'react'
import CommentForm from '../forms/CommentForm'
import CommentBlock from '../elements/CommentBlock'
import axios from "axios"

class Comments extends React.Component {
	constructor(props) {
		super(props)
		this.closeComments = this.closeComments.bind(this)
		this.createCommentEvent = this.createCommentEvent.bind(this)
	}
	closeComments = (e) => {
		this.props.set_comments_block('hide')
		this.props.set_comments([])
	}
	createCommentEvent = (text, created_at, username, avatar, id) => {
		this.commentsSocket.send(JSON.stringify({
            'text': text,
            'created_at': created_at,
            'username': username,
            'avatar': avatar,
            'id': id,
        }))
	}
	componentDidMount() {
		axios.get(window.location.origin+'/api/comments/'+this.props.active_poll.id).then(comments => {
			comments.data.forEach(comment=>(this.props.set_comment(comment)))
		}).then(()=>{
		    let block = document.getElementById("comments_field")
            block.scrollTop = block.scrollHeight
		})
		this.commentsSocket = new WebSocket(
				'ws://'+window.location.host+'/ws/comments/'+this.props.active_poll.id+'/')
			this.commentsSocket.onmessage = e => {
				let data = JSON.parse(e.data);
				let text = data['text']
				let name = data['username']
				let avatar = data['avatar']
				let created_at = data['created_at']
				let id = data['id']
                this.props.set_comment({'id':id, 'text':text, author: {'name': name, 'avatar': avatar}, 'created_at': created_at})
    		    let block = document.getElementById("comments_field")
                block.scrollTop = block.scrollHeight
			 }
	}
	componentWillReceiveProps(nextProps, nextContext) {
	    if(nextProps.active_poll!=this.props.active_poll){
	        this.commentsSocket.close()
	    }
	}
	render() {
	  return (
				<div className="comments-block">
					<div className="test">
						<header className="comments-header">
							<div className="backarrow" onClick={this.closeComments}><i className="el-icon-arrow-left"></i></div><h3>{this.props.active_poll.question}</h3>
						</header>
						<div className="comments-field" id="comments_field">
							{this.props.comments.map((comment, index) => {
										return (
											<CommentBlock key={comment.id} id={comment.id} text={comment.text} avatar={comment.author.avatar} name={comment.author.name} created_at={comment.created_at} />
										)
									  })}
						</div>
			  			<CommentForm poll_id={this.props.active_poll.id} createCommentEvent={this.createCommentEvent} />
					</div>
				</div>
	  )
	}
}

export default Comments
