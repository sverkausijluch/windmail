import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import './mobile-documentation.css'
import DocMenu_wrap from '../wraps/DocMenu_wrap.js'
import DocPageContent_wrap from '../wraps/DocPageContent_wrap.js'

class MobileDocumentation extends React.Component {
	constructor(props) {
		super(props)
		this.openMenu = this.openMenu.bind(this)
		this.state = {
			menu: 0,
		}
	}
	componentDidMount(){
	}
	openMenu = (e) => {
	    if(this.state.menu == 0) {
    	    this.setState({
    	        menu: 1
    	    })
	    } else {
    	    this.setState({
    	        menu: 0
    	    })
	    }
	}
	render() {
	  return (
        <>
    		<header>
    		    <i className="el-icon-menu mobile-menu-btn" onClick={this.openMenu}></i>
    		    <a href="http://45.9.42.12:8000/social-menu"><img src="https://cdn-icons-png.flaticon.com/512/3953/3953405.png" className="logo" /></a>
    		</header>
    		<div className="container">
                <div className={this.state.menu==0?"hide":""}><DocMenu_wrap /></div>
            	<DocPageContent_wrap section_id={this.props.id} />
            </div>
        </>
	  )
	}
}

export default MobileDocumentation
