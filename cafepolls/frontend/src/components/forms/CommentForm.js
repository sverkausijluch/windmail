import React, {useEffect, useState} from 'react'
import CSRFToken from '../csrftoken'
import SmileBlock from '../elements/SmileBlock'

const CommentForm = (props) => {
	const [smileShow, setSmileShow] = useState({})
           const sendForm = (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget)
                    $.ajax({
                        type: 'post',
                        url: '../api/create-comment/'+props.poll_id,
                        cache: false,
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(data) {
                            let div_textarea = document.getElementById('comment_text').innerHTML=''
                            let textarea = document.getElementById('comment_textarea').value=''
                            props.createCommentEvent(data.text, data.created_at, data.author.name, data.author.avatar, data.id)
                        },
                        error: function(xhr, status, error){
                            console.log(JSON.parse(xhr.responseText))
                        }
                    })
           }
           let openSmileBlock = () => {
                if(smileShow==1) {
                    setSmileShow(0)
                } else {
                    setSmileShow(1)
                }
           }
            let setText = (e) => {
                let div_textarea = document.getElementById('comment_text')
                let textarea = document.getElementById('comment_textarea')
                let redactor_html = div_textarea.innerHTML
                textarea.value=redactor_html
            }
        return (
                <form className="comment-textarea" onSubmit={sendForm}>
                    <CSRFToken />
                    {smileShow == 1?<SmileBlock content='comment' />:''}
                    <div className="textarea-block">
                        <div className="smile-btn" id="smile_block_btn"><img src="https://cdn-icons-png.flaticon.com/512/1656/1656373.png" className="btn-icon" onClick={openSmileBlock} /></div>
                        <textarea name="text" id="comment_textarea" defaultValue="Введите текст..."></textarea>
                        <div className="comment-textarea-div-wrap">
                            <div contentEditable defaultValue="Введите текст" onInput={setText} className="comment-textarea-div" id="comment_text"></div>
                        </div>
                    </div>
                    <button><i className="el-icon-s-promotion"></i></button>
                </form>
        )
}

export default CommentForm