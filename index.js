'use strict';

const cakeRecipes = require("./cake-recipes.json");
const prompt = require('prompt-sync')();
// Your functions here

//return all authors of a given recipe
cakeRecipes.forEach(recipe => {
  console.log(`Author for ${recipe.Name}: ${recipe.Author}`);
});

//log name of all recipes
function logRecipeNames (recipes) {
  if (!recipes || recipes.length === 0) {
    console.log ('no recipes found.');
  }
}
cakeRecipes.forEach (recipe => {
  console.log (`Recipe name: ${recipe.Name}`)
});
//recipes by author
// Functie om recepten te filteren op basis van auteur
function getRecipesByAuthor(recipes, author) {
const filteredRecipes = recipes.filter(recipe => recipe.Author === author);
// Check if there are ingredients found
  if (filteredRecipes.length === 0) {
    console.log(`No recipes found for: ${author}`);
  } else {
    console.log(`\nRecipes from: ${author}:`);
    // Log all recipes from certain author
    filteredRecipes.forEach(recipe => console.log(`- ${recipe.Name}`));
  }
  return filteredRecipes; // Return recipes
}
const authorName = prompt('Fill in the name of Author: ');

// callback function
getRecipesByAuthor(cakeRecipes, authorName);





//list of recipes with ingredient ****************************

function getRecipesByIngredient(recipes, ingredient) {
  
  return recipes.filter(recipe =>
    
    recipe.Ingredients.some(ing => ing.toLowerCase() === ingredient.toLowerCase())
  );
}

const ingredient = prompt('Voer een ingrediënt in: ');


const recipesWithIngredient = getRecipesByIngredient(cakeRecipes, ingredient);


if (recipesWithIngredient.length === 0) {
  console.log(`Geen recepten gevonden met het ingrediënt: ${ingredient}`);
} else {
  console.log(`Recepten met het ingrediënt '${ingredient}':`);
  recipesWithIngredient.forEach(recipe => console.log(`- ${recipe.Name}`));
}
//recipes containing specific ingredient print function -------------


function getRecipeByName(recipes, name) {
  
  const recipe = recipes.find(recipe => recipe.Name.toLowerCase().includes(name.toLowerCase()));

  
  if (!recipe) {
    console.log(`Geen recept gevonden met de naam: ${name}`);
  } else {
    
    console.log(`Gevonden recept: ${recipe.Name}`);
    console.log(`Auteur: ${recipe.Author}`);
    console.log(`Ingrediënten: ${recipe.Ingredients.join(', ')}`);
  }

  return recipe; 
}

const recipeName = prompt('Voer de naam van een recept in: ');
getRecipeByName(cakeRecipes, recipeName);









// ingredients list from recipe
function getAllIngredients(recipes) {
  return recipes.reduce((allIngredients, recipe) => {
    
    return allIngredients.concat(recipe.Ingredients);
  }, []); 
}


function getRecipesByAuthor(recipes, author) {
  return recipes.filter(recipe => recipe.Author === author);
}


const recipesByAuthor = getRecipesByAuthor(cakeRecipes, authorName);


if (recipesByAuthor.length === 0) {
  console.log(`Geen recepten gevonden voor auteur: ${authorName}`);
} else {
  console.log(`Recepten van ${authorName}:`);
  recipesByAuthor.forEach(recipe => console.log(`- ${recipe.Name}`));

  
  const allIngredients = getAllIngredients(recipesByAuthor);

  
  console.log(`\nAlle ingrediënten van de recepten van ${authorName}:`);
  console.log(allIngredients);
}










// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}


let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      cakeRecipes.forEach(recipe => {
        console.log(`Author: ${recipe.Author}`);
      });
      break;
    case 2:
      const authorName = prompt('Enter the name of the author: ');
      const recipesByAuthor = getRecipesByAuthor(cakeRecipes, authorName);
      
      if (recipesByAuthor.length === 0) {
        console.log(`No recipes found for author: ${authorName}`);
      } else {
        console.log(`Recipes by ${authorName}:`);
        recipesByAuthor.forEach(recipe => console.log(`- ${recipe.Name}`));
      }
      
      break;
    case 3:
      const ingredient = prompt('Enter an ingredient: ');
      const recipesWithIngredient = getRecipesByIngredient(cakeRecipes, ingredient);
      
      if (recipesWithIngredient.length === 0) {
        console.log(`No recipes found with the ingredient: ${ingredient}`);
      } else {
        console.log(`Recipes with the ingredient '${ingredient}':`);
        recipesWithIngredient.forEach(recipe => console.log(`- ${recipe.Name}`));
      }

      break;
    case 4:
      const recipeName = prompt('Enter the name of the recipe: ');
      const recipe = getRecipeByName(cakeRecipes, recipeName);

        break;
    case 5:
      const author = prompt('Enter the author name to list all ingredients: ');
      const recipesBySpecificAuthor = getRecipesByAuthor(cakeRecipes, author);
      
      if (recipesBySpecificAuthor.length === 0) {
        console.log(`No recipes found for author: ${author}`);
      } else {
        const allIngredients = getAllIngredients(recipesBySpecificAuthor);
        console.log(`All ingredients from ${author}'s recipes:`);
        console.log(allIngredients.join(', '));
      }
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);