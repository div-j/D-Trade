import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const searchContext = createContext();

const SearchProvider = ({ children }) => {
    const [values, setValues] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    return (
        <searchContext.Provider value={{ values, setValues }}>
      {children}
    </searchContext.Provider>
  );
}

const useSearch = () => useContext(searchContext);

export { useSearch, SearchProvider };
