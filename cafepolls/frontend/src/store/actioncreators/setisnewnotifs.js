import SET_IS_NEW_NOTIFS from '../actions/setisnewnotifs.js'

function set_is_new_notifs(value) {
    return {
        type: SET_IS_NEW_NOTIFS,
        value: value
    }
}

export default set_is_new_notifs