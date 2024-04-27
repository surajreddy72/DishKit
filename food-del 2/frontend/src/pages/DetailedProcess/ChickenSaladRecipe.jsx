import React, { useState } from 'react';
import { Chart } from 'chart.js';
import 'tailwindcss/dist/tailwind.min.css';

const ChickenSaladRecipe = () => {
  const [ingredientList, setIngredientList] = useState([
    { name: 'Chicken breast', quantity: 150 },
    { name: 'Celery', quantity: 30 },
    { name: 'Grapes', quantity: 50 },
    { name: 'Pecans', quantity: 20 },
    { name: 'Red onion', quantity: 10 },
    { name: 'Mayonnaise', quantity: 30 },
    { name: 'Sour cream', quantity: 15 },
    { name: 'Lemon juice', quantity: 5 },
    { name: 'Fresh dill', quantity: 2 },
    { name: 'Salt', quantity: 'To taste' },
    { name: 'Black pepper', quantity: 'To taste' },
  ]);
  const [servingSize, setServingSize] = useState(1);
  const [totalNutrients, setTotalNutrients] = useState({ protein: 0, carbs: 0, fat: 0 });
  const nutrientPieChartRef = React.useRef(null);

  const addIngredient = () => {
    setIngredientList([...ingredientList, { name: '', quantity: 0 }]);
  };

  const removeIngredient = (index) => {
    const updatedList = [...ingredientList];
    updatedList.splice(index, 1);
    setIngredientList(updatedList);
  };

  const updateIngredientQuantities = () => {
    const updatedList = ingredientList.map((ingredient) => {
      if (typeof ingredient.quantity === 'number') {
        const updatedQuantity = ingredient.quantity * servingSize;
        return { ...ingredient, quantity: updatedQuantity.toFixed(2) };
      }
      return ingredient;
    });
    setIngredientList(updatedList);
  };

  const calculateNutrients = () => {
    const nutrientData = {
      'chicken breast': { protein: 31, carbs: 0, fat: 3.6 },
      'celery': { protein: 0.7, carbs: 3, fat: 0.2 },
      'grapes': { protein: 0.6, carbs: 18, fat: 0.3 },
      'pecans': { protein: 9.2, carbs: 3.9, fat: 71.9 },
      'red onion': { protein: 1.1, carbs: 9.3, fat: 0.1 },
      'mayonnaise': { protein: 0.1, carbs: 0.6, fat: 10.3 },
      'sour cream': { protein: 1.4, carbs: 2.1, fat: 19.4 },
      'lemon juice': { protein: 0.4, carbs: 6.9, fat: 0.2 },
      'dill': { protein: 3.5, carbs: 7, fat: 1.1 },
    };

    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    ingredientList.forEach((ingredient) => {
      const { name, quantity } = ingredient;
      const lowerCaseName = name.toLowerCase();

      if (nutrientData[lowerCaseName]) {
        const nutrients = nutrientData[lowerCaseName];
        const servingSize = typeof quantity === 'number' ? quantity / 100 : 0;

        totalProtein += nutrients.protein * servingSize;
        totalCarbs += nutrients.carbs * servingSize;
        totalFat += nutrients.fat * servingSize;
      }
    });

    setTotalNutrients({
      protein: totalProtein.toFixed(2),
      carbs: totalCarbs.toFixed(2),
      fat: totalFat.toFixed(2),
    });

    const chartData = {
      labels: ['Protein', 'Carbohydrates', 'Fats'],
      datasets: [
        {
          data: [totalProtein, totalCarbs, totalFat],
          backgroundColor: ['#4CAF50', '#FFC107', '#FF5722'],
        },
      ],
    };

    if (nutrientPieChartRef.current) {
      nutrientPieChartRef.current.data = chartData;
      nutrientPieChartRef.current.update();
    } else {
      const ctx = document.getElementById('nutrientPieChart').getContext('2d');
      nutrientPieChartRef.current = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            },
          },
        },
      });
    }
  };

  return (
    <div className="bg-gray-100 font-sans">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">The Best Chicken Salad Recipe</h1>

        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            This is the ultimate chicken salad recipe! We call this 'fancy' Chicken Salad because of the dressing, grapes,
            and pecans, but it's truly easy. This is a fresher and lightened-up version of classic chicken salad, perfect
            for meal prep.
          </p>
          <p className="text-lg text-gray-700">
            This is the perfect side dish or main course. It's especially easy if you use leftover rotisserie chicken.
            Watch the <strong>video tutorial</strong> and see how simple it is.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingredients</h2>
            <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
              <li>
                Chicken - we use 2 large chicken breasts from a whole roasted chicken, but you can use rotisserie chicken,
                Baked Chicken Breast, or sauteed chicken breasts instead.
              </li>
              <li>Celery - adds a great crunch to the salad and lightens up the flavor.</li>
              <li>Grapes - add sweet juiciness to the salad.</li>
              <li>Pecans - we toasted nuts on a dry skillet to give them even more flavor.</li>
              <li>Red onion - finely chop half of a medium red onion, or add red onion to taste.</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">The Best Chicken Salad Dressing</h2>
            <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
              <li>Mayonnaise - use real mayo for the best flavor.</li>
              <li>Sour cream - full-fat, or substitute with low-fat sour cream or fat-free Greek yogurt.</li>
              <li>Lemon juice - be sure to use freshly squeezed and not from concentrate.</li>
              <li>
                Dill - finely chopped fresh dill is preferred, but you can substitute with 2 Tbsp of finely chopped fresh
                parsley.
              </li>
              <li>Salt and Pepper - to taste.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Make Chicken Salad</h2>
            <ol className="list-decimal pl-8 mb-8 space-y-4 text-gray-700 text-lg">
              <li>
                <strong>Toast pecans</strong> - place on a dry skillet over medium/low heat and toss frequently until
                pecans are golden and fragrant. Transfer to a cutting board to coarsely chop and set aside to cool, then
                add to a large bowl.
              </li>
              <li>
                <strong>Chop Chicken</strong> - dice cold chicken breast and add it to the mixing bowl. Note: Diced
                chicken has a different texture than shredded.
              </li>
              <li>
                <strong>Halve Grapes</strong> - cut grapes in half with a serrated knife and add to the bowl.
              </li>
              <li>
                <strong>Chop celery and onion</strong> - trim off ends, finely chop, then add to the bowl.
              </li>
              <li>
                <strong>Make Dressing</strong> - combine the dressing ingredients and add to the salad.
              </li>
              <li>
                <strong>Toss to combine</strong> - stir until salad is evenly coated in dressing, then refrigerate until
                ready to serve.
              </li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingredient Table</h2>
          <div className="mb-4">
            <label htmlFor="servingSize" className="mr-2">
              Number of People:
            </label>
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
            <tbody>
              {ingredientList.map((ingredient, index) => (
                <tr key={index} className="ingredient-row">
                  <td>
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => {
                        const updatedList = [...ingredientList];
                        updatedList[index].name = e.target.value;
                        setIngredientList(updatedList);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={ingredient.quantity}
                      min="0"
                      onChange={(e) => {
                        const updatedList = [...ingredientList];
                        updatedList[index].quantity = parseFloat(e.target.value);
                        setIngredientList(updatedList);
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
          <button className="add-ingredient" onClick={addIngredient}>
            Add Ingredient
          </button>
          <button className="button" onClick={calculateNutrients}>
            Calculate Nutrients
          </button>
        </div>

        <div className="nutrients-info">
          <p>
            Protein: {totalNutrients.protein}g, Carbs: {totalNutrients.carbs}g, Fat: {totalNutrients.fat}g
          </p>
        </div>
        <div className="chart-container">
          <canvas id="nutrientPieChart"></canvas>
        </div>

        <div className="video-container mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Video Tutorial</h2>
          <iframe src="https://www.youtube.com/embed/voHVFxMnMDw" frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
};

export default ChickenSaladRecipe;