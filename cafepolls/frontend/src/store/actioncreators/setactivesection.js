import SET_ACTIVE_SECTION from '../actions/setactivesection.js'

function set_active_section(value) {
    return {
        type: SET_ACTIVE_SECTION,
        value: value
    }
}

export default set_active_section