export class Site {

    constructor(site) {
        this.id = site.id
        this.name = site.name
        this.url = site.url
        this.user = site.user
        this.password = site.password
        this.description = site.description
        this.categoryId = site.categoryId
        this.createdAt = site.createdAt
        this.updatedAt = site.updatedAt
    }

    drawSite(document, siteController) {
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
        createdAt.innerText = this.getDateParse(new Date(this.createdAt))
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
        actionsDelete.onclick = () => this.deleteSite(`${this.id}-${this.name}`, document, siteController)
        actions.appendChild(actionsDelete)

        parent.id = `${this.id}-${this.name}`
        parent.appendChild(actions)

        return parent
    }

    getDateParse = (date) => {
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
        var year = date.getFullYear()
        return day + '-' + month + '-' + year;
    }

    createSite(sitesController) {
        sitesController.create(JSON.stringify(this), () => window.location.href = 'index.html')
    }

    deleteSite(id, document, siteController) {
        siteController.delete(id.split('-')[0], () => {
            const site = document.getElementById(id)
                site.remove()
        })
    }
}