export class Category {
    constructor(category) {
        this.id = category.id
        this.name = category.name
        this.createdAt = category.createdAt
        this.updatedAt = category.updatedAt
    }

    drawCategory(document, onCategoryClicked) {
        const child = document.createElement('li')
        child.innerText = this.name
        child.id = `${this.id}-${this.name}`
        child.onclick = onCategoryClicked

        return child
    }
}