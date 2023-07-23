import React from 'react'
import {specialtagstohtml,transformationforshow,inputTrigger} from './TextEditor'

class AppealButton extends React.Component {
	constructor(props) {
		super(props)
		this.addAppeal = this.addAppeal.bind(this)
	}
	addAppeal = () => {
        let div_textarea = document.getElementById('editor_textarea0')
        div_textarea.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div');
        temp.textContent = '<appeal to='+this.props.id+' color='+this.props.color+'>'+this.props.name+', </appeal>';
        range.insertNode(temp.firstChild);
        selection.collapseToEnd()
        inputTrigger()
	}
	render() {
		return (
			<div className="btn" onClick={this.addAppeal}><i className="el-icon-chat-round"></i> ответить</div>
		)
	}
}

export default AppealButton