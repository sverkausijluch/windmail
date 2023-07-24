import React from 'react'
import axios from "axios"
import PollHeader_wrap from '../wraps/PollHeader_wrap.js'
import PollOptions_wrap from '../wraps/PollOptions_wrap.js'
import PollFooter_wrap from '../wraps/PollFooter_wrap.js'

class Question extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
	  return (
				<div>
	            {(this.props.active_poll.id == 0)?
	                (<img src="https://media.tenor.com/k01wKFjpoyUAAAAC/cat-keyboard.gif" className="chio" />):
					(<div className="test question">
						<PollHeader_wrap />
						<PollOptions_wrap />
						<PollFooter_wrap />
					</div>)}
				</div>
	  )
	}
}

export default Question
