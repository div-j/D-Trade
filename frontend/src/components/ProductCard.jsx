import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="card max-w-72 shadow-xl mb-3 mx-auto rounded-lg overflow-hidden">
      <figure className="h-48 bg-gray-200">
        <img
          className="h-full w-full object-cover"
          src={`${product.image}`}
          alt={product.name}
        />
      </figure>
      <div className="card-body p-4">
        <div className='flex flex-row justify-between'>
            <h2 className="card-title  text-lg font-bold max-w-32 ">
            {product.name}
            </h2>
            <div className="badge badge-secondary my-2">NGN{product.price}</div>
           
        </div>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <div className="card-actions text-base-100 justify-between">
          <div className="badge bg-white badge-outline cursor-pointer p-3 hover:text-white  hover:bg-base-100 ">Buy Now</div>
          <div className="badge badge-outline bg-base-100 text-white cursor-pointer p-3 hover:bg-white hover:text-base-100">Add To Cart</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
