import SET_NEW_ANSWER from '../actions/setnewanswer.js'

function set_new_answer(value) {
    return {
        type: SET_NEW_ANSWER,
        value: value
    }
}

export default set_new_answer