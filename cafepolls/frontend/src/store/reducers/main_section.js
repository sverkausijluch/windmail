import SET_MAIN_SECTION from '../actions/setmainsection.js'
import initialState from '../initialState.js'


export default function main_section(state=initialState.main_section, action) {
    switch(action.type) {
        case SET_MAIN_SECTION: return state = action.value
        default: return state;
    }
}
