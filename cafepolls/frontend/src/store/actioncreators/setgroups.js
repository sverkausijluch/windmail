import SET_GROUPS from '../actions/setgroups.js'

function set_groups(value) {
    return {
        type: SET_GROUPS,
        value: value
    }
}

export default set_groups