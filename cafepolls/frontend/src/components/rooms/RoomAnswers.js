import React from 'react'
import axios from "axios"
import AnswerBlock from "../elements/AnswerBlock"
import NewAnswers from "./NewAnswers"

class RoomAnswers extends React.Component {
	constructor(props) {
		super(props)
		this.getAnswerList = this.getAnswerList.bind(this) // загружаем список ответов
		this.showMoreAnswers = this.showMoreAnswers.bind(this) // показать больше ответов
		this.setSection = this.setSection.bind(this) // установить сортировку по новизне
		this.state = {
		    answers_count: 0,
			section: 2, //отвечает за сортировку по новизне. 1 - сначала новые, 2 - сначала старые
		}
	}
	componentDidMount() {
		this.getAnswerList(this.state.section, this.props.id) // загрузился компонент - получаем список ответов
	}
	componentWillUnmount() {
	    this.props.set_new_answers([])
	    // при закрытии страницы с комнатой обнуляются новые сообщения, иначе если зайдем в другую, они останутся
	}
	setSection = () => {
	    let new_section
		this.setState({
			answers_count: 0
		})
	    if(this.state.section==2){
	        new_section = 1
	    } else {
	        new_section = 2
	    }
		this.setState({
			section: new_section
		})
	    this.props.set_new_answers([])
		// список ответов загружается по новой, потому и счетчик обнуляется
		this.getAnswerList(new_section,this.props.id,0) //указываем 0 для showed, потому что в state записывать медленнее
	} 
	getAnswerList = (section=1,room_id=this.props.id,showed=this.state.answers_count) => {
		let set_answer_list = (answers, list_length) => {
			if (showed == 0) {
				this.props.set_answers(answers)
			} else {
				this.props.set_answers(this.props.answers.concat(answers))
			}
			if (list_length < 10) {
				document.querySelector('.show-more').classList.add('hide')
	            this.props.set_new_answers([])
			} else {
				document.querySelector('.show-more').classList.remove('hide')
			}
			let new_count = showed + list_length
			this.setState({
    			answers_count: new_count
    		})
		}
		let data = {section: section, showed_answers_count: showed}
		// section 1 - sorted -order, 2 - by order
		$.ajax({
			type: 'post',
			url: '../api/answers/' + room_id,
			cache: false,
			data: data,
			success: function (data) {
				set_answer_list(data.answers, data.answers_count)
			},
			error: function (xhr, status, error) {
				console.log(JSON.parse(xhr.responseText))
			}
		})
	}
	showMoreAnswers = () => {
		this.getAnswerList(this.state.section)
	}
	scrollToNew = (e) => {
	    let new_answer = document.querySelector('.new-answers')
	    window.scrollTo(0,new_answer.getBoundingClientRect().top + window.scrollY-80)
        document.querySelectorAll('.new-answer').forEach(block=>{
            block.classList.remove('new-answer')
        })
	}
	render() {
		return (
			<div className="answers">
				<header className="answers-header">
					<div className="filter"><span data-section={this.state.section} onClick={this.setSection} id="sort_status">{this.state.section==1?'сначала новые':'сначала старые'}</span> <i className="el-icon-arrow-down" onClick={this.setSection}></i></div>
					<h3>Ответы</h3>
				</header>
				{this.state.section==1?(<NewAnswers answers={this.props.new_answers} user={this.props.user.profile_id}/>):""}
				<div id="answer_list" data-count={this.state.answers_count}>
    				{this.props.answers.map((answer, index) => {
    					return (
    						<AnswerBlock key={answer.id} user={this.props.user.profile_id} answer={answer} new="0" />
    					)
    				})}
    				<div className="right-align">
    				    <div className="show-more" onClick={this.showMoreAnswers}>Показать больше записей</div>
    				</div>
    				{this.state.section==2?(<NewAnswers answers={this.props.new_answers} user={this.props.user.profile_id} />):""}
				</div>
				<div className="new-answer-btn hide" id="new_answer_btn" onClick={this.scrollToNew}><i className="el-icon-message"></i></div>
			</div>
		)
	}
}

export default RoomAnswers