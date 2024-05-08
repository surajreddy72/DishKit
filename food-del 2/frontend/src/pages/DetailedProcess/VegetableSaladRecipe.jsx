import React, { useState, useContext, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './cssforchickensalad.css';

Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

const VegetableSaladRecipe = ({ image, name, price, desc, id }) => {

  useEffect(() => {
    console.log(id); // Print id in the console
  }, []); 

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const initialIngredients = [
    { name: 'Lettuce', quantity: 100, id: "663255820ef98062905555c0" },
    { name: 'Tomato', quantity: 50, id: "663256cd0ef98062905555cb" },
    { name: 'Cucumber', quantity: 30, id: "663257310ef98062905555d0" },
    { name: 'Bell pepper', quantity: 30, id: "6632575a0ef98062905555d3" },
    { name: 'Red onion', quantity: 10, id: "6632578a0ef98062905555d6" },
    { name: 'Olives', quantity: 20, id: "663257b60ef98062905555d9" },
    { name: 'Feta cheese', quantity: 30, id: "663257e40ef98062905555dc" },
    { name: 'Olive oil', quantity: 10, id: "663258240ef98062905555df" },
    { name: 'Red wine vinegar', quantity: 5, id: "663258520ef98062905555e2" },
    { name: 'Salt', quantity: 0, unit: 'To taste', id: "66325b1b0ef980629055564b" },
    { name: 'Black pepper', quantity: 0, unit: 'To taste', id: "66325b480ef9806290555653" },
  ];
  

  const [ingredients, setIngredients] = useState(initialIngredients);
  const [servingSize, setServingSize] = useState(1);
  const [nutrientPieChart, setNutrientPieChart] = useState(null);

  const nutrientData = {
    'lettuce': { protein: 1.4, carbs: 2.9, fat: 0.2 },
    'tomato': { protein: 0.9, carbs: 3.9, fat: 0.2 },
    'cucumber': { protein: 0.8, carbs: 3.1, fat: 0.1 },
    'bell pepper': { protein: 0.9, carbs: 6, fat: 0.4 },
    'red onion': { protein: 1.1, carbs: 9.3, fat: 0.1 },
    'olives': { protein: 0.8, carbs: 6, fat: 6.3 },
    'feta cheese': { protein: 14, carbs: 4.1, fat: 21 },
    'olive oil': { protein: 0, carbs: 0, fat: 100 },
    'red wine vinegar': { protein: 0, carbs: 17, fat: 0 },
    'salt': { protein: 0, carbs: 0, fat: 0 },
    'black pepper': { protein: 0.1, carbs: 1.1, fat: 0.1 },
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Vegetable Salad Recipe</h1>
      <div className="image-container">
      <img src="https://t4.ftcdn.net/jpg/07/42/71/05/240_F_742710550_ZWAlu8z89nGIOBIud4cCWYhlVoMYxa5q.jpg" />
      </div>

      <div className="mb-8">
        <p className="text-lg text-gray-700 mb-4">
          This is the ultimate vegetable salad recipe! It's fresh, crunchy, and packed with nutrients. Perfect for a light lunch or as a side dish with any meal.
        </p>
        <p className="text-lg text-gray-700">
          This salad is easy to make and customizable with your favorite veggies. Follow the simple steps below to create a delicious and healthy vegetable salad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingredients</h2>
          <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
            <li>Lettuce - use your favorite variety for the base of the salad.</li>
            <li>Tomato - adds juicy sweetness to the salad.</li>
            <li>Cucumber - adds a refreshing crunch.</li>
            <li>Bell pepper - provides vibrant color and flavor.</li>
            <li>Red onion - adds a hint of sharpness.</li>
            <li>Olives - for a salty kick.</li>
            <li>Feta cheese - adds creaminess and tanginess.</li>
            <li>Olive oil - for dressing.</li>
            <li>Red wine vinegar - for a sweet and tangy flavor.</li>
            <li>Salt and Black pepper - to taste.</li>
          </ul>
        </div>
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">The Ultimate Vegitable Salad Dressing</h2>
            <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
                <li>Extra Virgin Olive Oil - drizzle for richness.</li>
                <li>Balsamic Vinegar - adds a tangy twist.</li>
                <li>Dijon Mustard - for depth of flavor.</li>
                <li>Honey - a touch of sweetness.</li>
                <li>Minced Garlic - adds a subtle kick.</li>
                <li>Salt and Pepper - to taste.</li>
           </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Make Vegetable Salad</h2>
          <ol className="list-decimal pl-8 mb-8 space-y-4 text-gray-700 text-lg">
            <li>
              <strong>Prepare vegetables</strong> - Wash and chop lettuce, tomato, cucumber, bell pepper, and red onion. Pit and slice olives. Crumble feta cheese.
            </li>
            <li>
              <strong>Assemble salad</strong> - In a large bowl, combine all the prepared vegetables and olives.
            </li>
            <li>
              <strong>Make dressing</strong> - In a small bowl, whisk together olive oil, red wine vinegar, salt, and black pepper.
            </li>
            <li>
              <strong>Toss salad</strong> - Drizzle dressing over the salad and toss until evenly coated.
            </li>
            <li>
              <strong>Serve</strong> - Transfer the salad to a serving dish and enjoy your delicious vegetable salad!
            </li>
          </ol>
        </div>
      </div>

      <div>
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
              <tr key={index}>
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
          src="https://www.youtube.com/embed/voHVFxMnMDw"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VegetableSaladRecipe;
