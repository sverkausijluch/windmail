import React from 'react'
import Question_wrap from "../wraps/Question_wrap"
import Comments_wrap from "../wraps/Comments_wrap"

class Poll extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
	  return (
				<div className="poll-coll">
					{(() => {
							if (this.props.comments_block === 'hide') {
								return <Question_wrap />
							} else {
								return <Comments_wrap />
							}
					})()}
				</div>
	  )
	}
}

export default Poll
