import React, {useEffect, useState} from 'react'
import TagFilter_wrap from "../wraps/TagFilter_wrap"
import TextEditor from "../elements/TextEditor"
import ColorsBlock from "../elements/ColorsBlock"
import Dropzone from '../elements/Dropzone'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const RoomsForm = (props) => {
	const [selected_color, setSelectedColor] = useState(props.room!=0?props.room.color:'gray')
	const formik = useFormik({
        initialValues: {
            name: props.room!=0?props.room.name:'',
        },
    })
    const useMountEffect = () => {
		useEffect(() => {
	        if(props.room!=0) {
	            let msg_text = document.getElementById('editor_textarea'+props.room.id).innerHTML = props.room.message
		        setSelectedColor(props.room.color)
	        }
		},[props.room])
	}
    useMountEffect()
	const createRoom = (e) => {
        let send_count = () => {
            props.set_new_rooms_count(props.new_rooms_count+1)
        }
                e.preventDefault()
                const formData = new FormData(document.getElementById('rooms_form'))
                let tags = props.rooms_form_tags
                for (let i = 0; i < tags.length; i++) {
                  formData.append('tags[]', tags[i])
                }
                formData.append('color', selected_color)
                if(props.room!=0) {
                    formData.append('room_id', props.room.id)
                } else {
                    formData.append('room_id', 0)
                }
                    $.ajax({
                        type: 'post',
                        url: '/api/create-room/',
                        cache: false,
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(data) {
                            if(props.room==0&&props.room_section=="2") {
                                send_count()
                            }
                            window.location.replace("http://"+window.location.host+"/room/"+data.room_id)
                        },
                        error: function(xhr){
                            if(xhr.status==500) {
                                window.location.replace("http://"+window.location.host+"/room/"+data.room_id)
                            }
                            let error_block = document.querySelector('#error_block')
                            let error_text = 'Возникла ошибка'
                            if(error_block.classList.contains('hide')) {
                                error_block.classList.remove('hide')
                            }
                            error_block.querySelectorAll('.err-msg').forEach(p=>p.remove())
                            let errors_list = JSON.parse(xhr.responseText)
                            for(let err in errors_list){
                                if(err=='name') {
                                    if(errors_list.name=="Убедитесь, что это значение содержит не более 100 символов.") {
                                        error_text = 'Название не должно содержать более 100 символов'
                                    }
                                    if(errors_list.name=="Это поле не может быть пустым.") {
                                        error_text = "Укажите название"
                                    }
                                }
                                if(err=='message') {
                                    if(errors_list.message=="Это поле не может быть пустым.") {
                                        error_text = "Введите текст сообщения"
                                    }
                                }
                                let p = document.createElement('p')
                                p.append(error_text)
                                p.classList.add('err-msg')
                            	error_block.append(p)
                            }
                        }
                    })
    }
    const openColorsWin = (e) => {
               let colors_block = document.getElementById('create_room_colors_block')
               if(colors_block.classList.contains('hide')) {
                   colors_block.classList.remove('hide')
               } else {
                   colors_block.classList.add('hide')
               }
    }
    const selectColor = (e) => {
        let color = e.target.getAttribute('data-colorname')
        let colors_block = document.getElementById('create_room_colors_block')
        setSelectedColor(color)
        let selected_color_block = document.getElementById('selected_color')
        selected_color_block.className = 'selected-design'
        selected_color_block.classList.add(color)
        colors_block.classList.add('hide')
    }
	const openConfirmWindow = () => {
	    props.set_confirm_object(props.room.id)
	    props.set_confirm_window('roomdeleteconfirm')
	}
    return (
            <div className="poll-form rooms-form">
                <form className="settings-form" id="rooms_form">
                    <div className="error-block hide" id="error_block">
                        <p>Не удалось отправить форму</p>
                    </div>
                    <div className="inputWrapper">
                        <label><span>Название</span></label>
                        <div className="inputBlock">
                            <input name="name" placeholder=" = ^ᴗ^ = " onChange={formik.handleChange} value={formik.values.name} />
                        </div>
                    </div>
                    <h5>Текст сообщения</h5>
                    <div className="answer-input">
                        <TextEditor content="roomsform" id={props.room==0?"0":props.room.id} text={props.room.message} />
                        <input className="hide" name="message" id={props.room==0?"roomsform_textarea0":"roomsform_textarea"+props.room.id} />
                    </div>
                    <Dropzone field="cover" class="file-input" />
                    <img src={props.room.cover} id="cover_img" />
                </form>
                <div className="inputWrapper">
                        <label><span>Оформление</span></label>
                        <div className="inputBlock">
                            <div className="design-select">
                                <div className={"selected-design " + selected_color} id="selected_color"> = ^ᴗ^ =</div>
                                <div className="select-design-btn">
                                    <span onClick={openColorsWin}>Выбрать цвет</span>
                                    <div id="create_room_colors_block" className="color-select-win hide">
                                        <ColorsBlock selectColor={selectColor} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <form className="settings-form" id="question_form">
                    <div className="inputWrapper">
                        <label><span>Теги</span></label>
                        <div className="inputBlock">
			  		        <TagFilter_wrap type="form" form_type="room" initTags={props.room!='0'?(props.room.tags):''} />
                        </div>
                    </div>
                </form>
                {props.room==0?'':(<span className="text-btn" onClick={openConfirmWindow}>Удалить комнату</span>)}
                <button className="send-btn" onClick={createRoom}>{props.room==0?'Создать':'Сохранить'}</button>
            </div>
    )
}

export default RoomsForm