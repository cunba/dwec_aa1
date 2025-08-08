class Site {

    constructor(name, url, user, password, description) {
        this.name = name
        this.url = url
        this.user = user
        this.password = password
        this.description = description
    }

    constructor(site) {
        this.name = site.name
        this.url = site.url
        this.user = site.user
        this.password = site.password
        this.description = site.description
        this.categoryId = site.categoryId
        this.createdAt = site.createdAt
        this.updatedAt = site.updatedAt
    }

    drawSite(document, moment) {
        let parent = document.createElement('tr')

        let name = document.createElement('td')
        name.innerText = this.name
        name.className = 'name'
        parent.appendChild(name)

        let user = document.createElement('td')
        user.innerText = this.user
        user.className = 'user'
        parent.appendChild(user)

        let createdAt = document.createElement('td')
        createdAt.innerText = getDateParse(this.createdAt)
        createdAt.className = 'created-at'
        parent.appendChild(createdAt)

        let actions = document.createElement('td')
        actions.className = 'actions'

        let actionsOpen = document.createElement('img')
        actionsOpen.src = 'https://img.icons8.com/ios-filled/50/external-link.png'
        actionsOpen.title = 'open URL'
        actionsOpen.onclick = () => open(this.url)
        actions.appendChild(actionsOpen)

        let actionsDelete = document.createElement('img')
        actionsDelete.src = 'https://img.icons8.com/ios-filled/50/delete-sign.png'
        actionsDelete.title = 'delete'
        actionsDelete.onclick = this.deleteSite
        actions.appendChild(actionsDelete)

        parent.appendChild(actions)

        return parent
    }

    getDateParse = (date) => {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return year + '-' + month + '-' + day;
    }

    deleteSite() {
        fetch(
            `http://localhost:3000/sites/${this.name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
}