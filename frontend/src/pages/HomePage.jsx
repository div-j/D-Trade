import React, { useState } from 'react'
import HelmetWrapper from '../seo/HelmetWrapper'
import CardSkeleton from './../components/CardSkeleton';
import ProductList from '../components/ProductList';
import ProductCarousel from '../components/ProductCarousel';
import CategoryFilter from '../components/CategoryFilter';

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    console.log('Selected category:', category);
    setSelectedCategory(category);
  };
  return (
    <section>
    <HelmetWrapper
    title="Home" 
    description="Welcome to d-trade, your go-to marketplace for electronics and electrical products." 
    keywords="electronics, electrical products, gadgets, home"
  />
  <ProductCarousel/>
  <div className="container flex mt-4">
    <div className='flex-1'>
      <CategoryFilter setCategorySelect={handleCategorySelect}/>
    </div>
     <div >
        <ProductList selectedCategory={selectedCategory}/>
     </div>
  </div>
  </section>
  )
}

export default HomePage