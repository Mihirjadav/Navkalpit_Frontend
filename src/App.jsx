import { Routes, Route } from "react-router-dom";

// User layout & pages
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Service from "./pages/Service.jsx";
import Technology from "./pages/Technology.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
import NewPassword from "./pages/NewPassword.jsx";
import About from "./pages/About.jsx";
import Career from "./pages/Career.jsx";
import Contact from "./pages/Contact.jsx";
import News from "./pages/News.jsx";

// Admin layout & pages
// import AdminLayout from "./components/AdminLayout.jsx";
// import Dashboard from "./admin/Dashboard.jsx";
// import Users from "./pages/Users.jsx";
// import Products from "./pages/Products.jsx";
// import Settings from "./pages/Settings.jsx";

function App() {
  return (
    <Routes>
      {/* =================== USER SIDE =================== */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* child paths DON'T need leading / */}
        <Route path="home" element={<Home />} />
        <Route path="service" element={<Service />} />
        <Route path="news" element={<News />} />
        <Route path="technology" element={<Technology />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="shop" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
        <Route path="newpassword" element={<NewPassword />} />
        <Route path="about" element={<About />} />
        <Route path="career" element={<Career />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
