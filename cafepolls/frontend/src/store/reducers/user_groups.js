import SET_GROUPS from '../actions/setgroups.js'
import initialState from '../initialState.js'


export default function user_groups(state=initialState.user_groups, action) {
    switch(action.type) {
        case SET_GROUPS: return state = action.value
        default: return state;
    }
}
