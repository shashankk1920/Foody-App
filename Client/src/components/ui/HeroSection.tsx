import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import hero from "../../assets/hero.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  
  return (
      <div className="min-h-screen bg-gradient-to-r from-purple-500 via-blue-400 to-blue-600">
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4 md:p-10 rounded-lg items-center justify-between gap-10 h-screen ">
      <div className="flex flex-col gap-5 md:w-[50%] ml-7 ">
        <h1 className=" md:font-extrabold md:text-5xl text-2xl   text-gray-100  font-extrabold  sm:text-5xl mb-2  drop-shadow-[1px_1px_0px_black]">
          Order Food Anytime and Anywhere
        </h1>
        <p className="font-semibold  text-sm md:text-xl pt-2 mb-5 md:font-extrabold drop-shadow-[1px_1px_0px_black]   text-gray-100">
          Hey! Our Delicious food is waiting for you, we are always near to you
        </p>
        <div className="relative flex items-center gap-3 w-full">
          <Input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search your favorite food..."
            className="pl-10 h-10 shadow-lg text-xl "
          />
          <Search className="text-gray-500 absolute inset-y-2 left-2" />
          <Button onClick={() => navigate(`/search/${searchText}`)} className="max-w-sm  bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white    rounded-md mx-auto p-5d outline-none shadow-lg transform active:scale-x-75 transition-transform  flex">
            Search
          </Button>
        </div>
      </div>
      <div className="flex justify-center md:w-[30%] mr-10 hover:text-">
        <img
src={hero}
          alt="hero"
          className="object-cover w-full max-h-[300px] rounded-3xl opacity-95 transition-transform duration-500 ease-in-out transform hover:scale-110   "
        />
      </div>
    </div>
    </div>
  );
};

export default HeroSection;
