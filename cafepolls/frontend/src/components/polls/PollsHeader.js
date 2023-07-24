import React from 'react'
import MediaQuery from 'react-responsive'

class PollsHeader extends React.Component {
	constructor(props) {
		super(props)
		this.openCreatePollWindow = this.openCreatePollWindow.bind(this)
		this.openTagsWindow = this.openTagsWindow.bind(this)
	}
	openCreatePollWindow = (e) => {
		this.props.set_window('createpoll')
		document.querySelector('body').style.overflow = 'hidden'
	}
	openTagsWindow = (e) => {
		this.props.set_window('pollstagslist')
		document.querySelector('body').style.overflow = 'hidden'
	}
	render() {
		return (
			<>
				<div className="block-title">
					<h3>
						<img src="https://cdn-icons-png.flaticon.com/512/6961/6961057.png" className="small-icon" />
						Опросы
        			    <MediaQuery maxWidth={800}>
        			        <div className="btns">
            			        <div className="add-btn" onClick={this.openCreatePollWindow}><i className="el-icon-plus"></i></div>
            			        <div className="add-btn" onClick={this.openTagsWindow}>#</div>
        			        </div>
        			    </MediaQuery>
					</h3>
				</div>
			</>
		)
	}
}

export default PollsHeader