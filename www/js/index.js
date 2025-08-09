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

    const removeCategoryBtn = document.getElementById('remove-category')
    removeCategoryBtn.onclick = onRemoveCategoryClicked

    const addSiteBtn = document.getElementById('add-site')
    addSiteBtn.onclick = onAddSiteClicked

    const submitCategoryBtn = document.getElementById('submit-category-btn')
    submitCategoryBtn.onclick = onSubmitCategoryClicked

    const categoryNameModal = document.getElementById('category-name-modal')
    categoryNameModal.onblur = validateNameField
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

const onRemoveCategoryClicked = () => {
    categoriesController.delete(currentCategory.id.split('-')[0], () => {
        currentCategory.remove()
        const parent = document.getElementsByClassName('categories-list')[0]
        const first = parent.firstElementChild
        onCategoryClicked({ target: first })
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

const onAddSiteClicked = () => {
    localStorage.setItem('categoryId', currentCategory.id.split('-')[0])
    window.location.href = 'add.html'
}

const onSubmitCategoryClicked = () => {
    const categoryName = document.getElementById('category-name-modal')

    if (categoryName.value === '' || categoryName.value === null || categoryName.value === undefined)
        categoryName.classList.add('is-invalid')
    else {
        categoriesController.create({ name: categoryName.value }, () => location.reload())
    }
}

const validateNameField = (event) => {
    const value = event.target.value
    const field = event.target

    if (value === '' || value === null || value === undefined)
        field.classList.add('is-invalid')
    else
        field.classList.remove('is-invalid')
}