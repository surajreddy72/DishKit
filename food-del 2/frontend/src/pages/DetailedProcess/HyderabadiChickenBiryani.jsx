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
  const [loading, setLoading] = useState(true);  // Loading delay state
  const [ingredients, setIngredients] = useState(
    initialIngredients.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.base_quantity,
    }))
  );
  const [nutrientPieChart, setNutrientPieChart] = useState(null);

  const nutrientData = {
    chicken: { protein: 27, carbs: 0, fat: 14 },
    yogurt: { protein: 10, carbs: 5, fat: 3.5 },
    'ground spices': { protein: 0.5, carbs: 1.2, fat: 0.5 },
    'salt': { protein: 0, carbs: 0, fat: 0 },
    'lemon juice': { protein: 0.4, carbs: 6.9, fat: 0.2 },
    'ginger garlic paste': { protein: 2, carbs: 14, fat: 0.5 },
    'basmati rice': { protein: 3.5, carbs: 77, fat: 0.5 },
    'whole spices': { protein: 1.5, carbs: 5, fat: 0.5 },
    'saffron water': { protein: 0, carbs: 0.3, fat: 0 },
    'fried onions': { protein: 2, carbs: 11, fat: 3 },
    'herbs': { protein: 2, carbs: 5, fat: 0.2 },
    'ghee': { protein: 0, carbs: 0, fat: 99 },
  };

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

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);  // Introduce a delay
    calculateNutrients();  // Re-calculate nutrients when ingredients change
  }, [ingredients]);

  const handleCountChange = (e) => {
    const newCount = parseInt(e.target.value);
    if (newCount > 0) {
      setCount(newCount);
      setIngredients(
        ingredients.map((ingredient) => ({
          ...ingredient,
          quantity: ingredient.base_quantity * newCount,
        }))
      );
    }
  };

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  return (
    <div className="container">
      <h1>Hyderabadi Chicken Biryani</h1>
      {loading ? (
        <p>Loading...</p>  
      ) : (
        <>
          <div className="image-container">
            <img
              src="https://www.potsandpans.in/cdn/shop/articles/biryani_banner_2048x.png?v=1666954821"
              alt="Hyderabadi Chicken Biryani"
              className="main-image"
            />
            <p className="image-caption">
              A flavorful rice dish made with spices, rice, and chicken.
            </p>
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
                onClick={() => setIngredients([...ingredients, { name: '', base_quantity: 0 }])}
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

          <div className="method">
            <h2>Method:</h2>
            <div className="method-steps">
              <p>
                <strong>Marination:</strong> Combine chicken with yogurt, ground spices, salt, lemon juice, and ginger garlic paste.
              </p>
              <p>
                <strong>Rice Preparation:</strong> Cook basmati rice with whole spices and salt until it's 70-80% cooked.
              </p>
              <p>
                <strong>Layering:</strong> Add a layer of marinated chicken, then a layer of partially cooked rice.
              </p>
              <p>
                <strong>Cooking (Dum):</strong> Seal the pot with a tight lid or dough to retain steam. Cook on low flame for about 20-25 minutes.
              </p>
              <p>
                <strong>Garnishing:</strong> Garnish with fried onions, chopped herbs, and serve hot.
              </p>
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
      )}
    </div>
  );
};

export default HyderabadiChickenBiryani;
