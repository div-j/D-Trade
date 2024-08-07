import User from '../models/userModel.js';
// import Product from '../models/productModel.js';

export const getAdminData = async (req, res) => {
  try {
    // Fetch the data you want to display on the admin page
    const userCount = await User.countDocuments();
    // const productCount = await Product.countDocuments();
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(10);
    // const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(10);

    const data = {
      userCount,
    //   productCount,
      recentUsers,
    //   recentProducts,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
