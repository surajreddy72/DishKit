import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
    const [itemCount, setItemCount] = useState(0);
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    const handleClick = () => {
        console.log(`Clicked on item: ${name}`); // Log the clicked item's name
        if (name === 'Veg sandwich') {
            // Navigate to another page
            window.location.href = '/HyderabadiChickenBiryani'; // Change '/other-page' to the actual URL of the other page
        } else {
            // You can perform any other actions here based on the clicked item
        }
    }

    return (
        <div className='food-item' onClick={handleClick}>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
                {!cartItems[id] ? (
                    <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' />
                ) : (
                    <div className='food-item-counter'>
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt='' />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt='' />
                    </div>
                )}
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p>{name}</p> <img src={assets.rating_starts} alt='' />
                </div>
                <p className='food-item-desc'>{desc}</p>
                <p className='food-item-price'>₹{price}</p>
            </div>
        </div>
    );
};

export default FoodItem;