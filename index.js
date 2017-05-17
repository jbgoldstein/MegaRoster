{
    const personForm = document.querySelector('form')

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const form = ev.target
        const roster = document.querySelector('.roster')

        
    }

    personForm.addEventListener('submit', handleSubmit)
}