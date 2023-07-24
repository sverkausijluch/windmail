import React, {useEffect, useState} from 'react'
import axios from "axios"
import {useParams} from "react-router-dom"
import AnswerForm_wrap from '../wraps/AnswerForm_wrap'
import TextEditor from '../elements/TextEditor'

class RoomForm extends React.Component {
	constructor(props) {
		super(props)
		this.scrollEvent = this.editorSetBtnScroll.bind(this)
		this.openEditor = this.openEditor.bind(this)
		this.editorHide = this.editorHide.bind(this)
		this.btnHover = this.btnHover.bind(this)
		this.state = {
			btn_status: '',
			editor_status: ''
		}
	}
	componentDidMount() {
	    window.addEventListener("scroll", this.editorSetBtnScroll)
	}
	componentWillUnmount() {
	    window.removeEventListener("scroll", this.editorSetBtnScroll)
	}
	editorSetBtnScroll = (event) => {
            let currentScroll = window.pageYOffset
    	    let answersTop = document.getElementById('answer_list').offsetTop
    	    let answersHeight = document.getElementById('answer_list').offsetHeight
    	    let answersBottom = answersTop+answersHeight
    		if(answersBottom-80 < currentScroll) {
    		    this.setState({btn_status: 'hide'})
    		}
    		if(answersBottom - currentScroll >= 50) {
    		    this.setState({btn_status: ''})
    		}
    		let new_answers_block = document.querySelector('.new-answers')
	}
	openEditor = () => {
	    if(this.state.editor_status=='editor-opacity'|| this.state.editor_status=='') {
	        this.setState({editor_status:'fixed-editor'})
	        document.querySelector('.small-container').classList.add('special-pb')
	    } else {
	        this.setState({editor_status:''})
	        document.querySelector('.small-container').classList.remove('special-pb')
	    }
	}
	editorHide = () => {
	    if(this.state.editor_status!='fixed-editor') {
	        this.setState({editor_status:''})
	    }
	}
	btnHover = () => {
	    if(this.state.editor_status!='fixed-editor') {
	        this.setState({editor_status:'editor-opacity'})
	    }
	}
	render() {
		return (
	        <>
    	        <button onMouseEnter={this.btnHover} onMouseLeave={this.editorHide} onClick={this.openEditor} className={this.state.btn_status+' editor-btn'}><i className="el-icon-chat-round"></i></button>
        		<div className={this.state.editor_status + " answer-input"}>
        			<TextEditor content="answer" id="0" />
        			<AnswerForm_wrap id="0" />
        	  	</div>
    	  	</>
		)
	}
}

export default RoomForm
