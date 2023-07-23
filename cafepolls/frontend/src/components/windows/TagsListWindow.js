import React from 'react'
import TagFilter_wrap from "../wraps/TagFilter_wrap"

class TagsListWindow extends React.Component {
	constructor(props) {
		super(props)
		this.closeWindow = this.closeWindow.bind(this)
	}
	closeWindow = (e) => {
		this.props.set_window('no')
		document.querySelector('body').style.overflow = 'auto'
	}
	render() {
	  return (
		  <div className="big-window">
			  <header>
				 <h4><i className="el-icon-back" onClick={this.closeWindow}></i>Темы</h4>
			  </header>
			  <main>
    			  	<TagFilter_wrap type={this.props.type} initTags="yes" />
			  </main>
		  </div>
	  )
	}
}

export default TagsListWindow
