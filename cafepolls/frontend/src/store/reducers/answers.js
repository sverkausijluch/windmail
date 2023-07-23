import SET_ANSWERS from '../actions/setanswers.js'
import ADD_ANSWER from '../actions/addanswer.js'
import initialState from '../initialState.js'


export default function rooms(state=initialState.answers, action) {
    switch(action.type) {
        case SET_ANSWERS: return state = action.value
        case ADD_ANSWER: return [...state,action.value]
        default: return state;
    }
}
