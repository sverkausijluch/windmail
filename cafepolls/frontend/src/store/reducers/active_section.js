import SET_ACTIVE_SECTION from '../actions/setactivesection.js'
import initialState from '../initialState.js'


export default function active_section(state=initialState.active_section, action) {
    switch(action.type) {
        case SET_ACTIVE_SECTION: return state = action.value
        default: return state;
    }
}
