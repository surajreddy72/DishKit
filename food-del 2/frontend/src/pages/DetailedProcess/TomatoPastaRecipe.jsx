import React, { useState, useContext, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './cssforchickensalad.css';
import { toast } from 'react-toastify';

Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

const TomatoPastaRecipe = ({ image, name, price, desc, id }) => {

  useEffect(() => {
    console.log(id); // Print id in the console
  }, []); 

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const initialIngredients = [
    { name: 'Pasta', quantity: 1, id: "663b5e9ae4d41ef9b1f89328" },
    { name: 'Olive oil', quantity: 1, id: "663b5ed1e4d41ef9b1f8932c" },
    { name: 'Tomato Pasta sauce', quantity: 1, id: "663b5f15e4d41ef9b1f8932e" },
    { name: 'Cheese', quantity: 0.25, id: "663b5f4ce4d41ef9b1f89332" },
    { name: 'Salt', quantity: 0, unit: 'To taste', id: "66325b1b0ef980629055564b" },
  ];
  

  const [ingredients, setIngredients] = useState(initialIngredients);
  const [servingSize, setServingSize] = useState(1);
  const [nutrientPieChart, setNutrientPieChart] = useState(null);

  const nutrientData = {
    'pasta': { protein: 13, carbs: 74, fat: 1.5 },
    'tomato sauce': { protein: 1.2, carbs: 6.7, fat: 1.3 },
    'olive oil': { protein: 0, carbs: 0, fat: 13.5 },
    'cheese': { protein: 7, carbs: 8, fat: 29 },
    'salt': { protein: 0, carbs: 0, fat: 0 },
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Tomato Pasta Recipe</h1>
      <div className="image-container">
  <img src="https://t4.ftcdn.net/jpg/06/36/68/01/240_F_636680184_AzOXroWEmzDHrXDsrpFCK8j8Z9nIA2Zw.jpg" alt="Chicken Salad" className="top-image" />
</div>


      <div className="mb-8">
        <p className="text-lg text-gray-700 mb-4">
        Tomato Pasta in Red Sauce is one of the simplest and easiest pasta to make at home. In this recipe, Tomato Pasta is prepared by first cooking Penne or Fusilli Pasta to Al Dente perfection and then cooking them with homemade red tomato pasta sauce.
        </p>
        <p className="text-lg text-gray-700">
        This recipe also explains how to make Tomato Pasta Sauce from scratch using fresh tomatoes, onion, garlic, black pepper powder, olive oil and other seasonings Watch the <strong>video tutorial</strong> and see how simple it is.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingredients</h2>
          <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
            <li>Pasta - 1.5 cups of raw penne pasta or fusilli pasta.</li>
            <li>Oil - One tablespoon oil, which is optional.</li>
            <li>Tomato Pasta Sauce - Made with an approximate of six large tomatoes.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-800 mb-6">For taste</h2>
          <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
            <li>Salt - to taste.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Make Tomato Pasta</h2>
          <ol className="list-decimal pl-8 mb-8 space-y-4 text-gray-700 text-lg">
            <li>
              <strong>Boil raw pasta</strong> - Boil approximate of six cups water in a large pot/pan over medium flame. Add raw pasta, 1 teaspoon oil and salt.
            </li>
            <li>
              <strong>Cooking pasta</strong> - Stir well and let them boil until pastas are aldente. It will take around 10-12 minutes. Stir in between occasionally to prevent sticking.
            </li>
            <li>
              <strong> Checking if pasta is cooked</strong> - If the pasta is too hard or is white in the center, it is raw and requires cooking little longer. If firm to bite, the pasta is cooked.
            </li>
            <li>
              <strong>Drain the water</strong> - Drain the water by carefully transferring the cooked pasta to a large strainer.
            </li>
            <li>
              <strong>Red tomato sauce</strong> - Add cooked pasta to the tomato sauce and mix well. Cook for 2-3 minutes. Turn off the flame.
            </li>
            <li>
              <strong>Final touch</strong> - Garnish with the cheese and your tomato pasta is ready to be served.
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

          <button className='add' onClick={() => addAllIngredients(("6633c55cf3882886dda8b523"))}>Add to Cart</button>
          
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
      src="https://www.youtube.com/embed/NcHDxTam_uI"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  </div>

    </div>
  );
};

export default TomatoPastaRecipe;