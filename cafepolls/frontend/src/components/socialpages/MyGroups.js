import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"

class MyGroups extends React.Component {
	constructor(props) {
		super(props)
		this.getGroup = this.getGroup.bind(this)
		this.getAgreement = this.getAgreement.bind(this)
	}
	getGroup = (type) => {
	    if(type==2) {
	        return 'Участник'
	    } else if(type==3) {
	        return 'Программист'
	    } else if(type==4) {
	        return 'Дизайнер'
	    } else if(type==5) {
	        return 'Модератор'
	    }
	}
	getAgreement = (group) => {
	    if(group==3) {
	        return 14
	    } else if (group==4) {
	        return 15
	    } else if (group==5) {
	        return 2
	    }
	}
	render() {
	  return (
          <div className="group-list">
            <p>Вы состоите в группах для администраторов</p>
			<ul>
				{this.props.user_groups.map((group, index) => {
				if([3,4,5].includes(group)) {
				    return (
        			    <li key={index}>
        			        <h3>{this.getGroup(group)}</h3>
        			        <div className="group-btns">
            			        <a href={"../documentation/"+this.getAgreement(group)} target="_blank">(соглашение)</a>
        			        </div>
        			    </li>
    			   )
				}
				})}
			</ul>
          </div>
	  )
	}
}

export default MyGroups
