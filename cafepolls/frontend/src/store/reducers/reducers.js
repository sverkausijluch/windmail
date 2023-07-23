import { combineReducers } from 'redux'
import active_poll from './active_poll'
import polls from './polls'
import window from './set_window'
import user from './user'
import comments from './comments'
import comments_block from './comments_block'
import tags from './tags'
import voice_sended from './voice_sended'
import voices from './voices'
import rooms from './rooms'
import room_tags from './room_tags'
import room from './room'
import answers from './answers'
import room_section from './room_section'
import poll_section from './poll_section'
import voices_count from './voices_count'
import poll_form_tags from './poll_form_tags'
import sended_polls from './sended_polls'
import new_polls_count from './new_polls_count'
import rooms_form_tags from "./rooms_form_tags"
import new_rooms_count from "./new_rooms_count"
import poll_saved from "./poll_saved"
import room_saved from "./room_saved"
import notifications from "./notifications"
import main_search_str from "./main_search_str"
import active_section from "./active_section"
import error from "./error"
import user_groups from "./user_groups"
import main_section from "./main_section"
import new_main_section from "./new_main_section"
import new_answers from "./new_answers"
import confirm_window from "./confirm_window"
import confirm_object from "./confirm_object"
import is_new_notifs from "./is_new_notifs"
import poll_edited from "./poll_edited"

const reducers = combineReducers({
    polls,
    active_poll,
    window,
    user,
    main_section,
    new_main_section,
    comments,
    comments_block,
    tags,
    poll_section,
    voice_sended,
    voices,
    rooms,
    room_tags,
    room,
    answers,
    room_section,
    voices_count,
    poll_form_tags,
    sended_polls,
    new_polls_count,
    rooms_form_tags,
    new_rooms_count,
    poll_saved,
    room_saved,
    notifications,
    main_search_str,
    active_section,
    error,
    user_groups,
    new_answers,
    confirm_object,
    confirm_window,
    is_new_notifs,
    poll_edited
})

export default reducers