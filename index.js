{
    const personForm = document.querySelector('form')

    const renderItem = (name) => {
        console.log(name)
        const item = document.createElement('li')
        item.textContent = name
        return item
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const form = ev.target
        const roster = document.querySelector('.roster')

        const nameItem = renderItem(form.personName.value)
        roster.appendChild(nameItem)
    }

    personForm.addEventListener('submit', handleSubmit)
}