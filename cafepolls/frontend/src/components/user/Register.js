import React from 'react'
import RegisterForm from './../forms/RegisterForm'
import CreatePoll_wrap from "../wraps/CreatePoll_wrap";

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			access: '?',
		}
	}
	componentDidMount() {
		let access = localStorage.getItem('access_to_register')
		if (!access) {
			window.location.replace("http://"+window.location.host)
		} else {
		    this.setState({
				access: 1
			})
		}
	}
	render() {
		return (
		    <>
		    {(() => {
		        if(this.state.access==1){
    		        return (
            			<main className="sm-container auth">
            				<div className="register-window">
            					<h1>Регистрация</h1>
            					<img
            						src="https://sun9-32.userapi.com/impg/ZOGhKPN1vjMz08IkETlGp0iX3XjE-40riUezaQ/A4m-sb2SEC0.jpg?size=736x460&quality=95&sign=53d681fa0cda7b07b02c1450852dfa57&type=album"
            						className="auth-header"/>
            					<RegisterForm/>
            				</div>
            			</main>
        			)
		        } else {
		            return ''
		        }
		    })()}
		    </>
		)
	}
}

export default Register
