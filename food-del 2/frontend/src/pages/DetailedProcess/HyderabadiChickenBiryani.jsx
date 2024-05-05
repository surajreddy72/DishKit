import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import './styles.css';

// Register Chart.js elements and plugins
Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

const HyderabadiChickenBiryani = () => {
  const initialIngredients = [
    { name: 'Chicken', base_quantity: 500 },
    { name: 'Yogurt', base_quantity: 200 },
    { name: 'Ground spices', base_quantity: 20 },
    { name: 'Salt', base_quantity: 10 },
    { name: 'Lemon juice', base_quantity: 15 },
    { name: 'Ginger garlic paste', base_quantity: 30 },
    { name: 'Basmati rice', base_quantity: 250 },
    { name: 'Whole spices', base_quantity: 5 },
    { name: 'Saffron water', base_quantity: 5 },
    { name: 'Fried onions', base_quantity: 50 },
    { name: 'Herbs', base_quantity: 10 },
    { name: 'Ghee', base_quantity: 30 },
  ];

  const [count, setCount] = useState(1);
  const [ingredients, setIngredients] = useState(
    initialIngredients.map(ingredient => ({
      ...ingredient,
      quantity: ingredient.base_quantity * count,
    }))
  );

  const nutrientData = {
    chicken: { protein: 27, carbs: 0, fat: 14 },
    yogurt: { protein: 10, carbs: 5, fat: 3.5 },
    'ground spices': { protein: 0.5, carbs: 1.2, fat: 0.5 },
    salt: { protein: 0, carbs: 0, fat: 0 },
    'lemon juice': { protein: 0.4, carbs: 6.9, fat: 0.2 },
    'ginger garlic paste': { protein: 2, carbs: 14, fat: 0.5 },
    'basmati rice': { protein: 3.5, carbs: 77, fat: 0.5 },
    'whole spices': { protein: 1.5, carbs: 5, fat: 0.5 },
    'saffron water': { protein: 0, carbs: 0.3, fat: 0 },
    'fried onions': { protein: 2, carbs: 11, fat: 3 },
    herbs: { protein: 2, carbs: 5, fat: 0.2 },
    ghee: { protein: 0, carbs: 0, fat: 99 },
  };

  const [nutrientPieChart, setNutrientPieChart] = useState(null);

  const calculateNutrients = () => {
    let totalProtein = 0, totalCarbs = 0, totalFat = 0;

    ingredients.forEach(ingredient => {
      const nutrientInfo = nutrientData[ingredient.name.toLowerCase().replace(/ /g, '')];
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
          data: [totalProtein.toFixed(2), totalCarbs.toFixed(2), totalFat.toFixed(2)],
          backgroundColor: ['#4CAF50', '#FFC107', '#FF5722'],
        },
      ],
    };

    setNutrientPieChart(pieData);
  };

  useEffect(() => {
    calculateNutrients();
  }, [ingredients]);

  const handleCountChange = (e) => {
    const newCount = parseInt(e.target.value);
    if (newCount > 0) {
      setCount(newCount);
      setIngredients(
        initialIngredients.map(ingredient => ({
          ...ingredient,
          quantity: ingredient.base_quantity * newCount,
        }))
      );
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', base_quantity: 0, quantity: 0 }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  return (


    <div className="container">
      <h1>Hyderabadi Chicken Biryani</h1>
      
        <>
          <div className="image-container">
            <img
              // src="https://www.potsandpans.in/cdn/shop/articles/biryani_banner_2048x.png?v=1666954821"
              src = "https://t3.ftcdn.net/jpg/07/17/83/54/240_F_717835431_78JKCIABxnoXXlY5HNKJhfHE9PJBA9NA.jpg"
              alt="Hyderabadi Chicken Biryani"
              className="main-image"
            />
            
          </div>
          <div className="mb-8">
  <p className="text-lg text-gray-700 mb-4">
  <p className="image-caption">
              A flavorful rice dish made with spices, rice, and chicken.
            </p>
    Hyderabadi Chicken Biryani is a classic Indian dish known for its fragrant basmati rice, succulent chicken, and rich spices. It's a culinary delight that's both hearty and flavorful.
  </p>
  <p className="text-lg text-gray-700">
    This dish is a complete meal on its own and is often served at special occasions and festivals. It's easy to prepare and can be made with various proteins, though chicken is the most popular choice. Watch the <strong>video tutorial</strong> to learn how to make the perfect Chicken Biryani.
  </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div>
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingredients</h2>
    <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
      <li>Chicken - 500 grams of bone-in chicken pieces.</li>
      <li>Yogurt - 200 grams for marination.</li>
      <li>Ground spices - a mix of cumin, coriander, and turmeric.</li>
      <li>Salt - to taste, typically 10 grams.</li>
      <li>Lemon juice - 15 grams for acidity.</li>
      <li>Ginger garlic paste - 30 grams for flavor.</li>
      <li>Basmati rice - 250 grams, soaked for 30 minutes.</li>
      <li>Whole spices - 5 grams of bay leaves, cinnamon, and cardamom.</li>
      <li>Saffron water - 5 grams for coloring and aroma.</li>
      <li>Fried onions - 50 grams for garnish and flavor.</li>
      <li>Herbs - 10 grams of fresh coriander and mint.</li>
      <li>Ghee - 30 grams for a rich, buttery flavor.</li>
    </ul>

    <h2 className="text-3xl font-bold text-gray-800 mb-6">Preparation Steps</h2>
    <ol className="list-decimal pl-8 mb-8 space-y-4 text-gray-700 text-lg">
      <li>
        <strong>Marination</strong> - Combine chicken with yogurt, ground spices, salt, lemon juice, and ginger garlic paste. Let it marinate for a few hours or overnight.
      </li>
      <li>
        <strong>Cook Basmati Rice</strong> - Boil rice with whole spices until 70-80% done, then drain and set aside.
      </li>
      <li>
        <strong>Layering</strong> - In a heavy-bottomed pot, add a layer of marinated chicken, then a layer of partially cooked rice. Sprinkle saffron water, fried onions, and fresh herbs.
      </li>
      <li>
        <strong>Cooking (Dum)</strong> - Seal the pot with a tight lid or dough to retain steam. Cook on low flame for 20-25 minutes.
      </li>
      <li>
        <strong>Garnishing</strong> - Garnish with fried onions and chopped herbs. Serve hot.
      </li>
    </ol>
  </div>

  <div>
    {/* <h2 className="text-3xl font-bold text-gray-800 mb-6">Nutrient Information</h2> */}
    {/* <div className="nutrients-info"> */}
      {/* {nutrientPieChart ? <Pie data={nutrientPieChart} /> : <p>No data available</p>} */}
    </div>

    {/* <h2 className="text-3xl font-bold text-gray-800 mb-6">Video Tutorial</h2>
    <iframe
      src="https://www.youtube.com/embed/mFZkmjC2B3Y" */}
      {/* frameBorder="0"
      allowFullScreen
      className="w-full h-64 md:h-80 rounded-lg shadow-lg"
    /> */}
  {/* </div> */}
</div>

          <div className="content">
            <div className="ingredients">
              <h2>Ingredients Table:</h2>
              <div className="count-container">
                <label htmlFor="count">Count:</label>
                <input
                  type="number"
                  id="count"
                  min="1"
                  value={count}
                  onChange={handleCountChange}
                />
              </div>

              <table className="ingredients-table"> 
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Quantity in Grams</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredients.map((ingredient, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={ingredient.name}
                          onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          value={ingredient.quantity}
                          onChange={(e) => handleIngredientChange(index, 'quantity', parseFloat(e.target.value))}
                        />
                      </td>
                      <td>
                        <button onClick={() => removeIngredient(index)}>Remove</button>  
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                className="add-ingredient"
                onClick={addIngredient}  // Use function for adding ingredients
              >
                Add Ingredient
              </button>

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
            </div>

            <div className="nutrients-info">
              {nutrientPieChart ? <Pie data={nutrientPieChart} /> : <p>No Data</p>}  
            </div>
          </div>

          <div className="video-container">
            <h2>Video Tutorial</h2>
            <iframe
              src="https://www.youtube.com/embed/mFZkmjC2B3Y"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </>
      )
    </div>
  );
};

export default HyderabadiChickenBiryani;



// src="https://www.potsandpans.in/cdn/shop/articles/biryani_banner_2048x.png?v=1666954821"
// src = "https://t3.ftcdn.net/jpg/07/17/83/54/240_F_717835431_78JKCIABxnoXXlY5HNKJhfHE9PJBA9NA.jpg"