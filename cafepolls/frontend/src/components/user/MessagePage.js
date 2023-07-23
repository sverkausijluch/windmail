import React from 'react'
import { Link } from "react-router-dom"

class MessagePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
		}
	}
	componentDidMount(){
	    let msg_text = ''
	    if(this.props.type=='password-email') {
	        msg_text = 'Посмотрите почту, вам отправлена инструкция по смене пароля!'
	    } else if(this.props.type=='registration-continue') {
	        msg_text = 'Пожалуйста, подтвердите email. Для этого перейдите по ссылке, отправленной вам на почту.'
	    } else if(this.props.type=='change-email-email') {
	        msg_text = 'Пожалуйста, подтвердите смену почты. Для этого перейдите по ссылке, отправленной вам на почту.'
	    }
		this.setState({
			text: msg_text
		})
	}
	render() {
		return (
			<>
				<main className="center-container">
					<div className="text-block middle-content-block">
					    {this.props.type=='registration-continue'?(<img src="http://www.lenagold.ru/fon/clipart/g/griz/griz037.gif"/>):''}
					    {this.state.text}
					    {this.props.type=='registration-continue'?(<a href="/logout/">Выйти</a>):''}
					</div>
				</main>
			</>
		)
	}
}

export default MessagePage
