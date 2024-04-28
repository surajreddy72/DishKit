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

// Register Chart.js elements and plugins
Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

const HyderabadiChickenBiryani = () => {
  const initialIngredients = [
    { name: 'Chicken', quantity: 500 },
    { name: 'Yogurt', quantity: 200 },
    { name: 'Ground spices', quantity: 20 },
    { name: 'Salt', quantity: 10 },
    { name: 'Lemon juice', quantity: 15 },
    { name: 'Ginger garlic paste', quantity: 30 },
    { name: 'Basmati rice', quantity: 250 },
    { name: 'Whole spices', quantity: 5 },
    { name: 'Saffron water', quantity: 5 },
    { name: 'Fried onions', quantity: 50 },
    { name: 'Herbs', quantity: 10 },
    { name: 'Ghee', quantity: 30 },
  ];

  const [ingredients, setIngredients] = useState(initialIngredients);
  const [nutrientPieChart, setNutrientPieChart] = useState(null);

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
    calculateNutrients();
  }, [ingredients]);

  return (
    <div className="container">
      <h1>Hyderabadi Chicken Biryani</h1>
      <div className="image-container">
        <img
          src="https://www.potsandpans.in/cdn/shop/articles/biryani_banner_2048x.png?v=1666954821"
          alt="Hyderabadi Chicken Biryani"
          className="main-image"
        />
        <p className="image-caption">
          A flavorful rice dish made with spices, rice, and chicken. This dish is a staple of Hyderabadi cuisine, known for its rich aroma, spicy taste, and delicate blend of rice with chicken.
        </p>
      </div>

      <div className="content">
        <div className="ingredients">
          <h2>Ingredients:</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].name = e.target.value;
                    setIngredients(newIngredients);
                  }}
                />
                <input
                  type="number"
                  min="0"
                  value={ingredient.quantity}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].quantity = parseFloat(e.target.value);
                    setIngredients(newIngredients);
                  }}
                />
                <button onClick={() => removeIngredient(index)}>Remove</button>
              </li>
            ))}
          </ul>

          <button
            className="add-ingredient"
            onClick={() => setIngredients([...ingredients, { name: '', quantity: 0 }])}
          >
            Add Ingredient
          </button>
        </div>

        <div className="method">
          <h2>Method:</h2>
          <div className="method-steps">
            <p>
              <strong>Marination:</strong> Combine chicken with yogurt, ground spices, salt, lemon juice, and ginger garlic paste. Marinate for a few hours or overnight.
            </p>
            <p>
              <strong>Rice Preparation:</strong> Cook basmati rice with whole spices and salt until it's 70-80% cooked, then drain.
            </p>
            <p>
              <strong>Layering:</strong> In a heavy-bottomed pot, add a layer of marinated chicken, then a layer of partially cooked rice. Sprinkle saffron water, fried onions, and herbs.
            </p>
            <p>
              <strong>Cooking (Dum):</strong> Seal the pot with a tight lid or dough to retain steam. Cook on low flame for about 20-25 minutes.
            </p>
            <p>
              <strong>Garnishing:</strong> Garnish with fried onions, chopped herbs, and serve hot.
            </p>
          </div>
        </div>
      </div>

      <div className="nutrients-info">
        {nutrientPieChart && <Pie data={nutrientPieChart} />}
      </div>

      <div className="video-container">
        <h2>Video Tutorial</h2>
        <iframe
          src="https://www.youtube.com/embed/mFZkmjC2B3Y"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default HyderabadiChickenBiryani;
