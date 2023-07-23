$('body').on('click', '.spoiler button', (e) => {
    e.preventDefault()
    let main = e.target.closest(".spoiler").querySelector('main')
    if(main.classList.contains('open-block')) {
        main.classList.remove('open-block')
    } else {
        main.classList.add('open-block')
    }
})