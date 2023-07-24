import React from 'react'
import { Link } from "react-router-dom"

class InfoBlock extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
	  return (
			<div className="col2">
				<div className="info-block">
					<p className="questions">Интересные вопросы</p>
					<ul>
						<li><a href="http://45.9.42.12:8000/room/96">Поучаствовать в оформлении</a></li>
						<li><a href="http://45.9.42.12:8000/room/110">Свобода слова</a></li>
						<li><a href="http://45.9.42.12:8000/room/97">Обсуждение соглашения</a></li>
					</ul>
					<Link to="/social-menu"><h3>Админ-панель</h3></Link>
					<p className="questions" style={{ marginTop: '10px' }}><a href="http://45.9.42.12:8000/room/98">Объявления</a></p>
				</div>
			</div>
	  )
	}
}

export default InfoBlock
