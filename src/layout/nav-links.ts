import {
  House,
  Archive,
  Building2,
  PackageSearch,
  ScrollText,
  CircleDollarSign,
  User,
  BriefcaseBusiness,
  ShoppingCart,
  DollarSign,
  TvMinimal,
  ChartColumnBig,
  MessageCircleMore,
  Images,
  Code,
  LayoutTemplate,
  Shield,
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
    label: "Category",
    link: "/product-type",
  },
  {
    logo: ShoppingCart,
    label: "Cart",
    link: "/customer-cart",
  },
  {
    label: "State",
    logo: Building2,
    link: "/state",
  },
  {
    logo: CircleDollarSign,
    label: "Coupon",
    link: "/coupon",
  },
  {
    logo: DollarSign,
    label: "Offer",
    link: "/offer",
  },
  {
    logo: TvMinimal,
    label: "Banner",
    link: "/banner",
  },
  {
    logo: ChartColumnBig,
    label: "Popular",
    link: "/popular",
  },
  {
    logo: MessageCircleMore,
    label: "Messages",
    link: "/messages",
  },
  {
    logo: Images,
    label: "image size",
    link: "/image-size",
  },
  {
    logo: Code,
    label: "Pixel",
    link: "/pixel",
  },
  {
    logo: LayoutTemplate,
    label: "Offers Template",
    link: "/offers-template",
  },
  {
    logo: Shield,
    label: "Administrator",
    link: "/admin",
  },
];
