// src/data/dummy-data.ts
import Category from '../models/category';

export const CATEGORIES = [
    new Category('c1', 'Thịt', '#f54242', 'https://i.pinimg.com/564x/d4/c9/1e/d4c91ec321c4ef800da38b65e387e1e0.jpg'),
    new Category('c2', 'Lẩu', '#f5428d', 'https://i.pinimg.com/564x/ce/4f/94/ce4f94ee5b9e4aa880e7630e481c276f.jpg'),
];

export const MEALS = [
    {
        id: 'm1',
        categoryIds: ['c1'],
        title: 'Thịt 1',
        description: 'Delicious Italian dish with creamy sauce.',
        isFavorite: false,
    },
    {
        id: 'm2',
        categoryIds: ['c1'],
        title: 'Thịt 2',
        description: 'Fresh sushi rolls with fish and vegetables.',
        isFavorite: true,
    },
    // Thêm nhiều món ăn khác...
];

export const LAU = [
    {
        id: 'm1',
        categoryIds: ['c2'],
        title: 'Lẩu 1',
        description: 'Delicious Italian dish with creamy sauce.',
        isFavorite: false,
    },
    {
        id: 'm2',
        categoryIds: ['c2'],
        title: 'Lẩu 2',
        description: 'Fresh sushi rolls with fish and vegetables.',
        isFavorite: true,
    },
    // Thêm nhiều món ăn khác...
];
