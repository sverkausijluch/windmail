import React from 'react'
import InviteCreator from '../elements/InviteCreator'
import axios from "axios"

class SocialMenuUl extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
	  return (
          <ul className="social-menu-ul">
            <InviteCreator />
            <li><a href="../documentation/1" target="_blank">Соглашение</a> -> его <a target="_blank" href="../room/97">обсуждение</a></li>
            <li><a href="../documentation/16" target="_blank">Описание приложения</a></li>
            <li><a href="../room/100" target="_blank">Помощь</a></li>
            <li><a href="../room/98" target="_blank">Объявления</a></li>
            <li><a href="../room/103" target="_blank">Предложения</a></li>
            <li><a href="../room/99" target="_blank">Сообщения об ошибках</a></li>
          </ul>
	  )
	}
}

export default SocialMenuUl
