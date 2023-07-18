import React, { useState } from 'react';
import './App.css';

interface Recipe {
  id: number;
  name: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  publicationDate: Date;
}

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [formFields, setFormFields] = useState<Recipe>({
    id: 0,
    name: '',
    ingredients: '',
    instructions: '',
    cookingTime: 0,
    publicationDate: new Date(),
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
  
    if (name === 'publicationDate') {
      const selectedDate = new Date(value);
      setFormFields((prevFormFields) => ({
        ...prevFormFields,
        publicationDate: selectedDate,
      }));
    } else {
      setFormFields((prevFormFields) => ({
        ...prevFormFields,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    if (
      formFields.name &&
      formFields.ingredients &&
      formFields.instructions &&
      formFields.cookingTime >= 1 
    ) {
      if (currentRecipe) {
        const updatedRecipes = recipes.map((recipe) => {
          if (recipe.id === currentRecipe.id) {
            return { ...recipe, ...formFields };
          }
          return recipe;
        });
        setRecipes(updatedRecipes);
        setCurrentRecipe(null);
      } else {
        const newRecipe: Recipe = {
          ...formFields,
          id: recipes.length + 1,
        };
        setRecipes([...recipes, newRecipe]);
      }
      setFormFields({
        id: 0,
        name: '',
        ingredients: '',
        instructions: '',
        cookingTime: 0,
        publicationDate: new Date(),
      });
    }
  };  
  
  const handleClear = () => {
    setFormFields({
      id: 0,
      name: '',
      ingredients: '',
      instructions: '',
      cookingTime: 0,
      publicationDate: new Date(),
    });
    setCurrentRecipe(null);
  };

  const handleDelete = (id: number) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes.map((recipe, index) => ({ ...recipe, id: index + 1 })));
    if (currentRecipe && currentRecipe.id === id) {
      setCurrentRecipe(null);
    }
  };
  

  const handleEdit = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
    setFormFields(recipe);
  };

  return (
    <div className="App">
      <header className="navbar">
        {}
      </header>
      <div className="content">
      <section className="content-list">
  <h2>Recipe List</h2>
  <ul>
    {recipes.map((recipe) => (
      <li key={recipe.id} onClick={() => handleEdit(recipe)}>
        <p className="id">ID: {recipe.id}</p>
        <p className="field1">Name: {recipe.name}</p>
        <p className="field2">Ingredients: {recipe.ingredients}</p>
        <p className="field3">Instructions: {recipe.instructions}</p>
        <p className="field4">Cooking Time: {recipe.cookingTime} minutes</p>
        <p className="field5">Publication Date: {recipe.publicationDate.toDateString()}</p>
        <button className="deleteButton" onClick={() => handleDelete(recipe.id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
</section>
        <section className="content-details">
  <h2>Recipe Details</h2>
  <form>
    <label htmlFor="field1">Name:</label>
    <input
      type="text"
      id="field1"
      name="name"
      value={formFields.name}
      onChange={handleInputChange}
      required
    />

    <label htmlFor="field2">Ingredients:</label>
    <textarea
      id="field2"
      name="ingredients"
      value={formFields.ingredients}
      onChange={handleInputChange}
      required
    />

    <label htmlFor="field3">Instructions:</label>
    <textarea
      id="field3"
      name="instructions"
      value={formFields.instructions}
      onChange={handleInputChange}
      required
    />

    <label htmlFor="field4">Cooking Time (minutes):</label>
    <input
      type="number"
      id="field4"
      name="cookingTime"
      value={formFields.cookingTime >= 1 ? formFields.cookingTime : 1}
      onChange={handleInputChange}
      min={1}
      required
    />



    <label htmlFor="field5">Publication Date:</label>
    <input
      type="date"
      id="field5"
      name="publicationDate"
      value={formFields.publicationDate.toISOString().split('T')[0]}
      onChange={handleInputChange}
      required
    />

    <button type="button" id="saveButton" onClick={handleSave}>
      Save
    </button>
    <button type="button" id="clearButton" onClick={handleClear}>
      Clear
    </button>
  </form>
</section>

      </div>
      <footer className="footer">
        {}
      </footer>
    </div>
  );
};

export default App;
