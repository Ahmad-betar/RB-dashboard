import {
  House,
  Settings,
  Archive,
  Building2,
  PackageSearch,
  ScrollText,
  CircleDollarSign,
  User,
  BriefcaseBusiness,
} from "lucide-react";

export const nav_links = [
  {
    logo: House, // Use the House icon for Home
    label: "Home",
    link: "/",
  },
  {
    logo: ScrollText,
    label: "Orders",
    link: "/orders",
  },
  {
    logo: User,
    label: "Customer",
    link: "/customers",
  },
  {
    logo: BriefcaseBusiness,
    label: "Operators",
    link: "/operators",
  },
  {
    logo: Archive, // Use the Book icon for Posts
    label: "Products",
    link: "/products",
  },
  {
    logo: PackageSearch, // Use the MessageCircle icon for Comments
    label: "Product Type",
    link: "/product-type",
  },
  {
    label: "State",
    logo: Building2,
    link: "/state",
    // menu: true,
  },
  {
    logo: CircleDollarSign,
    label: "Coupon",
    link: "/coupon",
  },
  {
    logo: Settings,
    label: "Settings",
    link: "/settings",
  },
];
