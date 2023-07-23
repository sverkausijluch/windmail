import React from 'react'

class NewAnswerScroll extends React.Component {
	constructor(props) {
		super(props)
		this.scrollEvent = this.scrollEvent.bind(this)
	}
	componentDidMount() {
	    window.addEventListener("scroll", this.scrollEvent)
	}
	componentWillUnmount() {
	    window.removeEventListener("scroll", this.scrollEvent)
	}
	scrollEvent = (event) => {
        let currentScroll = window.pageYOffset-30
        let ans_block = document.getElementById('answer_'+this.props.answer_id)
	    let answerTop = ans_block.getBoundingClientRect().top + window.scrollY
	    let answerBottom = ans_block.getBoundingClientRect().bottom + window.scrollY
	    if(currentScroll>=answerTop && currentScroll<=answerBottom) {
	        ans_block.classList.remove('new-answer')
	        if(!document.getElementById('new_answer_btn').classList.contains('hide')) {
	            document.getElementById('new_answer_btn').classList.add('hide')
	        }
	    }
	}
	render() {
		return (
		    <></>
		)
	}
}

export default NewAnswerScroll