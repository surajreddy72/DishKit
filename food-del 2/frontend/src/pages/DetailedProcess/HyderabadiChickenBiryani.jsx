import React from 'react';

const HyderabadiChickenBiryani = () => {
  return (
    <div className="bg-gray-100 font-sans">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Hyderabadi Chicken Biryani</h1>
        <img
          src="https://www.potsandpans.in/cdn/shop/articles/biryani_banner_2048x.png?v=1666954821"
          alt="Hyderabadi Chicken Biryani"
          className="w-full rounded-lg shadow-lg mb-8"
        />
        <p className="text-lg text-gray-700 mb-8">
          A flavorful rice dish made with spices, rice, and chicken. This dish is a staple of Hyderabadi cuisine and is known for its rich aroma, spicy taste, and delicate blend of rice with chicken.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingredients:</h2>
            <ul className="list-disc pl-8 mb-8 space-y-2 text-gray-700 text-lg">
              <li>Chicken</li>
              <li>Yogurt</li>
              <li>Ground spices</li>
              <li>Salt</li>
              <li>Lemon juice</li>
              <li>Ginger garlic paste</li>
              <li>Basmati rice</li>
              <li>Whole spices</li>
              <li>Saffron water</li>
              <li>Fried onions</li>
              <li>Herbs</li>
              <li>Ghee</li>
            </ul>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Method:</h2>
            <div className="text-lg text-gray-700 mb-8 space-y-6">
              <p>
                <strong>Marination:</strong> Combine chicken with yogurt, a blend of ground spices, salt, lemon juice, and ginger garlic paste. Marinate for a few hours or overnight.
              </p>
              <p>
                <strong>Rice Preparation:</strong> Cook basmati rice with whole spices and salt until it's about 70-80% done, then drain.
              </p>
              <p>
                <strong>Layering:</strong> In a heavy-bottomed pot, add a layer of marinated chicken, then a layer of partially cooked rice. Repeat the layers as needed. Sprinkle saffron water, fried onions, herbs, and ghee between layers for additional flavor.
              </p>
              <p>
                <strong>Cooking (Dum):</strong> Seal the pot with a tight-fitting lid or dough to ensure no steam escapes. Cook on a low flame for about 20-25 minutes, allowing the flavors to infuse.
              </p>
              <p>
                <strong>Garnishing:</strong> Once done, garnish with fried onions, chopped herbs, and serve hot.
              </p>
            </div>
          </div>
          <div>
            <iframe
              src="https://www.youtube.com/embed/mFZkmjC2B3Y"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full rounded-lg shadow-lg aspect-w-16 aspect-h-9"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HyderabadiChickenBiryani;