import SET_POLL_EDITED from '../actions/setpolledited.js'

function set_poll_edited(value) {
    return {
        type: SET_POLL_EDITED,
        value: value
    }
}

export default set_poll_edited