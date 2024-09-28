import React, { useState, useEffect } from 'react';
import picture from '../../assets/picture.jpg'; // Tasvirni to'g'ri import qilganingizga ishonch hosil qiling

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://strapi-store-server.onrender.com/api/products?pagination')
            .then(response => response.json())
            .then(data => {
                setProducts(data.data);
            })
            .catch(error => console.error('Xatolik yuz berdi:', error));
    }, []);

    return (
        <div className="flex flex-wrap justify-center gap-6 p-6">
            {products.map((product, index) => (
                <ProductCard 
                    key={index}
                    title={product.attributes.title} 
                    price={product.attributes.price} 
                    image={product.attributes.image}
                />
            ))}
        </div>
    );
}

function ProductCard({ title, price, image }) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const placeholderImage = picture; // Bu yerda {picture} emas, shunchaki picture

    return (
        <div className="max-w-sm w-96 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden p-4">
            <img 
                className="w-full h-48 object-cover rounded-md" 
                src={isImageLoaded ? image : placeholderImage} 
                alt={title} 
                onLoad={() => setIsImageLoaded(true)} 
            />
            <div className="p-5 text-center">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-lg font-semibold text-gray-700">${price}</p>
            </div>
        </div>
    );
}

export default App;
