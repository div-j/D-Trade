import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';

function CategoryFilter({ setCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { fetchData } = useAuth();

  useEffect(() => {
    fetchData(setCategories, 'category/all');
  }, []);

  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, categories]);

  const handleCategoryClick = (category) => {
    console.log(category);
    setSelectedCategory(category);
    setCategorySelect(category); // Notify parent component
    setShowAll(false);
  };

  const handleShowAllClick = () => {
    setShowAll(true);
  };

  return (
    <div className='min-w-48 max-w-72'>
      <h1 className='text-base-100 text-2xl m-2 text-center'>Filter By category</h1>

      <input
        type="text"
        placeholder="Search categories"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <div className="grid grid-cols-2 gap-4">
        {(showAll ? categories : filteredCategories).map((category) => (
          <button
            key={category._id}
            className={`btn btn-sm ${
              selectedCategory?._id === category._id ? 'btn-accent' : 'bg-white'
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </button>
        ))}
      </div>
      {!showAll && filteredCategories.length < categories.length && (
        <button
          onClick={handleShowAllClick}
          className="btn btn-md  mt-2 "
        >
          Show All Categories
        </button>
      )}
    </div>
  );
}

export default CategoryFilter;
