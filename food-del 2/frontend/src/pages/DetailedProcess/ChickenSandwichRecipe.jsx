import React, { useState, useContext, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './cssforchickensalad.css';

Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

const ChickenSandwichRecipe = ({ image, name, price, desc, id }) => {

  useEffect(() => {
    console.log(id); // Print id in the console
  }, []); 

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const initialIngredients = [
    { name: 'Chicken breast', quantity: 150, id: "663255820ef98062905555c0" },
    { name: 'Lettuce', quantity: 30, id: "663256cd0ef98062905555cb" },
    { name: 'Tomato', quantity: 50, id: "663257310ef98062905555d0" },
    { name: 'Cheese', quantity: 20, id: "6632575a0ef98062905555d3" },
    { name: 'Bread', quantity: 10, id: "6632578a0ef98062905555d6" },
    { name: 'Mayonnaise', quantity: 30, id: "663257b60ef98062905555d9" },
    { name: 'Mustard', quantity: 15, id: "663257e40ef98062905555dc" },
    { name: 'Salt', quantity: 5, id: "663258240ef98062905555df" },
    { name: 'Black pepper', quantity: 2, id: "663258520ef98062905555e2" },
  ];
  

  const [ingredients, setIngredients] = useState(initialIngredients);
  const [servingSize, setServingSize] = useState(1);
  const [nutrientPieChart, setNutrientPieChart] = useState(null);

  const nutrientData = {
    'chicken breast': { protein: 31, carbs: 0, fat: 3.6 },
    'lettuce': { protein: 0.5, carbs: 2, fat: 0.2 },
    'tomato': { protein: 0.9, carbs: 3.9, fat: 0.2 },
    'cheese': { protein: 25, carbs: 1.3, fat: 33 },
    'bread': { protein: 3.6, carbs: 49, fat: 1 },
    'mayonnaise': { protein: 0.1, carbs: 0.6, fat: 10.3 },
    'mustard': { protein: 0.7, carbs: 5, fat: 0.4 },
    'salt': { protein: 0, carbs: 0, fat: 0 },
    'black pepper': { protein: 0.3, carbs: 0.6, fat: 0.2 },
  };

  const addAllIngredients = () => {
    ingredients.forEach((ingredient) => {
      // Add each ingredient to the cart
      addToCart(ingredient.id);
      // Send ingredients details to the backend
      // axios.post(url + "/api/ingredients", { ingredient })
      //   .then((response) => {
      //     console.log("Ingredients details sent to backend:", response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error sending ingredients details to backend:", error);
      //   });
    });
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: 0 }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredientQuantities = () => {
    const updatedIngredients = ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.unit === 'To taste' ? 0 : ingredient.quantity * servingSize,
    }));
    setIngredients(updatedIngredients);
  };

  useEffect(() => {
    calculateNutrients();
  }, [ingredients, servingSize]);

  const calculateNutrients = () => {
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    ingredients.forEach((ingredient) => {
      const nutrientInfo = nutrientData[ingredient.name.toLowerCase()];

      if (nutrientInfo) {
        const servingSize = ingredient.quantity / 100;

        totalProtein += nutrientInfo.protein * servingSize;
        totalCarbs += nutrientInfo.carbs * servingSize;
        totalFat += nutrientInfo.fat * servingSize;
      }
    });

    const pieData = {
      labels: ['Protein', 'Carbohydrates', 'Fats'],
      datasets: [
        {
          data: [totalProtein, totalCarbs, totalFat],
          backgroundColor: ['#4CAF50', '#FFC107', '#FF5722'],
        },
      ],
    };

    setNutrientPieChart(pieData);
  };



  return (
    <div className="container">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">The Best Chicken Sandwich Recipe</h1>
      <div className="image-container">
      <img src="https://t3.ftcdn.net/jpg/06/99/72/46/240_F_699724699_X2uQo2LPRWtFD9oZrSTZsUUn66Kgzqkk.jpg" alt="Chicken Sandwich" className="top-image" />
      </div>

      <div className="mb-8">
        <p className="text-lg text-gray-700 mb-4">
          This is the ultimate chicken sandwich recipe! Perfect for a quick lunch or dinner, this sandwich is loaded with delicious ingredients that will satisfy your hunger and your taste buds.
        </p>
        <p className="text-lg text-gray-700">
          Customize your sandwich with your favorite toppings and condiments, and enjoy a delicious meal that's sure to please everyone in your family.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingredients</h2>
          <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
            <li>Chicken breast - grilled or fried to perfection.</li>
            <li>Lettuce - adds freshness and crunch.</li>
            <li>Tomato - juicy and flavorful.</li>
            <li>Cheese - your favorite variety.</li>
            <li>Bread - choose your favorite type of bread.</li>
            <li>Mayonnaise - for added flavor.</li>
            <li>Mustard - optional, for extra tanginess.</li>
            <li>Salt and Pepper - to taste.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">The Best Chicken Sandwich Dressing</h2>
          <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
            <li>Mayonnaise - use real mayo for the best flavor.</li>
            <li>Mustard - for extra tanginess.</li>
            <li>Lettuce - adds freshness and crunch.</li>
            <li>Tomato - juicy and flavorful.</li>
            <li>Salt and Pepper - to taste.</li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Make Chicken Sandwich</h2>
        <ol className="list-decimal pl-8 mb-8 space-y-4 text-gray-700 text-lg">
            <li>
            <strong>Cook the chicken</strong> - Season chicken breasts with salt, pepper, and your favorite spices. Grill or pan-fry until cooked through, about 6-8 minutes per side.
            </li>
            <li>
            <strong>Prepare the bun</strong> - Slice the burger buns in half and lightly toast them.
            </li>
            <li>
            <strong>Assemble the sandwich</strong> - Place lettuce leaves and tomato slices on the bottom half of the bun. Add the cooked chicken breast on top.
            </li>
            <li>
            <strong>Add condiments</strong> - Spread mayonnaise and mustard on the top half of the bun for extra flavor.
            </li>
            <li>
            <strong>Serve</strong> - Put the top half of the bun on the chicken and enjoy your delicious chicken sandwich!
            </li>
        </ol>
      </div>
      <div className="ingredient-table">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingredient Table</h2>
        <div className="mb-4">
          <label htmlFor="servingSize" className="mr-2">Number of People:</label>
          <input
            type="number"
            id="servingSize"
            name="servingSize"
            min="1"
            value={servingSize}
            onChange={(e) => setServingSize(parseInt(e.target.value))}
            onBlur={updateIngredientQuantities}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Quantity (in grams)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="ingredientList">
            {ingredients.map((ingredient, index) => (
              <tr key={index} className="ingredient-row">
                <td>
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => {
                      const updatedIngredients = [...ingredients];
                      updatedIngredients[index].name = e.target.value;
                      setIngredients(updatedIngredients);
                    }}
                  />
                </td>
                <td>
                  <input
                    type={ingredient.unit === 'To taste' ? 'text' : 'number'}
                    min="0"
                    value={ingredient.unit === 'To taste' ? ingredient.unit : ingredient.quantity}
                    onChange={(e) => {
                      const updatedIngredients = [...ingredients];
                      updatedIngredients[index].quantity = e.target.value === 'To taste' ? 0 : parseFloat(e.target.value);
                      setIngredients(updatedIngredients);
                    }}
                  />
                </td>
                <td>
                  <button onClick={() => removeIngredient(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-ingredient" onClick={addIngredient}>Add Ingredient</button>
 
      <button
            className="reset-button"
            onClick={() => {
              setIngredients(
                initialIngredients.map((ingredient) => ({
                  ...ingredient,
                  quantity: ingredient.base_quantity,
                }))
              );
              setCount(1);  
            }}
          >
            Reset
          </button>

          <button className='add' onClick={() => addAllIngredients(("662e998ecea12a61e9fa4c6c"))}>Add to Cart</button>
          
          {/* {!cartItems[id] ? (
                    <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='Add to Cart' />
                ) : (
                    <div className='food-item-counter'>
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt='Remove from Cart' />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt='Add to Cart' />
                    </div>
                )} */}
          
          </div>
          
      <div className="nutrients-info">
        {nutrientPieChart ? (
          <div>
            <p>Nutrient Information:</p>
            <Pie data={nutrientPieChart} />
          </div>
        ) : (
          <p>Loading nutrient information...</p>
        )}
      </div>

      <div className="video-container mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Video Tutorial</h2>
        <iframe
          src="https://www.youtube.com/watch?v=_SSGoVq5eSY&pp=ygUQY2hpY2tlbiBzYW5kd2ljaA%3D%3D"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>    
    </div>
  );
};

export default ChickenSandwichRecipe;
