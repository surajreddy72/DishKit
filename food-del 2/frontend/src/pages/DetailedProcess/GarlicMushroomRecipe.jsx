import React, { useState, useContext, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './cssforchickensalad.css';

Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

const GarlicMushroomRecipe = ({ image, name, price, desc, id }) => {

  useEffect(() => {
    console.log(id); // Print id in the console
  }, []); 

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const initialIngredients = [
    { name: 'Mushrooms', quantity: 20, id: "663255820ef98062905555c0" },
    { name: 'Oninons sliced', quantity: 0.5, id: "663256cd0ef98062905555cb" },
    { name: 'Cumin', quantity: 0, id: "663257310ef98062905555d0" },
    { name: 'Oil', quantity: 2, id: "6632575a0ef98062905555d3" },
    { name: 'Garlic', quantity: 5, id: "6632578a0ef98062905555d6" },
    { name: 'Dried red chillies', quantity: 5, id: "663257b60ef98062905555d9" },
    { name: 'Vinegar', quantity: 0.75, id: "663257e40ef98062905555dc" },
    { name: 'Onion rings', quantity: 1, id: "663258240ef98062905555df" },
    { name: 'Chillipowder', quantity: 0.25, id: "663258520ef98062905555e2" },
    { name: 'Salt', quantity: 0, unit: 'To taste', id: "66325b1b0ef980629055564b" },
    { name: 'Sugar', quantity: 0, unit: 'To taste', id: "66325b480ef9806290555653" },
  ];
  

  const [ingredients, setIngredients] = useState(initialIngredients);
  const [servingSize, setServingSize] = useState(1);
  const [nutrientPieChart, setNutrientPieChart] = useState(null);

  const nutrientData = {
    'mushrooms': { protein: 3.1, carbs: 3.3, fat: 0.3 },
    'garlic': { protein: 0.9, carbs: 5.3, fat: 0.2 },
    'onion': { protein: 1.1, carbs: 9.3, fat: 0.1 },
    'dried red chili': { protein: 0.6, carbs: 18, fat: 0.3 },
    'vinegar': { protein: 0, carbs: 0.04, fat: 0 },
    'olive oil': { protein: 0, carbs: 0, fat: 13.5 },
    'cumin': { protein: 0.5, carbs: 22, fat: 0.9 },
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">The Best Garlic Mushroom Recipe</h1>
      <div className="image-container">
  <img src="https://t3.ftcdn.net/jpg/07/01/70/00/240_F_701700089_awtYskdprlT0JDD0hDrBUOhfRfV0Fg9h.jpg" alt="Garlic mushroom" className="top-image" />
</div>


      <div className="mb-8">
        <p className="text-lg text-gray-700 mb-4">
          Button mushrooms sauteed in Indian style garlic sauce.
        </p>
        <p className="text-lg text-gray-700">
          These hot and spicy garlic mushrooms go good with just anything - plain rice, inside a sandwitch bread or wrap, fried rice, noodles or serve as a starter. It is made with very few ingredients and tastes super delicious.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingredients</h2>
          <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
            <li>Mushroom - we use 1.5 cup of mushrooms either chopped or sliced</li>
            <li>Onions - Half a cup finely chopped Onions </li>
            <li>Cumin - Half a tea spoon cumin also known as jeera or 1 strand of mace/javitri</li>
            <li>Oil - One to Two tablespoon oil is sufficient, olive is preferred over butte</li>
            <li>Garlic - Five large garlic cloves or minced is needed, depends on the size of the garlic</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-800 mb-6">The Best Chicken Salad Dressing</h2>
          <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
            <li>Dried red chillies - 5 dried red chillies can be used, chilli powder can also be used but will result in a less spicy variety</li>
            <li>Vinegar - Three fourth tablespoon of apple cider vinegar or lemon juice</li>
            <li>Sugar - Half a teaspoon of sugar which is prefered to be organic or jaggery is added for sweetness</li>
            <li>Onion rings - A few onion rings or slices can be added for decoration</li>
            <li>Coriander leaves - 2 tablespoons of chopped coriander leaves can be added</li>
            <li>Salt and Pepper - to taste.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Make Chicken Salad</h2>
          <ol className="list-decimal pl-8 mb-8 space-y-4 text-gray-700 text-lg">
            <li>
              <strong>Heat the pan with oil</strong> - When the oil is hot enough, add mace or cumin
            </li>
            <li>
              <strong>Chop Chicken</strong> - dice cold chicken breast and add it to the mixing bowl. Note: Diced chicken has a different texture than shredded.
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
              <strong>Toss to combine</strong> - stir until salad is evenly coated in dressing, then refrigerate until ready to serve.
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
          src="https://www.youtube.com/embed/voHVFxMnMDw"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default GarlicMushroomRecipe;