import ADD_ANSWER from '../actions/addanswer.js'

function add_answer(value) {
    return {
        type: ADD_ANSWER,
        value: value
    }
}

export default add_answer