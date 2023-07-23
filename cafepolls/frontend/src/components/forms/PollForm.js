import React from 'react';
import TagFilter_wrap from "../wraps/TagFilter_wrap";

class PollForm extends React.Component {
	constructor(props) {
		super(props)
		this.createPoll = this.createPoll.bind(this)
		this.addForm = this.addForm.bind(this)
		this.deleteOption = this.deleteOption.bind(this)
		this.openConfirmWindow = this.openConfirmWindow.bind(this)
	}
	componentDidMount(){
	    if(this.props.poll!=0) {
    	    document.getElementById("poll_text").setAttribute('value',this.props.poll.question)
    	    this.props.poll.options.forEach((option,index)=>{
    	        let option_input = document.querySelectorAll('.option-input')[index]
    	        option_input.setAttribute('value',option.text)
    	    })
	    }
	}
	openConfirmWindow = () => {
	    this.props.set_confirm_object(this.props.poll.id)
	    this.props.set_confirm_window('polldeleteconfirm')
	}
    createPoll = (e) => {
        e.preventDefault()
        let set_sended_poll = (e) => {
            if(this.props.poll==0) {
                let sended_polls_count = this.props.sended_polls + 1
                this.props.set_sended_polls(sended_polls_count)
            }
        }
        let error_block = document.querySelector('#error_block')
        let is_option=0
        document.querySelectorAll('.option-input').forEach((input) => {
            if(input.value!='') {
                is_option=1
            }
        })
        if(is_option!=0) {
                const formData = new FormData(document.getElementById('question_form'))
                let tags = this.props.poll_form_tags
                for (let i = 0; i < tags.length; i++) {
                  formData.append('tags[]', tags[i])
                }
                if(this.props.poll!=0) {
                    formData.append('poll_id', this.props.poll.id)
                } else {
                    formData.append('poll_id', 0)
                }
                let hide_win = () => {
	                this.props.set_window('no')
		            document.querySelector('body').style.overflow = 'auto'
                }
                let set_poll_edited = (id) => {
                    this.props.set_poll_edited(id)
                }
                let new_poll = {}
                    $.ajax({
                        type: 'post',
                        url: './api/create-poll/',
                        cache: false,
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(res) {
                            new_poll = res.poll
                            set_sended_poll()
                            document.querySelectorAll('.option-form').forEach(function (form, idx, array) {
                                const formOptionsData = new FormData(form)
                                let inp_val = form.querySelector('input').value
                                formOptionsData.append('option_id', form.getAttribute('data-id'))
                                if(inp_val||res.edit_res) {
                                     $.ajax({
                                        type: 'post',
                                        url: './api/add-options/'+res.poll.id,
                                        cache: false,
                                        data: formOptionsData,
                                        processData: false,
                                        contentType: false,
                                        success: function(option_data) {
                                            if (idx === array.length - 1){
                                                set_poll_edited(0) // чтобы затем подхватить через полученные пропсы в PollHeader и PollOptions
                                                set_poll_edited(new_poll.id) // устанавливаем опрос в store
                                                hide_win()
                                            }
                                        }
                                    })
                                }
                            })
                        },
                        error: function(xhr){
                            let error_block = document.querySelector('#error_block')
                            let error_text = 'Возникла ошибка'
                            if(error_block.classList.contains('hide')) {
                                error_block.classList.remove('hide')
                            }
                            if(JSON.parse(xhr.responseText).question == "Это поле не может быть пустым.") {
                                let error_text = 'Введите вопрос'
                                let p = document.createElement('p')
                                p.append(error_text)
                                p.classList.add('err-msg')
                                error_block.append(p)
                            }
                        }
                    })
        } else {
            if(error_block.classList.contains('hide')) {
                error_block.classList.remove('hide')
            }
            let p = document.createElement('p')
            p.append('Введите хоть какой-нибудь вариант ответа')
            p.classList.add('err-msg')
            error_block.append(p)
        }
    }
    addForm = (e) => {
		let new_form = document.querySelector('.option-form').cloneNode(true)
		let id = new_form.getAttribute('data-id')
        let input = new_form.querySelector('input')
        input.value = ''
		new_form.setAttribute('data-id','0')
        document.querySelector('.option-forms').append(new_form)
    }
    deleteOption = (e) => {
        let id = e.target.getAttribute('data-id')
        document.getElementById('option_form'+id).classList.add('hide')
        let input = document.getElementById('option_id'+id)
		input.setAttribute('value','')
    }
    render() {
        return (
            <div className="poll-form">
                <form className="settings-form" id="question_form">
                    <div className="error-block hide" id="error_block">
                        <p>Не удалось отправить форму</p>
                    </div>
                    <div className="inputWrapper">
                        <label><span>Текст вопроса</span></label>
                        <div className="inputBlock">
                            <input name="question" id="poll_text" placeholder=" = ^ᴗ^ = "/>
                        </div>
                    </div>
                </form>
                <h5>Варианты ответа:</h5>
                {(() => {
    				if (this.props.poll == 0) {
    					return (
    					<div className="option-forms">
                            <form className="settings-form option-form" id="options_form0" data-id="0">
                                <div className="inputWrapper">
                                    <label><span>Вариант</span></label>
                                    <div className="inputBlock">
                                        <input name="text" className="option-input" placeholder=" = ^ᴗ^ = "/>
                                    </div>
                                </div>
                            </form>
                            <form className="settings-form option-form" id="options_form0" data-id="0">
                                <div className="inputWrapper">
                                    <label><span>Вариант</span></label>
                                    <div className="inputBlock">
                                        <input name="text" className="option-input" placeholder=" = ^ᴗ^ = "/>
                                    </div>
                                </div>
                            </form>
                        </div>
    				    )
    				} else {
    					return (
    					<div className="option-forms">
    					    {this.props.poll.options.map((option,index) => {
    					        return (
    					        <form className="settings-form option-form" id={"option_form"+option.id} data-id={option.id} key={index}>
                                    <div className="inputWrapper">
                                        <label><span>Вариант</span></label>
                                        <div className="inputBlock">
                                            <input name="text" id={"option_id"+option.id} className="option-input" placeholder=" = ^ᴗ^ = "/>
                                        </div>
                                        <div className="delete-option-btn"><i onClick={this.deleteOption} className="el-icon-delete" data-id={option.id} ></i></div>
                                    </div>
                                </form>
    					        )
    					    })}
                        </div>
    				    )
    				}
    			})()}
                <span className="text-btn" onClick={this.addForm}>добавить вариант</span>
                <form className="settings-form" id="question_form">
                    <div className="inputWrapper">
                        <label><span>Теги</span></label>
                        <div className="inputBlock">
			  		        <TagFilter_wrap type="form" form_type="poll" initTags={this.props.poll!='0'?(this.props.poll.tags):''} />
                        </div>
                    </div>
                </form>
                {this.props.poll==0?'':(<span className="text-btn" onClick={this.openConfirmWindow}>Удалить опрос</span>)}
                <button className="send-btn" onClick={this.createPoll}>{this.props.poll==0?'Создать':'Сохранить'}</button>
            </div>
        )
    }
}

export default PollForm