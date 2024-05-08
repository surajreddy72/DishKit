import React, { useState, useContext, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './cssforchickensalad.css';

Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

const PannerBiryani = ({ image, name, price, desc, id }) => {

  useEffect(() => {
    console.log(id); // Print id in the console
  }, []); 

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const initialIngredients = [
    { name: 'Basmati rice', quantity: 500, id: "663255820ef98062905555c0" },
    { name: 'Paneer', quantity: 300, id: "663256cd0ef98062905555cb" },
    { name: 'Onions', quantity: 200, id: "663257310ef98062905555d0" },
    { name: 'Tomatoes', quantity: 200, id: "6632575a0ef98062905555d3" },
    { name: 'Yogurt', quantity: 200, id: "6632578a0ef98062905555d6" },
    { name: 'Ginger-garlic paste', quantity: 50, id: "663257b60ef98062905555d9" },
    { name: 'Green chili', quantity: 50, id: "663257e40ef98062905555dc" },
    { name: 'Biryani masala', quantity: 50, id: "663258240ef98062905555df" },
    { name: 'Oil', quantity: 100, id: "663258520ef98062905555e2" },
    { name: 'Salt', quantity: 0, unit: 'To taste', id: "66325b1b0ef980629055564b" },
  ];
  
      

  const [ingredients, setIngredients] = useState(initialIngredients);
  const [servingSize, setServingSize] = useState(1);
  const [nutrientPieChart, setNutrientPieChart] = useState(null);

  const nutrientData = {
    'basmati rice': { protein: 7.5, carbs: 78, fat: 0.6 },
    'paneer': { protein: 18.3, carbs: 3.6, fat: 20.8 },
    'onions': { protein: 1.1, carbs: 9.3, fat: 0.1 },
    'tomatoes': { protein: 0.9, carbs: 3.9, fat: 0.2 },
    'yogurt': { protein: 3.5, carbs: 4.7, fat: 3.3 },
    'ginger-garlic paste': { protein: 4.4, carbs: 18.6, fat: 0.4 },
    'green chili': { protein: 2, carbs: 7.2, fat: 0.2 },
    'biryani masala': { protein: 10, carbs: 50, fat: 10 },
    'oil': { protein: 0, carbs: 0, fat: 100 },
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Panner Biryani Recipe</h1>
      <div className="image-container">
  <img src="https://myfoodstory.com/wp-content/uploads/2021/10/Paneer-Makhani-Biryani-5-1170x617.jpg" alt="Chicken Salad" className="top-image" />
</div>


      <div className="mb-8">            
        <p className="text-lg text-gray-700 mb-4">
        A rich and flavorful rice dish made with spices, basmati rice, and paneer.
    </p>
        <p className="text-lg text-gray-700">
        Paneer Biryani is a delightful vegetarian twist on the traditional biryani. It combines aromatic basmati rice, marinated paneer, and a medley of spices to create a delicious and satisfying meal.. Watch the <strong>video tutorial</strong> and see how simple it is.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingredients</h2>
          <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
          <li>Paneer - 500 grams, cubed and lightly fried until golden.</li>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How to make Panner Biryani </h2>
          <ol className="list-decimal pl-8 mb-8 space-y-4 text-gray-700 text-lg">
          <li>
              <strong>Marination</strong> - Combine paneer with yogurt, ground spices, salt, lemon juice, and ginger garlic paste. Let it marinate for at least 1 hour.
            </li>
            <li>
              <strong>Cook Basmati Rice</strong> - Boil rice with whole spices until 70-80% done, then drain and set aside.
            </li>
            <li>
              <strong>Layering</strong> - In a heavy-bottomed pot, add a layer of marinated paneer, then a layer of partially cooked rice. Sprinkle saffron water, fried onions, and fresh herbs.
            </li>
            <li>
              <strong>Cooking (Dum)</strong> - Seal the pot with a tight lid or dough to retain steam. Cook on a low flame for 20-25 minutes.
            </li>
            <li>
              <strong>Garnishing</strong> - Garnish with fried onions and chopped herbs. Serve hot.
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
          src="https://www.youtube.com/watch?v=f0C96ir-1Qs"
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default PannerBiryani;