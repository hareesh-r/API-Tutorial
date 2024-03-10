const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
app.use(bodyParser.json());
app.use(cors());

let foods = [{
  "id": 1001,
  "name": "Idly",
  "description": "A traditional South Indian steamed cake made from fermented rice and black lentils.",
  "price": 30,
  "category": "Breakfast",
  "ingredients": ["Rice", "Black Lentils", "Salt", "Water"],
  "calories": 150,
  "allergens": ["Gluten"]
},
{
  "id": 1002,
  "name": "Dosa",
  "description": "A thin, crispy South Indian pancake made from fermented rice and black lentils batter.",
  "price": 40,
  "category": "Breakfast",
  "ingredients": ["Rice", "Black Lentils", "Fenugreek Seeds", "Salt", "Water"],
  "calories": 200,
  "allergens": ["Gluten"]
},
{
  "id": 1003,
  "name": "Poori",
  "description": "A deep-fried South Indian bread made from unleavened wheat flour dough.",
  "price": 50,
  "category": "Breakfast",
  "ingredients": ["Wheat Flour", "Salt", "Water", "Oil"],
  "calories": 250,
  "allergens": []
},{
  "id": 1004,
  "name": "Rice",
  "description": "A deep-fried South Indian bread made from unleavened wheat flour dough.",
  "price": 50,
  "category": "Lunch",
  "ingredients": ["Wheat Flour", "Salt", "Water", "Oil"],
  "calories": 250,
  "allergens": []
}
];

const reviews = [
  { id: 1001, foodId: 1001, rating: 4.5, comment: "Delicious dish!" },
  { id: 1002, foodId: 1001, rating: 5, comment: "Absolutely loved it!" },
  { id: 1003, foodId: 1002, rating: 4, comment: "Great taste!" },
  { id: 1004, foodId: 1004, rating: 3.5, comment: "Not bad, could be better." }
];


let gql = `
query {
    data {
      name
      price
      description
    }
  }  
`

// Get all foods
app.get('/foods', (req, res) => {
  const category = req.query.category;
  if (category) {
    console.log(category);
    const filteredFoods = foods.filter(food => food.category === category);
    res.json(filteredFoods);
  } else {
    res.json(foods);
  }
});

// Get a specific food by id
app.get('/foods/:id', (req, res) => {
  const foodId = parseInt(req.params.id);
  const food = foods.find(food => food.id === foodId);
  if (food) {
    res.json(food);
  } else {
    res.status(404).json({
      error: "Food not found"
    });
  }
});

// Route to get food items based on category query parameter
app.get('/foods', (req, res) => {
  const category = req.query.category;
  if (category) {
    console.log(category);
    const filteredFoods = foods.filter(food => food.category === category);
    res.json(filteredFoods);
  } else {
    res.json(foods);
  }
});

// Get reviews for a specific food
app.get('/foods/:foodId/reviews', (req, res) => {
  const foodId = parseInt(req.params.foodId);
  const foodReviews = reviews.filter(review => review.foodId === foodId);
  res.json(foodReviews);
});

// Create a new food
app.post('/foods', (req, res) => {
  const newFood = req.body;
  foods.push(newFood);
  res.status(201).json(newFood);
});

// Update a food
app.put('/foods/:id', (req, res) => {
  const foodId = parseInt(req.params.id);
  const updatedFood = req.body;
  let index = foods.findIndex(food => food.id === foodId);
  if (index !== -1) {
    foods[index] = updatedFood;
    res.json(updatedFood);
  } else {
    res.status(404).json({
      error: "Food not found"
    });
  }
});

// Delete a food
app.delete('/foods/:id', (req, res) => {
  const foodId = parseInt(req.params.id);
  let index = foods.findIndex(food => food.id === foodId);
  if (index !== -1) {
    foods.splice(index, 1);
    res.json({
      message: "Food deleted successfully"
    });
  } else {
    res.status(404).json({
      error: "Food not found"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});