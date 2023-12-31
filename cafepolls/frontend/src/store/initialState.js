const initialState = {
	window: 'no',
	main_section: '',
	new_main_section: '',
	comments_block: 'hide',
	comments: [],
	active_poll: {'id':0, 'options':[]},
    polls: [],
	sended_polls: 0,
	new_polls_count: 0,
	new_rooms_count: 0,
    tags: [],
	poll_section: 1,
	user: 0,
	voice_sended: 0,
	voices: [],
	voices_count: '',
	rooms: [],
	room_tags: [],
	poll_form_tags: [],
	rooms_form_tags: [],
	room_section: 1,
	room: {id: 0,author:{name:'',avatar:''},tags:[]},
	answers: [],
	new_answers: [{id:0},],
	poll_saved: 0,
	room_saved: 0,
	notifications: [],
	is_new_notifs: 0,
	main_search_str: '',
	active_section: 1,
	error: 0,
	user_groups: ['?'],
	confirm_object: 0,
	confirm_window: 'no',
	poll_edited: 0, // по сути это id нового опроса, чтобы подхватить его в PollHeader и PollOptions и установить опрос после создания или редактирования
}

export default initialState