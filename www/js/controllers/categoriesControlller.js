export class CategoriesController {
    constructor() {
        this.baseUrl = 'http://localhost:3000/categories'
    }

    getAll(callback) {
        fetch(this.baseUrl)
            .then(res => res.json())
            .then(callback)
            .catch(err => console.log(err))
    }

    create(category, callback) {
        fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(category)
        })
            .then(callback)
            .catch(err => console.log(err))
    }
}