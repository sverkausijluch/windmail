import React from 'react'
import PollsFilter_wrap from '../wraps/PollsFilter_wrap.js'
import PollsList_wrap from "../wraps/PollsList_wrap"

class PollMenu extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
	  return (
	      <>
	        <PollsFilter_wrap/>
	        <PollsList_wrap />
	      </>
	  )
	}
}

export default PollMenu
