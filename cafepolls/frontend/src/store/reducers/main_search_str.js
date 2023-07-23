import SET_MAIN_SEARCH_STR from '../actions/setmainsearchstr.js'
import initialState from '../initialState.js'


export default function main_search_str(state=initialState.main_search_str, action) {
    switch(action.type) {
        case SET_MAIN_SEARCH_STR: return state = action.value
        default: return state;
    }
}
