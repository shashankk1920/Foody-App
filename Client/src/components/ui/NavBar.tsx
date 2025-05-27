import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Menubar,
  MenubarMenu,
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { HandPlatter, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Separator } from "@radix-ui/react-separator";
import { useUserStore } from "../../store/useUserStore";
import { useCartStore } from "../../store/useCartStore";
import { useThemeStore } from "../../store/useThemeStore";




const NavBar = () => {
 const {user, loading, logout} = useUserStore();
 const {cart} = useCartStore();
    const{setTheme}=useThemeStore(); 

  


  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4  ">
      <div className="flex-1 hidden md:block">
        <Link to="/" className="font-bold md:font-extrabold text-2xl">
         <h1 className="font-bold md:font-extrabold text-2xl">Foody </h1> 
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-6 p-14">
        <Link
          to="/"
          className="hover:text-hoverOrange transition duration-300 ease-in-out"
        >
          Home
        </Link>
        <Link
          to="/order/status"
          className="hover:text-hoverOrange transition duration-300 ease-in-out"
        >
          Order
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-2 hover:text-hoverOrange transition duration-300 ease-in-out"
        >
          Profile
          <User className="w-4 h-4" />
        </Link>
        {user?.admin && (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer hover:text-hoverOrange transition duration-300 ease-in-out">
                Admin
              </MenubarTrigger>
              <MenubarContent>
                <Link to="/admin/restaurant">
                  <MenubarItem>Restaurant</MenubarItem>
                </Link>
                <Link to="/admin/menu">
                  <MenubarItem>Menu</MenubarItem>
                </Link>
                <Link to="/admin/orders">
                  <MenubarItem>Orders</MenubarItem>
                </Link>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )}
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Link to="/cart" className="relative cursor-pointer">
          <ShoppingCart className="ml-4 w-8 h-8" />
          { cart?.length > 0 && ( <Button
            size="icon"
            className="absolute top-0 right-0 text-xs rounded-full h-4 w-4 bg-red-500 text-white flex items-center justify-center transform translate-x-1/2 -translate-y-1/2"
          >
            {cart?.length}
          </Button>)}
         
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme('light')} >Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Avatar className="relative w-18 h-14 border-2 border-orange rounded-full">
          <AvatarImage src={user?.profilePicture} alt="profilePhoto" className="w-full h-full object-cover rounded-full" />
          <AvatarFallback className="text-lg font-bold bg-gray-300 rounded-full flex items-center justify-center">CN</AvatarFallback>
        </Avatar>
        <div>
          {loading ? (
            <Button disabled className="bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              PLease Wait
            </Button>
          ) : (
            <Button onClick={logout} className=" max-w-sm  bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white rounded-md mx-auto p-5d outline-none shadow-lg transform active:scale-x-75 transition-transform  flex">Logout</Button>
          )}
        </div>
      </div>
      <div className="md:hidden lg:hidden flex justify-between w-full px-4">
        <Link to="/" className="font-bold text-2xl">
          Foody
        </Link>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default NavBar;

const MobileNavbar = () => {
   const {user, loading, logout} = useUserStore();
   const{setTheme}=useThemeStore();
   

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="px-4 py-3  rounded-md outline-none  transform active:scale-75 transition-transform">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row item-center justify-between  ">
          <SheetTitle className="text-xl font-bold">Foody </SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>

        <Separator className="my-2"/>
        <SheetDescription className="flex-1  ">

          <Link to="/profile" className="flex item-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font ">
          <User/>
          <span>Profile</span>
          </Link>
          <Link to="/success" className="flex item-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font">
          <HandPlatter/>
          <span>Order</span>
          </Link>
          <Link to="/cart" className="flex item-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font">
          <ShoppingCart/>
          <span>Cart(0)</span>
          </Link>
         {
          user?.admin && (
            <>
               <Link to="/admin/menu" className="flex item-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font">
          <SquareMenu/>
          <span>Menu</span>
          </Link>
          <Link to="/admin/restaurant" className="flex item-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font">
          <UtensilsCrossed/>
          <span>Resturant</span>
          </Link>
          <Link to="/admin/orders" className="flex item-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font">
          <PackageCheck/>
          <span>Resturant Order</span>
          </Link>
            </>
          )
         }
       
        </SheetDescription>
        <SheetFooter className="flex flex-col item-center gap-4">


    <>
    <div className="flex flex-row item-center gap-2">
      <Avatar>
        <AvatarImage src={user?.profilePicture}/>
        <AvatarFallback>CN</AvatarFallback>

      </Avatar>
      <h1 className="font-bold ">Shashank</h1>

    </div>
    </>
 
    <SheetClose asChild>
      
    {loading ? (
            <Button disabled className="bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              PLease Wait
            </Button>
          ) : (
            <Button onClick={logout} className=" max-w-sm  bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white rounded-md mx-auto p-5d outline-none shadow-lg transform active:scale-x-75 transition-transform  flex">Logout</Button>
          )}
  </SheetClose>
  
         
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
