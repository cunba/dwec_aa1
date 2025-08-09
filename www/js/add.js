import { SitesController } from "./controllers/sitesController.js"
import { Site } from "./models/site.js"

let siteController

window.onload = () => {
    siteController = new SitesController()

    const cancelBtn = document.getElementsByClassName('cancel-btn')[0]
    cancelBtn.onclick = () => window.location.href = 'index.html'

    const saveBtn = document.getElementsByClassName('save-btn')[0]
    saveBtn.onclick = createSite

    const showPass = document.getElementsByClassName('show-pass')[0]
    showPass.onclick = showHidePass

    const autoPass = document.getElementsByClassName('autogenerate-pass')[0]
    autoPass.onclick = autogeneratePass

    const inputs = document.getElementsByTagName('input')
    for (const input of inputs) {
        input.onblur = validateInputs
    }
}

const createSite = (event) => {
    const inputs = document.getElementsByTagName('input')
    const data = {
        name: '',
        url: '',
        user: '',
        password: '',
        description: '',
        categoryId: ''
    }
    let isValid = true
    for (const input of inputs) {
        if (!validateInputs({ target: input }))
            isValid = false
    }

    if (isValid) {
        for (const input of inputs) {
            switch (input.id) {
                case 'name':
                    data.name = input.value
                    break
                case 'url':
                    data.url = input.value
                    break
                case 'user':
                    data.user = input.value
                    break
                case 'password':
                    data.password = input.value
                    break
            }
        }

        const description = document.getElementById('description')
        data.description = description.value

        const categoryId = localStorage.getItem('categoryId')
        data.categoryId = categoryId

        new Site(data).createSite(siteController)
    }
}

const showHidePass = () => {
    const input = document.getElementById('password')
    if (input.type === 'password')
        input.type = 'text'
    else
        input.type = 'password'
}

const autogeneratePass = () => {
    const input = document.getElementById('password')
    const symbols = ['.', '-', '_']
    let password = Math.random().toString(36).slice(6) + symbols[Math.floor(Math.random() * 3)] + Math.random().toString(36).slice(5)
    input.value = password

    input.classList.remove('is-invalid')
    const divFeedback = document.getElementsByClassName('invalid-pass')[0]
    divFeedback.innerHTML = ''
    divFeedback.style.display = 'none'
}

const validateInputs = (event) => {
    const input = event.target
    const value = event.target.value
    const id = event.target.id

    if ((value === '' || value === null || value === undefined) && id !== 'url') {
        input.classList.add('is-invalid')
        return false
    } else {
        input.classList.remove('is-invalid')
    }

    if (id === 'password') {
        if (value.length < 8) {
            input.classList.add('is-invalid')
            const divFeedback = document.getElementsByClassName('invalid-pass')[0]
            divFeedback.innerHTML = 'Password must have at least 8 characters'
            divFeedback.style.display = 'block'
            return false
        } else if (value.length > 16) {
            input.classList.add('is-invalid')
            const divFeedback = document.getElementsByClassName('invalid-pass')[0]
            divFeedback.innerHTML = 'Password must have less than 16 characters'
            divFeedback.style.display = 'block'
            return false
        } else if (!value.match(/^[\w.\-]*$/)) {
            input.classList.add('is-invalid')
            const divFeedback = document.getElementsByClassName('invalid-pass')[0]
            divFeedback.innerHTML = 'Password must contain only letters, numbers and at least one special characters (. - _)'
            divFeedback.style.display = 'block'
            return false
        } else {
            input.classList.remove('is-invalid')
            const divFeedback = document.getElementsByClassName('invalid-pass')[0]
            divFeedback.innerHTML = ''
            divFeedback.style.display = 'none'
        }
    }

    return true
}
