import { Category } from './models/category.js'
import { Site } from './models/site.js'

let currentCategory

window.onload = () => {
    fetch("http://localhost:3000/categories")
        .then(res => res.json())
        .then(data => drawCategories(data))

    const addCategoryBtn = document.getElementById('add-category')
    addCategoryBtn.onclick = onAddCategoryClick

    const addSiteBtn = document.getElementById('add-site')
    addSiteBtn.onclick = onAddSiteClick
}

const drawCategories = (data) => {
    data.forEach((category, index) => {
        const parent = document.getElementsByClassName('categories-list')[0]
        const child = new Category(category).drawCategory(document, onCategoryClicked)

        if (index === 0) {
            child.className = 'selected'
            currentCategory = child

            fetch(`http://localhost:3000/sites/category/${category.id}`)
                .then(res => res.json())
                .then(data => drawSites(data))
                .catch(err => console.log(err))
        }
        parent.appendChild(child)
    })
}

const drawSites = (data) => {
    data.forEach(site => {
        let parent = document.getElementsByClassName('sites-table')[0]
        let child = new Site(site).drawSite(document)
        parent.appendChild(child)
    })

}

const onCategoryClicked = (event) => {
    const category = document.getElementById(event.target.id)
    category.className = 'selected'

    currentCategory.className = 'not-selected'
    currentCategory = category
}

const onAddCategoryClick = (event) => {
    const button = event.target
}

const onAddSiteClick = (event) => {
    localStorage.setItem('categoryId', currentCategory.id.split('-')[0])
    window.location.href = 'add.html'
}