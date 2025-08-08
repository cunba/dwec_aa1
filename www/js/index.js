let currentCategory

window.onload = () => {
    fetch("http://localhost:3000/categories")
        .then(res => res.json())
        .then(data => drawCategories(data))
}

let drawCategories = (data) => {
    data.forEach((category, index) => {
        let parent = document.getElementsByClassName('categories-list')[0]
        let child = document.createElement('li')
        // child.innerText = JSON.stringify(category)
        child.innerText = category.name
        child.id = category.name
        child.onclick = onCategoryClicked

        if (index === 0) {
            child.className = 'selected'
            currentCategory = child

            fetch(`http://localhost:3000/sites/categories/${category.name}`)
                .then(res => res.json())
                .then(data => drawSites(data))
                .catch(err => console.log(err))
        }
        parent.appendChild(child)
    })
}

let drawSites = (data) => {
    data.forEach(site => {
        let parent = document.getElementsByClassName('sites-table')[0]
        let child = new Site(site).drawSites(document)
        parent.appendChild(child)
    })
}

let onCategoryClicked = (event) => {
    console.log(currentCategory)
    const category = document.getElementById(event.target.id)
    category.className = 'selected'

    currentCategory.className = 'not-selected'
    currentCategory = category
}