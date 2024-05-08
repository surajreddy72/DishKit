import React, { useState, useContext, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './cssforchickensalad.css';


Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

const Vanillaicecream = ({ image, name, price, desc, id }) => {

  useEffect(() => {
    console.log(id); // Print id in the console
  }, []); 

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const initialIngredients = [
        { name: 'Heavy cream', quantity: 480, id: "663255820ef98062905555c0" }, // 480 ml
        { name: 'Whole milk', quantity: 240, id: "663256cd0ef98062905555cb" },  // 240 ml
        { name: 'Granulated sugar', quantity: 150, id: "663257310ef98062905555d0" }, // 150 grams
        { name: 'Vanilla extract', quantity: 15, id: "6632575a0ef98062905555d3" },  // 15 ml
        { name: 'Salt', quantity: 1, unit: 'pinch', id: "66325b1b0ef980629055564b" }, // A pinch
      ];
      
  

  const [ingredients, setIngredients] = useState(initialIngredients);
  const [servingSize, setServingSize] = useState(1);
  const [nutrientPieChart, setNutrientPieChart] = useState(null);

  const nutrientData = {
    'heavy cream': { protein: 2.1, carbs: 2.9, fat: 36.1 },  // Per 100 grams
    'whole milk': { protein: 3.2, carbs: 4.8, fat: 3.9 },    // Per 100 grams
    'granulated sugar': { protein: 0, carbs: 100, fat: 0 },  // Per 100 grams
    'vanilla extract': { protein: 0.1, carbs: 13, fat: 0.1 }, // Per 100 grams
    'fruit puree': { protein: 0.7, carbs: 14, fat: 0.3 },     // Assuming average fruit blend per 100 grams
    'lemon juice': { protein: 0.4, carbs: 6.9, fat: 0.2 },   // Per 100 grams
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Vanilla Ice Cream Recipe</h1>
      <div className="image-container">
  <img src="https://img.onmanorama.com/content/dam/mm/en/food/readers-recipe/images/2020/9/1/vanilla-ice-cream.jpg" alt="Chicken Salad" className="top-image" />
</div>


      <div className="mb-8">
        <p className="text-lg text-gray-700 mb-4">
        Experience the creamy richness of homemade vanilla ice cream. This simple recipe brings out the pure flavor of vanilla in a perfectly chilled dessert.        </p>
        {/* <p className="text-lg text-gray-700">
          This is the perfect side dish or main course. It's especially easy if you use leftover rotisserie chicken. Watch the <strong>video tutorial</strong> and see how simple it is.
        </p> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingredients</h2>
          <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
          <li>2 cups heavy cream</li>
            <li>1 cup whole milk</li>
            <li>3/4 cup granulated sugar</li>
            <li>1 tablespoon pure vanilla extract</li>
            <li>Pinch of salt</li>
          </ul>

          {/* <h2 className="text-3xl font-bold text-gray-800 mb-6">The Best Chicken Salad Dressing</h2>
          <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
          <li>2 cups heavy cream</li>
            <li>1 cup whole milk</li>
            <li>3/4 cup granulated sugar</li>
            <li>1 tablespoon pure vanilla extract</li>
            <li>Pinch of salt</li>
          </ul> */}
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How to make Vanilla Ice Cream </h2>
          <ol className="list-decimal pl-8 mb-8 space-y-4 text-gray-700 text-lg">
            <li>
              <strong>Prep the Base:</strong> - In a saucepan, dissolve sugar in milk and cream on low heat.
            </li>
            <li>
              <strong>Add flavor:</strong> - Stir in the vanilla extract and salt.
            </li>
            <li>
              <strong>Chill</strong> - Refrigerate the mixture until completely chilled.
            </li>
            <li>
              <strong>Churn</strong> - Churn in an ice cream maker for about 20-25 minutes.
            </li>
            <li>
              <strong>Make Dressing</strong> - Transfer to a freezer-safe container and freeze until solid.
            </li>
            <li>
              <strong>Freeze</strong> - 
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
          src="https://www.youtube.com/watch?v=_c8WbWgkkS8"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Vanillaicecream;