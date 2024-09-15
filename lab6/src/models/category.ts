// src/models/category.ts
class Category {
    id: string;
    title: string;
    color: string;
    imageUrl: string;

    constructor(id: string, title: string, color: string, imageUrl: string) {
        this.id = id;
        this.title = title;
        this.color = color;
        this.imageUrl = imageUrl;
    }
}

export default Category;
