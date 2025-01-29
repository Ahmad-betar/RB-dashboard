import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { nav_links } from "./nav-links";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [lightMode, setLightMode] = useState(false);

  const toggleLightMode = () => {
    setLightMode(!lightMode);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-8 h-screen w-64 p-5 bg-gray-800 text-white shadow-md",
        {
          "light-mode": lightMode,
        }
      )}
    >
      <div className="text-xl font-bold">Dashboard</div>

      <nav className="flex-grow">
        <ul className="">
          {nav_links.map(({ label, link, logo }) => (
            <Link to={link}>
              <li className="flex gap-2 p-2 my-2 hover:bg-gray-700">
                <img className="w-5 h-5" src={logo} alt="" />

                {label}
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <div className=" flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <span>Light Mode</span>

          <Switch />
        </div>

        <Button className="w-full p-2 bg-red-500 hover:bg-red-600 rounded">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SideNav;
