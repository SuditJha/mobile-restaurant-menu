import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// console.log(uuidv4());
const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        uuid: uuidv4(),
        id:1,
        price: 14,
        emoji: "🍕"
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        emoji: "🍔",
        uuid: uuidv4(),
        id:2
    },
        {
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        price: 12,
        emoji: "🍺",
        uuid: uuidv4(),
        id:3
    }
]

const orderArray = []

export  { menuArray, orderArray }