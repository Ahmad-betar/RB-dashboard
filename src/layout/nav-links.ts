import {
  House,
  Palette,
  Plug,
  Users,
  Settings,
  Archive,
  Building2,
  PackageSearch,
  CircleDollarSign,
} from "lucide-react";

export const nav_links = [
  {
    logo: House, // Use the House icon for Home
    label: "Home",
    link: "/",
    menu: false,
  },
  {
    logo: Archive, // Use the Book icon for Posts
    label: "Products",
    link: "/products",
    menu: false,
  },
  {
    logo: PackageSearch, // Use the MessageCircle icon for Comments
    label: "Product Type",
    link: "/product-type",
    menu: false,
  },
  {
    label: "Location",
    logo: Building2,
    link: "/city",
    menu: true,
    menuItems: [
      { label: "Governorates", logo: Building2, link: "/governorate" },
      { label: "City", logo: Building2, link: "/city" },
      { label: "State", logo: Building2, link: "/state" },
    ],
  },
  {
    logo: CircleDollarSign,
    label: "Coupon",
    link: "/coupon",
    menu: false,
  },
  {
    logo: Plug,
    label: "Plugins",
    link: "/plugins",
    menu: false,
  },
  {
    logo: Users,
    label: "Users",
    link: "/users",
    menu: false,
  },
  {
    logo: Settings,
    label: "Settings",
    link: "/settings",
    menu: false,
  },
];
