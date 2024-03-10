function getAllFoods() {
    fetch(`http://localhost:3000/foods`)
      .then(response => response.json())
      .then(data => console.log("All Foods:", data))
      .catch(error => console.error('Error:', error));
  }
  
  function getSpecificFood() {
    const foodId = prompt("Enter the food ID:");
    if (!foodId) return; // Exit if no input provided
    fetch(`http://localhost:3000/foods/${foodId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => console.log("Specific Food:", data))
      .catch(error => console.error('Error:', error));
  }
  
  function getFoodsByCategory() {
    const category = prompt("Enter the category:");
    if (!category) return; // Exit if no input provided
    fetch(`http://localhost:3000/foods?category=${category}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => console.log("Foods by Category:", data))
      .catch(error => console.error('Error:', error));
  }
  
  function getReviewsForFood() {
    const foodId = prompt("Enter the food ID:");
    if (!foodId) return; // Exit if no input provided
    fetch(`http://localhost:3000/foods/${foodId}/reviews`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => console.log("Reviews for Food:", data))
      .catch(error => console.error('Error:', error));
  }
  
  function createNewFood() {
    const newFood = {};
    newFood.id = prompt("Enter the food ID:");
    newFood.name = prompt("Enter the food name:");
    newFood.description = prompt("Enter the food description:");
    newFood.price = parseFloat(prompt("Enter the food price:"));
    newFood.category = prompt("Enter the food category:");
    newFood.ingredients = prompt("Enter the food ingredients (comma-separated):").split(',');
    newFood.calories = parseFloat(prompt("Enter the food calories:"));
    newFood.allergens = prompt("Enter the food allergens (comma-separated):").split(',');
  
    fetch(`http://localhost:3000/foods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFood),
    })
    .then(response => response.json())
    .then(data => console.log("New Food Created:", data))
    .catch(error => console.error('Error:', error));
  }
  
  function updateFood() {
    const foodId = prompt("Enter the food ID to update:");
    if (!foodId) return; // Exit if no input provided
    const updatedFood = {};
    updatedFood.name = prompt("Enter the updated food name:");
    updatedFood.description = prompt("Enter the updated food description:");
    updatedFood.price = parseFloat(prompt("Enter the updated food price:"));
    updatedFood.category = prompt("Enter the updated food category:");
    updatedFood.ingredients = prompt("Enter the updated food ingredients (comma-separated):").split(',');
    updatedFood.calories = parseFloat(prompt("Enter the updated food calories:"));
    updatedFood.allergens = prompt("Enter the updated food allergens (comma-separated):").split(',');
  
    fetch(`http://localhost:3000/foods/${foodId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFood),
    })
    .then(response => response.json())
    .then(data => console.log("Food Updated:", data))
    .catch(error => console.error('Error:', error));
  }
  
  function deleteFood() {
    const foodId = prompt("Enter the food ID to delete:");
    if (!foodId) return; // Exit if no input provided
    fetch(`http://localhost:3000/foods/${foodId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => console.log("Food Deleted:", data))
    .catch(error => console.error('Error:', error));
  }
  