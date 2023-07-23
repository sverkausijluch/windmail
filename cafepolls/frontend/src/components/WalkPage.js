import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

function WalkPage(props) {
	window.scrollTo(0, 0)
	const id  = props.code 
	const [error_msg, setErrorMsg] = useState({})
	const useMountEffect = () => {
		useEffect(() => {
	        setErrorMsg('')
            if(id=='1') {
                let a = document.createElement('a')
                a.setAttribute('href','http://windmail.ru:8000/login')
                a.innerHTML = 'Войдите'
                document.getElementById('error_msg').appendChild(a)
                setErrorMsg("Вы не авторизированы.")
            } else if (id=="2") {
                setErrorMsg('Какая-то непонятная ошибка возникла! Что бы это могло быть?')
            } else if (id=="3") {
                setErrorMsg('Ты не пройдешь! ( пока что у тебя нет доступа к этому ресурсу, надо что-то предпринять)')
            } else if (id=="4") {
	            const prevention_to  = props.prevention_to 
                setErrorMsg('Ведутся профилактические работы. Это продлится до '+prevention_to)
            }  else {
                setErrorMsg('Страница не найдена')
            }
          }, []);
	}
	useMountEffect()
  	return (
          <main className="error-page">
              <header className="error-msg-header"><i className="el-icon-warning-outline"></i> {id!='4'?'Ошибка :D':''} {String(error_msg)}<div id="error_msg"></div></header>
			  <img src="https://sun9-14.userapi.com/impg/A0UMZn5Km8tiG3MHFUytW-8DDqia2OM2UCdBWA/jEfXjU0haKs.jpg?size=736x832&quality=95&sign=9ad8ec5c6e398084f55f4ac15e473429&type=album" className="walk-img" />
			  <p>Для прогулки хороша любая погода! Почему бы тебе не прогуляться?</p>
          </main>
	)
}

export default WalkPage
