import { CategoriesController } from './controllers/categoriesControlller.js'
import { SitesController } from './controllers/sitesController.js'
import { Category } from './models/category.js'
import { Site } from './models/site.js'

let currentCategory
let categoriesController
let sitesController

window.onload = () => {
    categoriesController = new CategoriesController()
    sitesController = new SitesController()

    categoriesController.getAll(drawCategories)

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

            sitesController.getByCategoryId(category.id, drawSites)
        }
        parent.appendChild(child)
    })
}

const drawSites = (data) => {
    data.forEach(site => {
        let parent = document.getElementsByClassName('sites-table')[0]

        let child = new Site(site).drawSite(document, sitesController)
        parent.appendChild(child)
    })

}

const onCategoryClicked = (event) => {
    const category = document.getElementById(event.target.id)
    category.className = 'selected'

    if (currentCategory !== category) {
        currentCategory.className = 'not-selected'
        currentCategory = category

        let parent = document.getElementsByClassName('sites-table')[0]
        let child = parent.lastElementChild;
        while (child) {
            parent.removeChild(child);
            child = parent.lastElementChild;
        }

        sitesController.getByCategoryId(category.id.split('-')[0], drawSites)
    }
}

const onAddCategoryClick = (event) => {
    const button = event.target
}

const onAddSiteClick = () => {
    localStorage.setItem('categoryId', currentCategory.id.split('-')[0])
    window.location.href = 'add.html'
}