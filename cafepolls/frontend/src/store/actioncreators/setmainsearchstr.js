import SET_MAIN_SEARCH_STR from '../actions/setmainsearchstr.js'

function set_main_search_str(value) {
    return {
        type: SET_MAIN_SEARCH_STR,
        value: value
    }
}

export default set_main_search_str