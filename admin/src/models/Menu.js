import { ADMIN_ROLE } from "../utils/constant";
import { WAREHOSE_ROLE } from "../utils/constant";
import { SHIPPER_ROLE } from "../utils/constant";
import { USER_ROLE } from "../utils/constant";

export const menuModel = [
  {
    id: 1,
    name: "Dashboard",
    link: "/",
    icon: "bx bx-home",
    acceptedRole: [ADMIN_ROLE, WAREHOSE_ROLE, SHIPPER_ROLE, USER_ROLE],
  },
  {
    id: 2,
    name: "Customer",
    link: "/user",
    icon: "bx bx-user",
    acceptedRole: [ADMIN_ROLE],
  },
  {
    id: 3,
    name: "Order",
    link: "/order",
    icon: "bx bx-cart",
    acceptedRole: [ADMIN_ROLE, SHIPPER_ROLE],
  },
  {
    id: 4,
    name: "Category",
    link: "/category",
    icon: "bx bx-layer",
    acceptedRole: [ADMIN_ROLE],
  },
  {
    id: 5,
    name: "Product",
    link: "/product",
    icon: "bx bx-cube-alt",
    acceptedRole: [ADMIN_ROLE, SHIPPER_ROLE, WAREHOSE_ROLE, USER_ROLE],
  },
  {
    id: 6,
    name: "Provider",
    link: "/provider",
    icon: "bx bx-clipboard",
    acceptedRole: [ADMIN_ROLE, WAREHOSE_ROLE],
  },
  {
    id: 7,
    name: "Coupon",
    link: "/coupon",
    icon: "bx bxs-offer",
    acceptedRole: [ADMIN_ROLE],
  },
  {
    id: 8,
    name: "Import",
    link: "/import",
    icon: "bx bx-right-arrow-circle",
    acceptedRole: [ADMIN_ROLE, WAREHOSE_ROLE],
  },
  {
    id: 9,
    name: "Export",
    link: "/export",
    icon: "bx bx-left-arrow-circle",
    acceptedRole: [ADMIN_ROLE, WAREHOSE_ROLE],
  },
];
