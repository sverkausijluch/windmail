import React from 'react';

class ConfirmWindow extends React.Component {
	constructor(props) {
		super(props)
		this.closeConfirmWindow = this.closeConfirmWindow.bind(this)
		this.confirm = this.confirm.bind(this)
	}
	closeConfirmWindow = (e) => {
		this.props.set_confirm_window('no')
		document.querySelector('body').style.overflow = 'auto'
	}
	confirm = () => {
	    let id = this.props.confirm_object
	    if(this.props.operation=='delete_poll') {
    	    $.ajax({
                type: 'post',
                url: './api/delete-poll/'+id,
            })
            document.getElementById('poll'+id).remove()
	    } else if(this.props.operation=='delete_room') {
    	    $.ajax({
                type: 'post',
                url: '../api/delete-room/'+id,
            })
            window.location.replace("../")
	    } else if(this.props.operation=='delete_answer') {
    	    $.ajax({
                type: 'post',
                url: '../api/delete-answer/'+id,
            })
            document.getElementById('answer_'+id).remove()
	    }
		this.props.set_confirm_window('no')
		this.props.set_poll({'id':0, 'options':[]})
		document.querySelector('body').style.overflow = 'auto'
		this.props.set_window('no')
	}
	render() {
	  return (
		  <div className="confirm-window">
			  <i className="el-icon-close close-btn" onClick={this.closeConfirmWindow}></i>
			  <p>Действительно сделать это?</p>
			  <div className="btns">
    			  <div className="send-btn" onClick={this.confirm}>Ок</div>
    			  <div className="send-btn" onClick={this.closeConfirmWindow}>Отмена</div>
			  </div>
		  </div>
	  )
	}
}

export default ConfirmWindow
