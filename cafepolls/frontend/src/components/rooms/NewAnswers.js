import React from 'react'
import AnswerBlock from '../elements/AnswerBlock'

class NewAnswers extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount(){
	    let sort_section = document.getElementById('sort_status').getAttribute('data-section')
    	let new_answers_block = document.querySelector('.new-answers')
    	if(sort_section==1) {
    	    new_answers_block.classList.add('column-reverse')
    	} else {
    	    if(new_answers_block.classList.contains('column-reverse')) {
    	       new_answers_block.classList.remove('column-reverse')
    	    }
    	}
	}
	render() {
	    return(
	        <div className="new-answers">
        	    {this.props.answers.map((answer, index) => {
        	        if(answer.id!=0){
            			if(!document.body.contains(document.getElementById('answer'+answer.id))){
                			return (
                				<AnswerBlock key={answer.id} answer={answer} user={this.props.user} new="1" />
                			)
            			}
        	        }
        		})}
    		</div>
		)
	}
}

export default NewAnswers
