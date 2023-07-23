import SET_ERROR from '../actions/seterror.js'

function set_error(value) {
    return {
        type: SET_ERROR,
        value: value
    }
}

export default set_error