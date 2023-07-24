import React from 'react'
import MediaQuery from 'react-responsive'
import PollMenu from "./PollMenu"
import Poll_wrap from '../wraps/Poll_wrap.js'

class PollAppMobile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			section: 'poll',
		}
		this.changeSection = this.changeSection.bind(this)
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.active_poll.id !== this.props.active_poll.id) {
    		this.setState({
    			section: 'poll'
    		})
		}
	}
	changeSection = () => {
	    if(this.state.section=="poll") {
    		this.setState({
    			section: 'menu'
    		})
	    } else {
	        this.setState({
    			section: 'poll'
    		})
	    }
	}
	render() {
	  return (
		<div className="poll-flex">
		    <div className="sections-btn col2" onClick={this.changeSection}><span className="section-title"><i className="el-icon-copy-document"></i> {this.state.section=='poll'?('меню'):('опрос')}</span></div>
			<div className="col1">
			    {this.state.section=='poll'?(<Poll_wrap />):(<PollMenu />)}
			</div>
		</div>
	  )
	}
}

export default PollAppMobile
