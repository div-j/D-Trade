import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/user/UserDashboard";
import ProtectedRoute from "./components/Routes/PrivateRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedAdminRoute from "./components/Routes/ProtectedAdminRoute";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import AdminDashboard from "./pages/admin/AdminDashboard";
import store from "./components/redux/store/store";
import ErrorBoundary from "./ErrorBoundary";


function App() {
  return (
    <ErrorBoundary>
    <Provider store={store}>
      <div className="h-dvh">
        <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<ProtectedRoute />}>
                <Route path="user" element={<Dashboard />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/register" element={<PublicRoute />}>
                <Route path="/register" element={<RegisterPage />} />
              </Route>
              <Route path="/login" element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>
              <Route path="/profile" element={<ProfilePage />} />

              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

              <Route path="/dashboard" element={<ProtectedAdminRoute />}>
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="admin/create-category" element={<CreateCategory />} />
                <Route path="admin/create-product" element={<CreateProduct />} />
                <Route path="admin/users" element={<Users />} />
              </Route>
            </Routes>
        </Layout>
      </div>
    </Provider>
    </ErrorBoundary>
  );
}

export default App;
