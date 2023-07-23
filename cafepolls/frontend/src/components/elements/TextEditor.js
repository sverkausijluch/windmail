import React from 'react'
import './editor.css'
import ColorsBlock from '../elements/ColorsBlock'
import {smiles} from '../../dictionaries/smiles'
import Dropzone from './Dropzone'
import MediaQuery from 'react-responsive'
import parse from "html-react-parser"

export function specialtagstohtml(text) {
    let html = text.replace(new RegExp('&lt;appeal to=([0-9]+) color=([a-z-]+)&gt;([^`]+?)&lt;/appeal&gt;','g'),'<a href="../../profile/$1" class="$2-text">$3</a>')
    html = html.replace(new RegExp('&lt;img src="/media/smiles/([^`]+?).png" class="smile"','g'),'<img src="/media/smiles/$1.png" class="smile">')
    html = html.replace(new RegExp('&lt;img src="([^`]+?)" /&gt;','g'),'<img src="$1" class="answer-illustration">')
    html = html.replace(new RegExp('&lt;div&gt;&lt;/div&gt;','g'),'')
    html = html.replace(new RegExp('&lt;p&gt;&lt;/p&gt;','g'),'')
    html = html.replace(new RegExp('&lt;b&gt;&lt;/b&gt;','g'),'')
    html = html.replace(new RegExp('&lt;i&gt;&lt;/i&gt;','g'),'')
    html = html.replace(new RegExp('&lt;div class="spoiler"&gt;&lt;header&gt;([^`]+?)&lt;/header&gt;&lt;main&gt;([^`]+?)&lt;/main&gt;&lt;/div&gt;','g'),'<div class="spoiler"><header>$1</header><main>$2</main></div>')
    html = html.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"');
    return html
}
export function transformationforshow(text) {
    let html = text.replace(new RegExp('<div class="spoiler">([^`]*?)<header>([^`]+?)</header>([^`]*?)<main>([^`]+?)</main>([^`]*?)</div>','g'),'<div class="spoiler"><header>$2<button></button></header><main>$4</main></div>')
    return html
}
export function inputTrigger(text) {
    // используется для обновления редактора ответа в комнате
    // а именно в компонентах ./QuoteButton, ./AppealButton и в ../forms/AnswerForm
    let div_editable = document.getElementById('editor_textarea0')
    let event = new Event('input', {
        bubbles: true,
        cancelable: true,
    })
    div_editable.dispatchEvent(event)
}
class TextEditor extends React.Component {
	constructor(props) {
		super(props)
		this.setText = this.setText.bind(this)
		this.addSmile = this.addSmile.bind(this)
		this.addSpoiler = this.addSpoiler.bind(this)
		this.makeCursive = this.makeCursive.bind(this)
		this.makeBold = this.makeBold.bind(this)
		this.updateEditor = this.updateEditor.bind(this)
		this.addBlock1 = this.addBlock1.bind(this)
		this.addBlock2 = this.addBlock2.bind(this)
		this.addBlock3 = this.addBlock3.bind(this)
		this.addBlock4 = this.addBlock4.bind(this)
		this.openDesignWin = this.openDesignWin.bind(this)
		this.selectColor = this.selectColor.bind(this)
		this.onKeyDown = this.onKeyDown.bind(this)
		this.onMouse = this.onMouse.bind(this)
		this.setShowedStatus = this.setShowedStatus.bind(this)
		this.handleClickOutside = this.handleClickOutside.bind(this)
		this.inputTrigger = this.inputTrigger.bind(this)
		this.paste = this.paste.bind(this)
		this.wrapperRef = React.createRef()
		this.state = {
			design_win_status: 'hide',
			textarea_value: '',
			showed_status: 0,
		}
	}
	componentDidMount() {
	    if(this.props.id!=0) {
	        document.getElementById(this.props.content+'_textarea'+this.props.id).value = this.props.text
	    }
	    document.addEventListener("mousedown", this.handleClickOutside)
	    this.setState({
            textarea_value: document.getElementById(this.props.content+'_textarea'+this.props.id).value,
        })
    }
	componentWillUnmount() {
	    document.removeEventListener("mousedown", this.handleClickOutside)
    }
    inputTrigger() {
        let div_editable = document.getElementById('editor_textarea'+this.props.id)
        let event = new Event('input', {
            bubbles: true,
            cancelable: true,
        })
        div_editable.dispatchEvent(event)
    }
    onMouse = (e) => {
        e.preventDefault()
    }
    openDesignWin = (e) => {
        let win_type = e.target.getAttribute('data-type')
        if (this.state.design_win_status==win_type) {
            this.setState({
                design_win_status: 'hide',
            })
        } else {
            this.setState({
                design_win_status: win_type,
            })
        }
    }
    selectColor = (e) => {
        let color = e.target.getAttribute('data-colorcode')
        let div_textarea = document.getElementById('editor_textarea'+this.props.id)
        div_textarea.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = `<span style="color:${color}"></span>`
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.updateEditor()
        this.setState({
            design_win_status: 'hide'
        })
    }
    setText = (e) => {
        this.updateEditor()
    }
    addSmile = (e) => {
        let img = e.target.cloneNode(true)
        let div_textarea = document.getElementById('editor_textarea'+this.props.id)
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
        this.inputTrigger()
    }
    addSpoiler = (e) => {
        let div_textarea = document.getElementById('editor_textarea'+this.props.id)
        div_textarea.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = '<div class="spoiler"><header>заголовок</header><main>скрытый текст</main></div>'
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.inputTrigger()
    }
    addImage = (e) => {
        let div_textarea = document.getElementById('editor_textarea'+this.props.id)
        div_textarea.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div');
        temp.textContent = '<img src="?" />';
        range.insertNode(temp.firstChild);
        selection.collapseToEnd()
    }
    makeCursive = (e) => {
        let div_textarea = document.getElementById('editor_textarea'+this.props.id)
        div_textarea.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div');
        temp.textContent = '<i></i>';
        range.insertNode(temp.firstChild);
        selection.collapseToEnd()
    }
    makeBold = (e) => {
        let div_textarea = document.getElementById('editor_textarea'+this.props.id)
        div_textarea.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div');
        temp.textContent = '<b></b>';
        range.insertNode(temp.firstChild);
        selection.collapseToEnd()
    }
    addBlock1 = (e) => {
        let div_textarea = document.getElementById('editor_textarea'+this.props.id)
        div_textarea.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = '<div style="border-left: 3px solid rgb(66,178,247); padding: 5px; margin: 5px 0;"></div>'
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.inputTrigger()
    }
    addBlock2 = (e) => {

        let div_textarea = document.getElementById('editor_textarea'+this.props.id)
        div_textarea.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = '<div style="background: #2b2c31; padding: 5px; margin: 5px 0;"></div>'
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.inputTrigger()
    }
    addBlock3 = (e) => {
        let div_textarea = document.getElementById('editor_textarea'+this.props.id)
        div_textarea.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = '<div style="border-color: #6694a2; padding: 5px; margin: 5px 0;"></div>'
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.inputTrigger()
    }
    addBlock4 = (e) => {

        let div_textarea = document.getElementById('editor_textarea'+this.props.id)
        div_textarea.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = '<div style="background: #цвет;" class="color-block"></div>'
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.inputTrigger()
    }
    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            let div_textarea = document.getElementById('editor_textarea'+this.props.id)
            div_textarea.focus()
            let selection = window.getSelection(),
            range = selection.getRangeAt(0),
            temp = document.createElement('br'),
            insertion = document.createDocumentFragment()
            range.deleteContents()
            range.insertNode(insertion)
            selection.collapseToEnd()
            this.inputTrigger()
            return false
        }
        if (e.keyCode === 8) {
            this.inputTrigger()
        }
    }
    setShowedStatus = () => {
        if(this.state.showed_status == 1) {
            this.setState({
                showed_status: 0,
            })
        } else {
            this.setState({
                showed_status: 1,
            })
        }
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            let win_type = event.target.getAttribute('data-type')
            if (event.target==document.querySelector('.block-btn')) {
                
                if (this.state.design_win_status==win_type) {
                    this.setState({
                        design_win_status: 'hide',
                    })
                } else {
                    this.setState({
                        design_win_status: win_type,
                    })
                } 
            } else {
                this.setState({
                        design_win_status: 'hide',
                    })  
            }
        }
	}
	paste = (event) => {
	    event.preventDefault()
	    let div_textarea = document.getElementById('editor_textarea'+this.props.id)
        div_textarea.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = event.clipboardData.getData('text/plain')
        range.deleteContents()
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.inputTrigger()
	}
    updateEditor = () => {
        //мы выполняем вручную без использования state, потому что react реагирует на удаление объекта из div contenteditable ошибкой
        let div_textarea = document.getElementById('editor_textarea'+this.props.id)
        let textarea = document.getElementById(this.props.content+'_textarea'+this.props.id)
        let redactor_html = div_textarea.innerHTML
        textarea.value=redactor_html
        this.setState({
            textarea_value: redactor_html
        })
    }
	render() {
        return (
            <>
                <div className="input-header" id={"editor_for_"+this.props.content+"_"+this.props.id}>
                    <div className={this.state.design_win_status=='hide'?'hide':'redactor-design-win'} ref={this.wrapperRef}>
                        {(() => {
                            if (this.state.design_win_status==='colors') {
                              return <ColorsBlock selectColor={this.selectColor} />
                            } else if (this.state.design_win_status==='blocks') {
                                return(
                                    <ul>
                                        <li onClick={this.addBlock1}>с полоской</li>
                                        <li onClick={this.addBlock2}>с фоном</li>
                                        <li onClick={this.addBlock3}>с границей</li>
                                        <li onClick={this.addBlock4}>цветной квадрат</li>
                                    </ul>
                                )
                            } else if (this.state.design_win_status==='smiles') {
                                return(
                                    <ul>
                                        {smiles.map((smile, index) => {
                                            return (
                                                <li key={index}><img src={`/media/smiles/${smile.filename}`} onClick={this.addSmile} className="smile" /></li>
                                            )
                                        })}
                                    </ul>
                                )
                            }
                          })()}
                    </div>
                    <ul className="editor-menu">
                        <li data-title="курсив" onClick={this.makeCursive} onMouseDown={this.onMouse}><i className="el-icon-edit"></i></li>
                        <li data-title="жирный шрифт" onClick={this.makeBold} onMouseDown={this.onMouse}><i className="">B</i></li>
                        <li data-title="блок" className="block-btn"><i className="el-icon-menu" onClick={this.openDesignWin} data-type="blocks"></i></li>
                        <li data-title="цветной текст" className="block-btn"><img src="https://cdn-icons-png.flaticon.com/512/3953/3953405.png"  onClick={this.openDesignWin} data-type="colors" /></li>
                        <li data-title="изображение" onClick={this.addImage} onMouseDown={this.onMouse}><i className="el-icon-picture-outline"></i></li>
            			<li data-title="слайдер" onClick={this.addSpoiler}><i className="el-icon-files"></i></li>
            			<MediaQuery maxWidth={800}>
    					    <li data-title="блок" onMouseDown={this.onMouse}><img src="https://cdn-icons-png.flaticon.com/512/1656/1656373.png"  onClick={this.openDesignWin} data-type="smiles" /></li>
            			</MediaQuery>
                    </ul>
                </div>
                <div className="textarea-block">
                    <div contentEditable defaultValue="Введите текст" onInput={this.setText} onPaste={this.paste} className="editor-textarea" id={"editor_textarea"+this.props.id} onKeyDown={this.onKeyDown}></div>
        			<MediaQuery minWidth={801}>
                    <div className="smiles-block">
                        <ul>
                            {smiles.map((smile, index) => {
                                return (
                                    <li key={index}><img src={`/media/smiles/${smile.filename}`} onClick={this.addSmile} className="smile" /></li>
                                )
                            })}
                        </ul>
                    </div>
        			</MediaQuery>
                </div>
                <i className={this.state.showed_status==1?"i-btn el-icon-minus":"i-btn el-icon-view"} onClick={this.setShowedStatus}></i>
                <div className={this.state.showed_status==1?"showed-msg":"hide"} id={'showed_msg_'+this.props.id}>
                    {this.state.textarea_value==''?'[ ]':parse(transformationforshow(specialtagstohtml(this.state.textarea_value)))}
                </div>
            </>
        )
    }
}
export default TextEditor
