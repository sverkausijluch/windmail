import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import './documentation.css'

class Menu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			items: [{'name':'','groups':[],'section':[]}],
			active_item: 1,
		}
		this.setItem = this.setItem.bind(this)
		this.setActiveSection = this.setActiveSection.bind(this)
		this.checkType = this.checkType.bind(this)
	}
	checkType = (need_types) => {
	    return this.props.user_groups.filter(x=>need_types.indexOf(String(x))!=-1)!=0
	}
	componentDidMount(){
	    axios.get('http://'+window.location.host+'/doc/items').then(data => {
	        let items = data.data.items
			this.setState({
				items: items
			})
		})
	}
	setItem = (e) => {
	    let id = e.target.getAttribute('data-id')
	    this.setState({
	        active_item: id
	    })
	}
	setActiveSection = (e) => {
	    let id = e.target.getAttribute('data-id')
	}
	render() {
	  return (
    		    <div className="col1">
    		        {this.state.items.map((item, index) => {
    		            if(this.checkType(item.groups)){
    					    return (
        					    <ul key={index}>
                				    <h3 className={this.state.active_item==item.id ? 'active' : ''} onClick={this.setItem} data-id={item.id}>{item.name}</h3>
                        			<ul>{item.section!=0 && item.id == this.state.active_item ?(item.section.map((section, ind) => {
                        			    if(this.checkType(section.groups)){
                        				        return (
                        				            <li key={ind} data-id={section.id}><Link to={"../documentation/"+section.id}>{section.name}</Link></li>
                        				        )
                        			    }
                        			})):""}</ul>
                				</ul>
            				)
    		            }
        			})}
    		    </div>
	  )
	}
}

export default Menu
