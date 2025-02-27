import SideNav from "./side-bar";
import logo from "@/assets/logo.svg";
const Header = () => {
  return (
    <div className="grid grid-cols-3 items-center justify-center bg-gray-100 h-14 px-4">
      <SideNav />

      <div className="flex justify-center">
        <img src={logo} className="col-span-2 w-10" />
      </div>
    </div>
  );
};

export default Header;
