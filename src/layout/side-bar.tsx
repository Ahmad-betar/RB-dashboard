import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { nav_links } from "./nav-links";
import { Link } from "react-router-dom";
import logout from "@/assets/log-out.svg";
import main from "@/assets/logo.svg";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";

const SideNav = () => {
  return (
    <Drawer direction="left">
      <DrawerTrigger className="w-fit p-2 rounded-full shadow-none h-10">
        <Menu />
      </DrawerTrigger>

      <DrawerContent
        className={cn(
          "flex flex-col col-span-1 gap-8 w-64 p-5 text-white shadow-md rounded-none border-none overflow-auto"
        )}
      >
        <img className="w-10 h-10" src={main} alt="" />

        <nav className="flex-grow">
          <ul className="overflow-auto">
            {nav_links.map(({ label, link, logo: Logo }, index) => (
              <div key={index}>
                {
                  <DrawerClose asChild>
                    <Link to={link} key={index}>
                      <li className="flex items-center gap-2 p-2 my-2 text-black hover:bg-gray-100">
                        <Logo className="w-5 h-5" />

                        {label}
                      </li>
                    </Link>
                  </DrawerClose>
                }
              </div>
            ))}
          </ul>
        </nav>

        <div className=" flex flex-col gap-8">
          <Button
            className="w-full flex justify-start gap-4 p-2"
            colorScheme="error"
          >
            <img src={logout} alt="" />
            {"Logout"}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SideNav;
