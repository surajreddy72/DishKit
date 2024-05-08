import React, { useState, useContext, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './cssforchickensalad.css';

Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

const MixVegPulav = ({ image, name, price, desc, id }) => {

  useEffect(() => {
    console.log(id); // Print id in the console
  }, []); 

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const initialIngredients = [
    { name: 'Basmati Rice', quantity: 300, id: "663255820ef98062905555c0" },
    { name: 'Cauliflower', quantity: 0.75, id: "663256cd0ef98062905555cb" },
    { name: 'Potatoes', quantity: 0.75, id: "663257310ef98062905555d0" },
    { name: 'Carrot', quantity: 0.25, id: "6632575a0ef98062905555d3" },
    { name: 'Green peas', quantity: 0.3, id: "6632578a0ef98062905555d6" },
    { name: 'Green beans', quantity: 0.25, id: "663257b60ef98062905555d9" },
    { name: 'Green bell pepper', quantity: 0.25, id: "663257e40ef98062905555dc" },
    { name: 'Baby corn', quantity: 0.25, id: "663258240ef98062905555df" },
    { name: 'Onions', quantity: 2, id: "663258520ef98062905555e2" },
    { name: 'Ghee', quantity: 3, id: "663258520ef98062905555e2" },
    { name: 'Tomatoes', quantity: 0.5, id: "663258520ef98062905555e2" },
    { name: 'Ginger', quantity: 1.5, id: "663258520ef98062905555e2" },
    { name: 'Garlic cloves', quantity: 5, id: "663258520ef98062905555e2" },
    { name: 'Green chillies', quantity: 2, id: "663258520ef98062905555e2" },
    { name: 'Coriander leaves', quantity: 3, id: "663258520ef98062905555e2" },
    { name: 'Mint leaves', quantity: 2, id: "663258520ef98062905555e2" },
    { name: 'Lemon juice', quantity: 0.25, id: "663258520ef98062905555e2" },
    { name: 'Cumin seeds', quantity: 1, id: "663258520ef98062905555e2" },
    { name: 'Tej patta', quantity: 1, id: "663258520ef98062905555e2" },
    { name: 'Cloves', quantity: 4, id: "663258520ef98062905555e2" },
    { name: 'Cardamoms', quantity: 4, id: "663258520ef98062905555e2" },
    { name: 'Cinnamom', quantity: 1, id: "663258520ef98062905555e2" },
    { name: 'Stone flower', quantity: 1, id: "663258520ef98062905555e2" },
    { name: 'Salt', quantity: 0, unit: 'To taste', id: "66325b1b0ef980629055564b" },
    { name: 'Black pepper', quantity: 0, unit: 'To taste', id: "66325b480ef9806290555653" },
  ];
  

  const [ingredients, setIngredients] = useState(initialIngredients);
  const [servingSize, setServingSize] = useState(1);
  const [nutrientPieChart, setNutrientPieChart] = useState(null);

  const nutrientData = {
    'basmati rice': { protein: 8, carbs: 77, fat: 0.5 },
    'cauliflower': { protein: 1.9, carbs: 5, fat: 0.2 },
    'potatoes': { protein: 2, carbs: 17, fat: 0.1 },
    'carrot': { protein: 0.6, carbs: 9.6, fat: 0.3 },
    'green peas': { protein: 5, carbs: 14, fat: 0.4 },
    'green beans': { protein: 1.8, carbs: 7, fat: 0.2 },
    'green bell pepper': { protein: 1.3, carbs: 6, fat: 0.2 },
    'baby corn': { protein: 2, carbs: 18, fat: 0.6 },
    'onions': { protein: 1.1, carbs: 9.3, fat: 0.1 },
    'ghee': { protein: 0, carbs: 0, fat: 99.5 },
    'tomatoes': { protein: 0.9, carbs: 3.9, fat: 0.2 },
    'ginger': { protein: 1.8, carbs: 18, fat: 0.2 },
    'garlic cloves': { protein: 0.6, carbs: 1.8, fat: 0.03 },
    'green chillies': { protein: 1.9, carbs: 4.4, fat: 0.2 },
    'coriander leaves': { protein: 2.1, carbs: 6, fat: 0.5 },
    'mint leaves': { protein: 3.3, carbs: 8.4, fat: 0.6 },
    'lemon juice': { protein: 0.4, carbs: 2.5, fat: 0 },
    'cumin seeds': { protein: 3.3, carbs: 44, fat: 22 },
    'tej patta': { protein: 0.5, carbs: 7, fat: 0.1 },
    'cloves': { protein: 0.1, carbs: 2.3, fat: 0.1 },
    'cardamoms': { protein: 0.6, carbs: 11, fat: 0.1 },
    'cinnamon': { protein: 0.9, carbs: 7, fat: 0.2 },
    'stone flower': { protein: 1.1, carbs: 6.5, fat: 0.4 },
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Mix Veg Pulav Recipe</h1>
      <div className="image-container">
  <img src="https://hips.hearstapps.com/hmg-prod/images/delish-230228-chicken-salad-001-ab-web-index-64148d4479899.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*" alt="Chicken Salad" className="top-image" />
</div>


      <div className="mb-8">
        <p className="text-lg text-gray-700 mb-4">
        Trying to get more vegetables in your diet? Try this vegetarian one pot meal of Pulao or Pulav made with basmati rice, mixed veggies, spices and herbs.
        </p>
        <p className="text-lg text-gray-700">
        Use the vegetables that you like most, like peas, potatoes, and green beans. Make this simple Veg Pulao recipe that packs a punch of flavor! Watch the <strong>video tutorial</strong> and see how simple it is.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingredients (Vegetables)</h2>
          <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
            <li>Basmati rice - Take 1.5 cups of basmati rice or 300 grams, rinsed and soaked for 20 to 30 minutes.</li>
            <li>Cauliflower - Take half to three-fourth cup of chopped cauliflower.</li>
            <li>Potatoes - Half to three-fourth cup of chopped potatoes</li>
            <li>Carrots - One-fourth cup of chopped carrots.</li>
            <li>Green peas - Fresh or frozen green peas are best suitable</li>
            <li>Green beans - French beans which are chopped, one-fourth of a cup</li>
            <li>Green bell pepper - Also called capsicum should be chopped and is optional,one-fourth of a cup</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-800 mb-6">Spices and other ingredients to make your pulav outstanding.</h2>
          <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
            <li>Ghee - use real ghee for the best flavor.</li>
            <li>Onions - One cup of thinly sliced onions or one large onion sliced</li>
            <li>Lemon juice - be sure to use freshly squeezed and not from concentrate.</li>
            <li>Tomatoes - Fresh tomato chopped half a cup or a medium sized tomato chopped to your desired size.</li>
            <li>Ginger - One to 1.5 inches crushed to a paste in a mortar-pestle.</li>
            <li>Garlic cloves - 4 to 5 small to medium sized crushed to paste in a mortar-pestle.</li>
            <li>Green chillies - One to two chopped green or 1 teaspoon chopped green chilli pepper - crushed to a paste in a mortar-pestle</li>
            <li>coriander leaves - 3 tablespoons coriander leaves cilantro chopped</li>
            <li>mint leaves - 2 tablespoons or chopped,optional</li>
            <li>cumin seeds - 1 teaspoon,can also be substituted with caraway seeds</li>
            <li>Tej patta,cloves,green cardamom, cinnamon,stone flower, salt and Pepper - to taste.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Make Mix Veg Pulav</h2>
          <ol className="list-decimal pl-8 mb-8 space-y-4 text-gray-700 text-lg">
            <li>
              <strong>Rinse the rice</strong> - Till the water runs clear of starch.
            </li>
            <li>
              <strong>Soak the rice</strong> - Soak the rice in enough water for 20 to 30 mins, then drain all the water and keep the soaked rice aside.
            </li>
            <li>
              <strong>Make the vegetables ready</strong> - Rinse, peel and chop the vegetables. Crush the chopped ginger, garlic and green chillies to a paste in a mortar-pestle or grind them in a small mixer or grinder with a bit of water.
            </li>
            <li>
              <strong>Frying spices</strong> - In a deep thick bottom pot or pan, heat the ghee or oil and fry all the whole spices mentioned above till the oil becomes fragrant and the spices splutter.
            </li>
            <li>
              <strong>Perfecting the onions</strong> - Add the onions and saute them till golden. Saute the onions on a low to medium low heat and stir often.
            </li>
            <li>
              <strong>Adding the flavour</strong> - Add the ginger-garlic-green chilli paste and saute for some seconds till their raw aroma goes away.
            </li>
            <li>
              <strong>Tomatoes</strong> - Add the tomatoes and saute them for 2 to 3 minutes on a low to medium low heat.
            </li>
            <li>
              <strong>Chopped vegetable</strong> - Add all the chopped veggies, green peas and saute again for 1 to 2 minutes on a low to medium-low heat.
            </li>
            <li>
              <strong>Rice</strong> - Add rice and saute gently for 1 to 2 minutes on a low or medium low heat, so that the rice gets well coated with oil.
            </li>
            <li>
              <strong>Finishing touch</strong> - Add water and lemon juice, mix and stir. Season with salt and stir again. Cover tightly and let the rice cook on low heat, till the rice is well cooked.
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
          src="https://www.youtube.com/watch?v=jerEKMLSJJI"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MixVegPulav;