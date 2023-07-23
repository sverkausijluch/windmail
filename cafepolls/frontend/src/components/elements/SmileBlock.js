import React from 'react'
const RandExp = require('randexp')
import {smiles} from '../../dictionaries/smiles'

class SmileBlock extends React.Component {
	constructor(props) {
		super(props)
		this.addSmile = this.addSmile.bind(this)
		this.updateEditor = this.updateEditor.bind(this)
		this.handleClickOutside = this.handleClickOutside.bind(this)
		this.wrapperRef = React.createRef()
	}
	componentDidMount() {
	    document.addEventListener("mousedown", this.handleClickOutside)
	}
	componentWillUnmount() {
	    document.removeEventListener("mousedown", this.handleClickOutside)
	}
	addSmile = (e) => {
	    let img = e.target.cloneNode(true)
        let div_textarea = document.getElementById('comment_text')
        div_textarea.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0),
        temp = document.createElement('div'),
        insertion = document.createDocumentFragment()
        temp.appendChild(img)
        while (temp.firstChild) {
			insertion.appendChild(temp.firstChild)
		}
        range.deleteContents()
        range.insertNode(insertion)
        selection.collapseToEnd()
        this.updateEditor()
	}
	updateEditor = () => {
        let div_textarea = document.getElementById('comment_text')
        let textarea = document.getElementById(this.props.content+'_textarea')
        let redactor_html = div_textarea.innerHTML
        textarea.value=redactor_html
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && event.target!=document.getElementById('.btn-icon')) {
            let block = document.getElementById('smile_block')
            if(!block.classList.contains('hide')) {
                block.classList.add('hide')
    		}
        }
	}
	render() {
	  return (
          <div className="smile-block" id="smile_block" ref={this.wrapperRef}>
            <ul>
                {smiles.map((smile, index) => {
                    return (
                        <li key={index}><img src={`/media/smiles/${smile.filename}`} onClick={this.addSmile} className="smile" /></li>
                    )
                })}
            </ul>
          </div>
	  )
	}
}

export default SmileBlock
