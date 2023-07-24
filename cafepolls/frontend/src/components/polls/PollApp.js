import React from 'react'
import MediaQuery from 'react-responsive'
import PollMenu from "./PollMenu"
import Poll_wrap from '../wraps/Poll_wrap.js'

class PollApp extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
	  return (
		<div className="poll-flex">
			<div className="col1">
				<PollMenu />
			</div>
			<Poll_wrap />
		</div>
	  )
	}
}

export default PollApp
