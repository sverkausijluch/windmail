import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import "../../../static/frontend/middle-logo.png"

class GalaxyBlock extends React.Component {
	constructor(props) {
		super(props)
		this.checkType = this.checkType.bind(this)
	}
	checkType = (need_types) => {
	    return this.props.user_groups.filter(x=>need_types.indexOf(x)!=-1)!=0
	}
	render() {
	  return (
          <div className="galaxy-block">
           <img src="../../../static/frontend/logo.png" />
           <ul>
                {(this.checkType([3,4,5]))?("Вы имеете доступ к администрированию сайта. Вам будет это полезно:"):''}
                {(this.checkType([3,4,5]))?(<li><a href="../documentation/6" target="_blank">Порядок внесения изменений</a></li>):''}
                {(this.checkType([3,4,5]))?(<li><a href="../room/114" target="_blank">Тема для администраторов</a></li>):''}
                {(this.checkType([3]))?(<li><a href="../documentation/10" target="_blank">Описание кода</a></li>):''}
                {(this.checkType([3]))?(<li><a href="../documentation/9" target="_blank">Дополнительные материалы для программистов</a></li>):''}
                {(this.checkType([5]))?(<li><a href="../documentation/17" target="_blank">Код для редакторов</a></li>):''}
                {(this.checkType([5]))?(<li><a href="../documentation/8" target="_blank">Материалы по организации сообщества</a></li>):''}
                {(this.checkType([3,4,5]))?(<li><a href="https://docs.google.com/spreadsheets/d/1YiAiInl6yhR5r6eHeVVgn0VWbyrqXM3PCXLxVsMc6PU/edit?usp=sharing" target="_blank">Таблица с предложениями</a></li>):''}
                {(this.checkType([3,4,5]))?(<li><a href="https://docs.google.com/spreadsheets/d/1wKa-P7NmFXJqWYtr7PsnOQDeBPVu2fqjCCtvS5PoEAw/edit?usp=sharing" target="_blank">Таблица: Заявки на внесение изменений</a></li>):''}
                {(this.checkType([3,4,5]))?(<li><a href="https://docs.google.com/spreadsheets/d/1xh70bWLXBhvwEo5Puolv7i3n1ZL9NdzJsLKMLwNUn88/edit?usp=sharing" target="_blank">Таблица: Блокнот изменений</a></li>):''}
                {(this.checkType([3]))?(<li><a href="https://cp.beget.com/vps/backup" target="_blank">Backup</a></li>):''}
            </ul>
          </div>
	  )
	}
}

export default GalaxyBlock
