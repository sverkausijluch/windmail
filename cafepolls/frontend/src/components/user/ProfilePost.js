import React from 'react'
import parse from "html-react-parser"

class ProfilePost extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<article className="post">
				<main>
					{this.props.profile.post_title?(<h2>{this.props.profile.post_title}</h2>):""}
					<p>{parse(this.props.profile.post_text)}</p>
					<img
						src={this.props.profile.post_image} />
				</main>
			</article>
		)
	}
}

export default ProfilePost
