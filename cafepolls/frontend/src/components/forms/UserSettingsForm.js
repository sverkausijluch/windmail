import React, {useEffect, useState} from 'react'
import CSRFToken from '../csrftoken'
import axios from "axios"
import { Link } from "react-router-dom"

const UserSettingsForm = (props) => {
    let changePasswordEmail = () => {
        window.location.replace("../emails/create-password-operation")
    }
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    }
    const useMountEffect = () => {
		useEffect(() => {
			axios.get('http://'+window.location.host+'/api/get-user').then(profile => {
                console.log(profile)
                document.getElementById('email_field').value = profile.data.email
			})
		},[])
	}
    useMountEffect()
    let sendEmail = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        if(validateEmail(formData.get('email'))) {
            $.ajax({
                type: 'post',
                url: '../emails/change-email-operation',
                data: formData,
                processData: false,
                contentType: false,
                success: function () {
                    document.location.replace('../../change-email-email')
                },
                error: function (xhr, status, error) {
                    console.log(JSON.parse(xhr.responseText))
                }
            })
        } else {
            document.getElementById('email_error').innerHTML='Неверный формат email'
        }
    }
    return (
        <form className="settings-form" onSubmit={sendEmail}>
            <ul className="links">
                <li><a href="http://45.9.42.12:8000/room/100">Помощь</a></li>
                 <li><a href="http://45.9.42.12:8000/documentation/16">Информация о сообществе</a></li>
            </ul>
            <CSRFToken/>
            <div className="inputWrapper">
                <label><span>Почта</span></label>
                <input placeholder="Введите здесь" name="email" id="email_field" />
                <span id="email_error"></span>
            </div>
            <div className="inputWrapper">
                <label><span>Пароль</span></label>
                <div className="inputBlock">
                    *** <span className="text-btn" onClick={changePasswordEmail}>изменить</span>
                </div>
            </div>
            <footer>
                <button className="send-btn">Подтвердить</button>
            </footer>
        </form>
    )
}

export default UserSettingsForm