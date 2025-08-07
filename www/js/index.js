let currentCategory

let drawData = (data) => {
    data.forEach((category, index) => {
        let parent = document.getElementsByTagName('ul')[0]
        let child = document.createElement('li')
        // child.innerText = JSON.stringify(category)
        child.innerText = category.name
        child.id = category.name
        child.onclick = onCategoryClicked
        if (index === 0) {
            child.className = 'selected'
            currentCategory = child
        }
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

fetch("http://localhost:3000/categories")
    .then(res => res.json())
    .then(data => drawData(data))