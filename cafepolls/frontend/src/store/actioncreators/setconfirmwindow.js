import SET_CONFIRM_WINDOW from '../actions/setconfirmwindow.js'

function set_confirm_window(value) {
    return {
        type: SET_CONFIRM_WINDOW,
        value: value
    }
}

export default set_confirm_window