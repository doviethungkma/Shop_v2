import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/common/NotFound";
import AppLayout from "./components/layout/AppLayout";
import AuthLayout from "./components/layout/AuthLayout";
import Category from "./pages/Category/Category";
import Coupon from "./pages/Coupon/Coupon";
import Export from "./pages/Export/Export";
import Home from "./pages/Home/Home";
import Import from "./pages/Import/Import";
import Login from "./pages/Login/Login";
import Order from "./pages/Order/Order";
import Product from "./pages/Product/Product";
import Provider from "./pages/Provider/Provider";
import Signup from "./pages/Signup/Signup";
import User from "./pages/User/User";
import {
  ADMIN_ROLE,
  SHIPPER_ROLE,
  USER_ROLE,
  WAREHOSE_ROLE,
} from "./utils/constant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" elemen={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/" element={<AppLayout allowedRole={[ADMIN_ROLE]} />}>
          <Route path="/user" element={<User />} />
        </Route>

        <Route path="/" element={<AppLayout allowedRole={[ADMIN_ROLE]} />}>
          <Route path="/category" element={<Category />} />
        </Route>

        <Route path="/" element={<AppLayout />}>
          <Route path="/product" element={<Product />} />
        </Route>

        <Route path="/" element={<AppLayout />}>
          <Route path="/provider" element={<Provider />} />
        </Route>

        <Route path="/" element={<AppLayout />}>
          <Route path="/order" element={<Order />} />
        </Route>

        <Route path="/" element={<AppLayout allowedRole={[ADMIN_ROLE]}/>}>
          <Route path="/coupon" element={<Coupon />} />
        </Route>

        <Route path="/" element={<AppLayout />}>
          <Route path="/import" element={<Import />} />
        </Route>

        <Route path="/" element={<AppLayout />}>
          <Route path="/export" element={<Export />} />
        </Route>
        <Route path="/notfound" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
