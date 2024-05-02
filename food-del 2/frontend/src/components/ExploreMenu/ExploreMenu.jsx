import React, { useContext } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Discover Our Menu</h1>
      <p className='explore-menu-text'>
        Explore a diverse selection of dishes on our menu. Our aim is to cater to your preferences and enrich your dining experience, presenting one delicious offering after another.
      </p>
      <div className='explore-menu-list'>
        {menu_list.map((item, index) => {
          if (item.menu_name !== "Cake" && item.menu_name !== "Rolls" && item.menu_name !== "Noodles") {
            return (
              <div
                onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                key={index}
                className='explore-menu-list-item'
              >
                <img src={item.menu_image} className={category === item.menu_name ? "active" : ""} alt='' />
                <p>{item.menu_name}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
