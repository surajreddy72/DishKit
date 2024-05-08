import React, { useState, useContext, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './cssforchickensalad.css';
import { toast } from 'react-toastify';

Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

const ChickenSaladRecipe = ({ image, name, price, desc, id }) => {

  useEffect(() => {
    console.log(id); // Print id in the console
  }, []); 

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const initialIngredients = [
    { name: 'Chicken breast', quantity: 150, id: "6633ce6bf3882886dda8b588" },
    { name: 'Celery', quantity: 30, id: "6633ce94f3882886dda8b58c" },
    { name: 'Grapes', quantity: 50, id: "6633d050f3882886dda8b5a5" },
    { name: 'Pecans', quantity: 20, id: "6633d07ef3882886dda8b5a8" },
    { name: 'Red onion', quantity: 10, id: "6633cfaaf3882886dda8b595" },
    { name: 'Mayonnaise', quantity: 30, id: "6633cff3f3882886dda8b59b" },
    { name: 'Sour cream', quantity: 15, id: "6633d0b1f3882886dda8b5ad" },
    { name: 'Lemon juice', quantity: 5, id: "6633cfd1f3882886dda8b598" },
    { name: 'Fresh dill', quantity: 2, id: "6633d09af3882886dda8b5ab" },
    { name: 'Salt', quantity: 0, unit: 'To taste', id: "6633cefaf3882886dda8b591" },
    { name: 'Black pepper', quantity: 0, unit: 'To taste', id: "6633cebbf3882886dda8b58e" },
  ];
  

  const [ingredients, setIngredients] = useState(initialIngredients);
  const [servingSize, setServingSize] = useState(1);
  const [nutrientPieChart, setNutrientPieChart] = useState(null);

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
    toast.success("Items added to cart");
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: 0 }]);
  };
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredientQuantities = (newServingSize) => {
    const updatedIngredients = ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.unit === 'To taste' ? 0 : (ingredient.quantity / servingSize) * newServingSize,
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">The Best Chicken Salad Recipe</h1>
      <div className="image-container">
        <img src="https://hips.hearstapps.com/hmg-prod/images/delish-230228-chicken-salad-001-ab-web-index-64148d4479899.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*" alt="Chicken Salad" className="top-image" />
      </div>

      <div className="mb-8">
        <p className="text-lg text-gray-700 mb-4">
          This is the ultimate chicken salad recipe! We call this 'fancy' Chicken Salad because of the dressing, grapes, and pecans, but it's truly easy. This is a fresher and lightened-up version of classic chicken salad, perfect for meal prep.
        </p>
        <p className="text-lg text-gray-700">
          This is the perfect side dish or main course. It's especially easy if you use leftover rotisserie chicken. Watch the <strong>video tutorial</strong> and see how simple it is.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingredients</h2>
          <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
            <li>Chicken - we use 2 large chicken breasts from a whole roasted chicken, but you can use rotisserie chicken, Baked Chicken Breast, or sauteed chicken breasts instead.</li>
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
            <li>Dill - finely chopped fresh dill is preferred, but you can substitute with 2 Tbsp of finely chopped fresh parsley.</li>
            <li>Salt and Pepper - to taste.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Make Chicken Salad</h2>
          <ol className="list-decimal pl-8 mb-8 space-y-4 text-gray-700 text-lg">
            <li>
              <strong>Toast pecans</strong> - place on a dry skillet over medium/low heat and toss frequently until pecans are golden and fragrant. Transfer to a cutting board to coarsely chop and set aside to cool, then add to a large bowl.
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
          onChange={(e) => {
            const newServingSize = parseInt(e.target.value);
            console.log(newServingSize);
            setServingSize(newServingSize);
            console.log("servingsize",servingSize);
            updateIngredientQuantities(newServingSize);
          }}
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
              quantity: ingredient.quantity, // Reset quantities to their initial values
            }))
          );
          setServingSize(1); // Reset serving size to 1
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

export default ChickenSaladRecipe;