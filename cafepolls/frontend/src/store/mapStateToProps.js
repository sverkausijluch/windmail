function mapStateToProps(component) {
	switch (component) {
		case "PagesAccess": {
			return function (state) {
				return {
					user: state.user,
					user_groups: state.user_groups
				};
			}
		}
		case "SecondHeader": {
			return function (state) {
				return {
					user: state.user,
					is_new_notifs: state.is_new_notifs,
				};
			}
		}
		case "MobileSecondHeader": {
			return function (state) {
				return {
					user: state.user,
				};
			}
		}
		case "SecondHeader": {
			return function (state) {
				return {
					user: state.user,
				};
			}
		}
		case "SearchHeaderForm": {
			return function (state) {
				return {
					search_str: state.main_search_str
				};
			}
		}
		case "AnswerForm": {
			return function (state) {
				return {
					user: state.user,
					room: state.room,
				};
			}
		}
		case "Main": {
			return function (state) {
				return {
					window: state.window,
					confirm_window: state.confirm_window,
					user: state.user,
					main_section: state.main_section,
					new_main_section: state.new_main_section,
					active_poll: state.active_poll,
				}
			}
		}
		case "ConfirmWindow": {
			return function (state) {
				return {
					confirm_object: state.confirm_object,
				}
			}
		}
		case "CiteMenu": {
			return function (state) {
				return {
					main_section: state.main_section,
				}
			}
		}
		case "PollAppMobile": {
			return function (state) {
				return {
					active_poll: state.active_poll,
				}
			}
		}
		case "PollsFilter": {
			return function (state) {
				return {
					active_poll: state.active_poll,
					polls: state.polls,
					voices: state.voices,
					poll_section: state.poll_section,
					sended_polls: state.sended_polls,
					new_polls_count: state.new_polls_count,
				}
			}
		}
		case "PollsList": {
			return function (state) {
				return {
					polls: state.polls,
					poll_section: state.poll_section,
					tags: state.tags,
					new_polls_count: state.new_polls_count,
				}
			}
		}
		case "PollForm": {
			return function (state) {
				return {
					poll_form_tags: state.poll_form_tags,
					sended_polls: state.sended_polls,
					poll_edited: state.poll_edited
				}
			}
		}
		case "RoomsForm": {
			return function (state) {
				return {
					rooms_form_tags: state.rooms_form_tags,
					new_rooms_count: state.new_rooms_count,
					room_section: state.room_section,
				}
			}
		}
		case "RoomsHeader": {
			return function (state) {
				return {
					new_rooms_count: state.new_rooms_count,
				}
			}
		}
		case "Poll": {
			return function (state) {
				return {
					comments_block: state.comments_block
				};
			}
		}
		case "Question": {
			return function (state) {
				return {
					active_poll: state.active_poll,
					voice_sended: state.voice_sended,
					voices: state.voices,
					voices_count: state.voices_count,
				}
			}
		}
		case "PollHeader": {
			return function (state) {
				return {
					active_poll: state.active_poll,
					poll_saved: state.poll_saved,
					user: state.user,
					poll_edited: state.poll_edited
				}
			}
		}
		case "PollOptions": {
			return function (state) {
				return {
					active_poll: state.active_poll,
					voice_sended: state.voice_sended,
					voices_count: state.voices_count,
					voices: state.voices,
				}
			}
		}
		case "PollFooter": {
			return function (state) {
				return {
					active_poll: state.active_poll,
					voice_sended: state.voice_sended,
					voices: state.voices,
					voices_count: state.voices_count,
				}
			}
		}
		case "Comments": {
			return function (state) {
				return {
					active_poll: state.active_poll,
					comments: state.comments,
				}
			}
		}
		case "RoomList": {
			return function (state) {
				return {
					rooms: state.rooms,
					room_tags: state.room_tags,
					room_section: state.room_section,
					new_rooms_count: state.new_rooms_count,
				}
			}
		}
		case "TagFilter": {
			return function (state) {
				return {
					room_tags: state.room_tags,
					tags: state.tags,
				}
			}
		}
		case "RoomHeader": {
			return function (state) {
				return {
					room: state.room,
					room_saved: state.room_saved,
					window: state.window,
					user: state.user,
					confirm_window: state.confirm_window,
				}
			}
		}
		case "RoomAnswers": {
			return function (state) {
				return {
					answers: state.answers,
					new_answers: state.new_answers,
					user: state.user,
				}
			}
		}
		case "Thanks": {
			return function (state) {
				return {
					user: state.user,
				}
			}
		}
		case "Notifications": {
			return function (state) {
				return {
					notifications: state.notifications,
				}
			}
		}
		case "SearchPage": {
			return function (state) {
				return {
					search_str: state.main_search_str,
				}
			}
		}
		case "DocMenu": {
			return function (state) {
				return {
					active_section: state.active_section,
					user_groups: state.user_groups,
				}
			}
		}
		case "DocArticle": {
			return function (state) {
				return {
					user_groups: state.user_groups
				};
			}
		}
		case "SocialMenu": {
			return function (state) {
				return {
					user_groups: state.user_groups,
				}
			}
		}
		case "DocPageContent": {
			return function (state) {
				return {
					active_section: state.active_section,
				}
			}
		}
		case "WalkPage": {
			return function (state) {
				return {
					error: state.error
				};
			}
		}
		case "MyGroups": {
			return function (state) {
				return {
					user_groups: state.user_groups
				};
			}
		}
		case "GalaxyBlock": {
			return function (state) {
				return {
					user_groups: state.user_groups
				};
			}
		}
		default: return undefined;
	}
}

export default mapStateToProps;