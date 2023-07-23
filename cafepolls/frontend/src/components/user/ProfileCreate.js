import React from 'react'
import axios from "axios"
import ProfileCreateForm from './../forms/ProfileCreateForm'

class ProfileCreate extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount(){
	    console.log(this.props)
	    if(this.props.isProfile) {
	        window.location.replace("http://"+window.location.host)
	    }
	}
	render() {
	  return (
		  <main className="sm-container auth">
			  <ProfileCreateForm />
		  </main>
	  )
	}
}

export default ProfileCreate
