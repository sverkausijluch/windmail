import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import './documentation.css'
import DocMenu_wrap from '../wraps/DocMenu_wrap.js'
import DocPageContent_wrap from '../wraps/DocPageContent_wrap.js'

class Documentation extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
	  return (
	    <>  
    		<header>
    		   <a href="http://45.9.42.12:8000/social-menu"><img src="https://cdn-icons-png.flaticon.com/512/3953/3953405.png" className="logo" /></a>
    		</header>
    		<div className="container">
            	<DocMenu_wrap />
            	<DocPageContent_wrap section_id={this.props.id} />
            </div>
        </>
	  )
	}
}

export default Documentation
