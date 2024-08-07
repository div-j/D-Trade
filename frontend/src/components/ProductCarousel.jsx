import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";

function ProductCarousel() {
  const [product, setProduct] = useState([]);
  const { fetchData } = useAuth();
  const [loading, setLoading] = useState(true);
  const numbers =[{a:1},{b:2},{c:3},{d:4},{e:5},{f:6}]

  console.log(product);

  useEffect(() => {
    setTimeout(()=>{
        fetchData(setProduct, "product/all");
if (product) {
    setLoading(false)
}
    },4000)
  }, []);

  return (
    <div>
      <div className="carousel carousel-end rounded-box ">
        {loading?numbers.map((item, index)=>(<div key={index} className=" border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  <div className="animate-pulse flex space-x-4">
    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</div>)):(product.map((item) => (
          <div key={item._id} className="carousel-item ">      <div className="h-64">
            <img src={`${item.image}`} alt={item.name} className="w-full h-full object-cover "/>
            </div>
          </div>
        )))}
      </div>
     
    </div>
  );
}

export default ProductCarousel;
