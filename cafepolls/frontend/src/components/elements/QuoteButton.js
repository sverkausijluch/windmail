import React from 'react'
import '../../../static/frontend/quote.png'
import {specialtagstohtml,transformationforshow,inputTrigger} from './TextEditor'

class QuoteButton extends React.Component {
	constructor(props) {
		super(props)
		this.addQuote = this.addQuote.bind(this)
	}
	addQuote = () => {
        let div_textarea = document.getElementById('editor_textarea0')
        div_textarea.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = '<div style="background: #2b2c31; padding: 5px;">'+specialtagstohtml(this.props.text)+'<span style="font-size:.9em;">(-> <appeal to='+this.props.id+' color='+this.props.color+'>'+this.props.name+'</appeal>)</span></div>';
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        inputTrigger()
	}
	render() {
		return (
			<div className="btn" onClick={this.addQuote}>цитата</div>
		)
	}
}

export default QuoteButton