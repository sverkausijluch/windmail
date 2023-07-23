import SET_NEW_ANSWERS from '../actions/setnewanswers.js'

function set_new_answers(value) {
    return {
        type: SET_NEW_ANSWERS,
        value: value
    }
}

export default set_new_answers