import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
    const [itemCount, setItemCount] = useState(0);
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    const handleClick = () => {
        console.log(`Clicked on item: ${name}`); // Log the clicked item's name
        if (name === 'Chicken Biryani') {
            window.location.href = '/HyderabadiChickenBiryani'; 
        } else if (name === 'Chicken Salad') {
            window.location.href = '/ChickenSaladRecipe';
        } else if (name === 'Panner Biryani') {
            window.location.href = '/PannerBiryani';}
         else if (name === 'Chicken Sandwich') {
                window.location.href = '/ChickenSandwichRecipe';
        } else if (name === 'Veg Salad') {
            window.location.href = '/VegetableSaladRecipe';
         }
         else if (name === 'Garlic Mushroom') {
            window.location.href = '/GarlicMushroomRecipe';
         }
         else if (name === 'Tomato Pasta') {
            window.location.href = '/TomatoPastaRecipe';
         }
         else if (name === 'Mix Veg Pulav') {
            window.location.href = '/MixVegPulav';
         }
        else {
            // You can perform any other actions here based on the clicked item
        }
    }
    

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
                {/* {!cartItems[id] ? (
                    <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' />
                ) : (
                    <div className='food-item-counter'>
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt='' />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt='' />
                    </div>
                )} */}
            </div>
            <div className='food-item-info' onClick={handleClick}>
                <div className='food-item-name-rating'>
                    <p>{name}</p> 
                    {/* <img src={assets.rating_starts} alt='' /> */}
                </div>
                <p className='food-item-desc'>{desc}</p>
                <p className='food-item-price'>₹{price}</p>
            </div>
        </div>
    );
};

export default FoodItem;