import SET_NEW_ANSWER from '../actions/setnewanswer.js'
import SET_NEW_ANSWERS from '../actions/setnewanswers.js'
import initialState from '../initialState.js'


export default function main_section(state=initialState.new_answers, action) {
    switch(action.type) {
        case SET_NEW_ANSWER: return [...state,action.value]
        case SET_NEW_ANSWERS: return state = action.value
        default: return state;
    }
}
