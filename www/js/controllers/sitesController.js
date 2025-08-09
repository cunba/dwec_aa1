export class SitesController {
    constructor() {
        this.baseUrl = 'http://localhost:3000/sites'
    }

    getByCategoryId(categoryId, callback) {
        fetch(`${this.baseUrl}/category/${categoryId}`)
            .then(res => res.json())
            .then(callback)
            .catch(err => console.log(err))
    }

    create(site, callback) {
        fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: site
        })
            .then(callback)
            .catch(err => console.log(err))
    }

    delete(id, callback) {
        fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(callback)
            .catch(err => console.log(err))
    }
}