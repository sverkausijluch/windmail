import React, {useEffect, useState} from 'react'
import {specialtagstohtml,transformationforshow} from './TextEditor'
import parse from "html-react-parser"
import Thanks_wrap from "../wraps/Thanks_wrap"
import AppealButton from "./AppealButton"
import QuoteButton from "./QuoteButton"
import NewAnswerScroll from "./NewAnswerScroll"
import AnswerForm_wrap from '../wraps/AnswerForm_wrap'
import TextEditor from './TextEditor'

const AnswerBlock = (props) => {
    const [mode, setMode] = useState('answer')
    const [text, setText] = useState(props.answer.text)
    let textshow = transformationforshow(specialtagstohtml(props.answer.text))
	const useMountEffect = () => {
		useEffect(() => {
	        if(props.room!=0) {
	            let msg_text = document.getElementById('editor_textarea').innerHTML = props.room.message
                formik.setFieldValue('message', document.getElementById('editor_textarea').innerHTML)
		        setSelectedColor(props.room.color)
	        }
		},[props.room])
	}
	let setEdit = () => {
	    if (localStorage.getItem('edit_res_answer'+props.answer.id) !== null) {
            let new_text = localStorage.getItem('edit_res_answer'+props.answer.id, text)
            setText(new_text)
        }
	    setMode('edit')
	}
	let setRes = (new_text) => {
	    setMode('answer')
        setText(transformationforshow(specialtagstohtml(new_text)))
	}
	if(mode=='answer') {
    	return (
    		<div className={props.new==0?"answer":"answer new-answer"} id={props.answer.id!=undefined?'answer_'+props.answer.id:'answer_0'}>
    			<div className="author">
    				<img src={props.answer.author.avatar} />
    				<div className="author-info">
    					<a href={"../../profile/"+props.answer.author.id} className={"name "+props.answer.author.color+'-text'}>{props.answer.author.name}</a>
    				</div>
    			</div>
    			<div className="text">
    				<span className="date">{props.answer.created_at}</span>
    				<div id={'answer_text_'+props.answer.id} className="answer-text">
    					{props.answer.id==undefined?parse(textshow):parse(transformationforshow(specialtagstohtml(text)))}
    				</div>
    				<div className="answer-btns">
    					<Thanks_wrap answer={props.answer}/>
    					<QuoteButton text={props.answer.text} name={props.answer.author.name} color={props.answer.author.color} id={props.answer.author.id} />
    					<AppealButton name={props.answer.author.name} color={props.answer.author.color} id={props.answer.author.id} />
    					{props.user==props.answer.author.id&&props.answer.id!=undefined?(<div className="btn" onClick={setEdit}><i className="el-icon-edit"></i></div>):''}
    				</div>
    			</div>
    			{(() => {
    				if(props.new==1){
    					return (<NewAnswerScroll answer_id={props.answer.id} />)
    				}
    			})()}
    		</div>
    	)
	} else {
	    return (
	        <div className={props.new==0?"answer":"answer new-answer"} id={props.answer.id!=undefined?'answer_'+props.answer.id:'answer_0'}>
    			<div className="author">
    				<img src={props.answer.author.avatar}/>
    				<div className="author-info">
    					<a href={"../../profile/"+props.answer.author.id} className={"name "+props.answer.author.color+'-text'}>{props.answer.author.name}</a>
    				</div>
    			</div>
    			<div className="text">
        	        <div className={"answer-input"}>
        	            <div onClick={setRes} className="text-btn">Назад</div>
            	        <TextEditor content="answer" id={props.answer.id} text={text} />
                		<AnswerForm_wrap id={props.answer.id} exec_res={setRes} text={text} />
            		</div>
            	</div>
            </div>
	    )
	}
}

export default AnswerBlock