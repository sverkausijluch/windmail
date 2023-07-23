import SET_CONFIRM_OBJECT from '../actions/setconfirmobject.js'

function set_confirm_object(value) {
    return {
        type: SET_CONFIRM_OBJECT,
        value: value
    }
}

export default set_confirm_object