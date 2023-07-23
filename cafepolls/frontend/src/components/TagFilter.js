import React from 'react'
import axios from "axios"

class TagFilter extends React.Component {
	constructor(props) {
		super(props)
		this.selectTag = this.selectTag.bind(this)
		this.removeTag = this.removeTag.bind(this)
		this.tagSearch = this.tagSearch.bind(this)
		this.handleClickOutside = this.handleClickOutside.bind(this)
		this.appendTag = this.appendTag.bind(this)
		this.wrapperRef = React.createRef()
		this.state = {
			searched_tags: [],
			selected_tags: [],
			popular_tags: [],
		}
	}
	componentDidMount() {
	    document.addEventListener("mousedown", this.handleClickOutside);
		if(this.props.type=="rooms") {
			axios.get('http://'+window.location.host+'/api/popular-tags').then(tags => {
				this.setState({
					popular_tags: tags.data.tags
				})
			})
		}
		if(this.props.initTags){
		    if(this.props.form_type=='room') {
    		    this.props.initTags.forEach(tag=>{
                    this.props.set_rooms_form_tag(tag.id)
    		        this.appendTag(tag)
    		    })
		    } else if(this.props.form_type=='poll') {
    		    this.props.initTags.forEach(tag=>{
                    this.props.set_rooms_form_tag(tag_id)
    		        this.appendTag(tag)
    		    })
		    }
		} else {
		    let tags = []
		    if(this.props.type=='polls') {
		        tags = this.props.tags
		    } else {
		        tags = this.props.room_tags
		    }
		        let data = {tags: tags}
		        if(tags!=[]) {
    		        let setTags = (tags) => {
    		            tags.forEach(tag=>{
    		                this.appendTag(tag)
                        })
    		        }
    		        $.ajax({
                            type: 'post',
                            url: '/api/get-tags',
                            data: data,
                            success: function(data) {
                                setTags(data.tags)
                            },
                            error: function(xhr){
                                console.log(JSON.parse(xhr.responseText))
                            }
                        })
		    }
    	}
	}
	componentWillUnmount() {
	    document.removeEventListener("mousedown", this.handleClickOutside);
	}
	selectTag = (e) => {
		let tag_id = e.target.getAttribute('data-id')
		let tag_name = e.target.textContent
	    let tag = {id:tag_id,name:tag_name}
	    this.appendTag(tag)
        if(this.props.type == 'rooms') {
			if(this.props.room_tags.indexOf(tag_id ) == -1) { //почему не работает проверка
				this.props.set_room_tag(tag_id)
			}
		} else if (this.props.type == 'polls') {
			this.props.set_tag(tag_id) //нужна проверка на повторы
		} else if (this.props.type == 'form') {
			if(this.props.form_type == 'poll') {
				this.props.set_poll_form_tag(tag_id)
			}
			if(this.props.form_type == 'room') {
				this.props.set_rooms_form_tag(Number(tag_id))
			}
		}
	}
	appendTag = (tag) => {
	    let already_added = 0 //проверим, нет ли данного тега в списке, чтобы не повторяться
	    this.state.selected_tags.forEach(selected_tag=>{
	        if(selected_tag.id==tag.id) {
	            already_added = 1
	        }
	    })
	    if(already_added==0){  
    		this.setState(prevState => ({
                selected_tags: [...prevState.selected_tags, tag]
            }))
	    }
	}
	removeTag = (e) => {
		let tag_id = e.target.parentNode.getAttribute('data-id')
		let tag_name = e.target.parentNode.textContent
		let tag = {id:tag_id,name:tag_name}
		let new_arr = []
		this.state.selected_tags.forEach(tag=>{
		    if(tag.id!=tag_id){
		        new_arr.push(tag)
		        console.log(tag_id+'-'+tag.id)
		    }
		})
        this.setState({selected_tags: new_arr})
        if(this.props.type == 'rooms') {
			let selected_tags = this.props.room_tags
			let new_tags = selected_tags.filter(tag => tag !== tag_id)
			this.props.set_room_tags(new_tags)
		} else if (this.props.type == 'polls') {
			let selected_tags = this.props.tags
			let new_tags = selected_tags.filter(tag => tag !== tag_id)
			this.props.set_tags(new_tags)
		} else if (this.props.form_type == 'room') {
			let selected_tags = this.props.tags
			let new_tags = selected_tags.filter(tag => tag !== tag_id)
            this.props.set_rooms_form_tags(new_tags)
		}
	}
	tagSearch = (e) => {
        let tags_block = document.getElementById(this.props.type+'_tags_block')
               if(tags_block.classList.contains('hide')) {
                   tags_block.classList.remove('hide')
			   }
			   if(e.target.value == '' || e.target.value == ' ') {
                   tags_block.classList.add('hide')
               } else {
                   let set_tag_list = (tags) => {
						this.setState({
							searched_tags: tags
						})
                   }
                    let data = {search_str: e.target.value}
                        $.ajax({
                                    type: 'post',
                                    url: '../api/room-tags-filter',
                                    cache: false,
                                    data: data,
                                    success: function(data) {
                                        set_tag_list(data.tags)
                                    },
                                    error: function(xhr, status, error){
                                        console.log(JSON.parse(xhr.responseText))
                                    }
                        })
			   }
    }
    handleClickOutside(event) {
            if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
                let tags_block = document.getElementById(this.props.type+'_tags_block')
                if(!tags_block.classList.contains('hide')) {
                    tags_block.classList.add('hide')
    			}
            }
    }
	render() {
	  return (
		  <>
            <div className="tag-search-block" ref={this.wrapperRef}>
				<input className={this.props.type=="form" ? ("tags-select-input") : ("tag-search")} placeholder="Выберите тэг" onChange= {this.tagSearch} />
				<div className="search-result hide tags-list" id={this.props.type+"_tags_block"} >
					<ul className="selected-tags">
						{this.state.searched_tags.map((tag, index) => {
							return (
								<li key={index} data-id={tag.id} onClick={this.selectTag}>
									{tag.name}
								</li>
							)
						})}
					</ul>
				</div>
				<ul className="">
						{this.props.tags.map((tag, index) => {
							return (
								<li key={index} data-id={tag.id} onClick={this.selectTag}>
									{tag.name}
								</li>
							)
						})}
				</ul>
            	<ul id={"selected_"+this.props.type+"_tags"} className="selected-tags">
            	    {this.state.selected_tags.map((tag, index) => {
						return (
							<li key={index} data-id={tag.id}>
								{tag.name}  <i className="el-icon-minus remove-tag" onClick={this.removeTag}></i>
							</li>
						)
					})}
            	</ul>
			</div>
			  {this.props.type === 'rooms' ? (
				  	<>
				  		<div className="border-line"></div>
						<div className="tags-block">
							<h3>Частые темы</h3>
							<ul>
								{this.state.popular_tags.map((tag, index) => {
									return (
										<li key={index} data-id={tag.id} onClick={this.selectTag}>
											{tag.name}
										</li>
									)
								})}
							</ul>
						</div>
					</>
				  ) : ("")
			  }
		  </>
	  )
	}
}

export default TagFilter
