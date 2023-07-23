import React from 'react'
import GalaxyBlock_wrap from '../wraps/GalaxyBlock_wrap'
import SocialMenuUl from './SocialMenuUl'
import AdminBlock from './AdminBlock'
import MyGroups_wrap from '../wraps/MyGroups_wrap'
import CiteHeader_wrap from '../wraps/CiteHeader_wrap.js'
import InviteCreator from '../elements/InviteCreator'
import axios from "axios"
import { Link } from "react-router-dom"

class SocialMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hello: '',
		},
		this.checkType = this.checkType.bind(this)
	}
	checkType = (need_types) => {
	    return this.props.user_groups.filter(x=>need_types.indexOf(x)!=-1)!=0
	}
	componentDidMount(){
	    let MyDate = new Date
        let MyHours = MyDate.getHours()
        let name = ''
        switch (true){
        	case (MyHours >= 5) && (MyHours < 11):name = 'Доброе утро'
        	break
        	case (MyHours >= 11) && (MyHours < 16):name = 'Добрый день'
        	break
        	case (MyHours >= 16) && (MyHours <= 23):name = 'Добрый вечер'
        	break
        	case (MyHours >= 0) && (MyHours < 5):name = 'Доброй ночи'
        	break
        	default:name = 'Здравствуйте'
        	break
        }
		this.setState({
			hello: name
		})
	}
	render() {
	  return (
          <div className="social-menu">
			<main className="container">
			    <Link to="../" className="arrow-back"><i className="el-icon-back"></i></Link>
			    <h1>{this.state.hello}!</h1>
			    <div className="flex-container">
    			    <div className="col1">
                        <GalaxyBlock_wrap />
                        <SocialMenuUl />
                    </div>
    			    <div className="col2">
        		    	<h2><i className="el-icon-chat-square"></i> Специальные темы</h2>
        		    	<ul>
        		    	    <li><a href="http://45.9.42.12:8000/room/87" target="_blank">Знакомство</a></li>
        		    	    <li><a href="http://45.9.42.12:8000/room/110" target="_blank">Свобода слова</a></li>
        		    	    <li><a href="http://45.9.42.12:8000/room/96" target="_blank">Участие в оформлении</a></li>
        		    	    <li><a href="http://45.9.42.12:8000/room/108" target="_blank">Культура организационными средствами</a></li>
        		    	    <li><a href="http://45.9.42.12:8000/room/97" target="_blank">Обсуждение соглашения</a></li>
        		    	    <li><a href="http://45.9.42.12:8000/room/113" target="_blank">Возможность редактировать записи</a></li>
        		    	</ul>
        		    	{(this.checkType([3,4,5]))?(<MyGroups_wrap />):""}
        			</div>
    			</div>
    			{(this.checkType([3,4,5]))?(<AdminBlock />):""}
			</main>
          </div>
	  )
	}
}

export default SocialMenu
