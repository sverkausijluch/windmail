import SET_NEW_MAIN_SECTION from '../actions/setnewmainsection.js'
import initialState from '../initialState.js'


export default function new_main_section(state=initialState.new_main_section, action) {
    switch(action.type) {
        case SET_NEW_MAIN_SECTION: return state = action.value
        default: return state;
    }
}
