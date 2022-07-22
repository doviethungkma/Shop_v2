import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import menuReducer from "./features/menuSlice";
import categoryReducer from "./features/categorySlice";
import commonReducer from "./features/commonSlice";
import providerReducer from "./features/providerSlice";
import couponReducer from "./features/couponSlice";
import orderReducer from "./features/orderSlice";
import productReducer from "./features/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    menu: menuReducer,
    category: categoryReducer,
    provider: providerReducer,
    common: commonReducer,
    coupon: couponReducer,
    product: productReducer,
    order: orderReducer,
  },
});
