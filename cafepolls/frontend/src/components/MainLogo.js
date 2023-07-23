import React from 'react'

class MainLogo extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
        return (
    		<div className="logo-block">
    		    <img src="../../static/frontend/middle-logo.png" className="main-logo" /> <span className="citenamelogo">Почта ветров</span>
    	    </div>
    	  )
	}
}

export default MainLogo
