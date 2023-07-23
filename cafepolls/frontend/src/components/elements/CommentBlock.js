import React from 'react'
import {specialtagstohtml} from './TextEditor'
import parse from "html-react-parser"

const CommentBlock = (props) => {
	let textshow = specialtagstohtml(props.text)
	let removeComment = () => {
		$.ajax({
            type: 'post',
            url: '/api/comments/delete/'+props.id,
            success: function(res){
	            document.getElementById('comment_block'+props.id).remove()
            }
        })
	}
	console.log(props)
    return (
        <div className="comment-block" id={"comment_block"+props.id}>
            <i className="el-icon-close" className="el-icon-remove-outline delete-btn" onClick={removeComment}></i>
            <img src={props.avatar} className="avatar"/>
            <h4>
                <span>{props.name}</span>
                <span className="date">{props.created_at}</span>
            </h4>
            <div className="text-zone">
                {parse(textshow)}
            </div>
        </div>
    )
}

export default CommentBlock