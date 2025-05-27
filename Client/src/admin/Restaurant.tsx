import { Label } from "@radix-ui/react-label"; 
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { RestaurantFormSchema, restaurantFromSchema } from "../schema/restaurantSchema";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { useEffect } from "react";



interface InputState {
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  imageFile?: File;
}

const Restaurant = () => {
  const [input, setInput] = useState<InputState>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const [error, setError] = useState<Partial<RestaurantFormSchema>>({});
  const{loading, createRestaurant, restaurant,  updateRestaurant, getRestaurant
  } =
   useRestaurantStore()


  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files) {
      setInput({ ...input, [name]: files[0] });
    } else if (name === "deliveryTime") {
      setInput({ ...input, [name]: Number(value) });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    const result = restaurantFromSchema.safeParse(input);
    if (!result.success) {
     
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<RestaurantFormSchema>);
      return;
    }
    // add restaurant API implementation start from here
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.imageFile) {
        formData.append("imageFile", input.imageFile);
      }

      if (restaurant) {
        // update
        await updateRestaurant(formData);
      } else {
        // create
        await createRestaurant(formData);
      }
    } catch (error) {
   
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      if(restaurant){
        setInput({
          restaurantName: restaurant.restaurantName || "",
          city: restaurant.city || "",
          country: restaurant.country || "",
          deliveryTime: restaurant.deliveryTime || 0,
          cuisines: restaurant.cuisines
            ? restaurant.cuisines.map((cuisine: string) => cuisine)
            : [],
          imageFile: undefined,
        });
      };
      }
    fetchRestaurant();
   
    
  }, []);
  
  return (
    
    
    
    <div className="max-w-6xl mx-auto my-10 p-6  bg-white rounded-md shadow-md">
      <h1 className="font-extrabold text-2xl mb-5 text-center">Add Restaurant</h1>
      <form onSubmit={submitHandler}>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Restaurant Name */}
          <div className="flex flex-col">
            <Label className="mb-2">Restaurant Name</Label>
            <Input
              type="text"
              name="restaurantName"
              value={input.restaurantName}
              onChange={changeEventHandler}
              placeholder="Enter your restaurant name"
              className="w-full"
            />
            {error.restaurantName && <span className="text-xs text-red-600 font-medium">{error.restaurantName}</span>}
          </div>
          {/* City */}
          <div className="flex flex-col">
            <Label className="mb-2">City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
              placeholder="Enter your city name"
              className="w-full"
            />
            {error.city && <span className="text-xs text-red-600 font-medium">{error.city}</span>}
          </div>
          {/* Country */}
          <div className="flex flex-col">
            <Label className="mb-2">Country</Label>
            <Input
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
              placeholder="Enter your country name"
              className="w-full"
            />
            {error.country && <span className="text-xs text-red-600 font-medium">{error.country}</span>}
          </div>
          {/* Delivery Time */}
          <div className="flex flex-col">
            <Label className="mb-2">Delivery Time</Label>
            <Input
            min={0}
              type="number"
              name="deliveryTime"
              value={input.deliveryTime}
              onChange={changeEventHandler}
              placeholder="Enter your delivery time"
              className="w-full"
            />
            {error.deliveryTime && <span className="text-xs text-red-600 font-medium">{error.deliveryTime}</span>}
          </div>
          {/* Cuisines */}
          <div className="flex flex-col">
            <Label className="mb-2">Cuisines</Label>
            <Input
              type="text"
              name="cuisines"
              value={input.cuisines.join(", ")}
              onChange={(e) => setInput({ ...input, cuisines: e.target.value.split(",") })}
              placeholder="Ex- Burger, Pasta"
              className="w-full"
            />
            {error.cuisines && <span className="text-xs text-red-600 font-medium">{error.cuisines.join(", ")}</span>}
          </div>
          {/* Upload Restaurant Banner */}
          <div className="flex flex-col">
            <Label className="mb-2">Upload Restaurant Banner</Label>
            <Input
              type="file"
              accept="image/*"
              name="imageFile"
              onChange={changeEventHandler}
              className="w-full"
            />
            {error.imageFile && <span className="text-xs text-red-600 font-medium">{error.imageFile.name || "Image file is required"}</span>}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          {loading ? (
            <Button disabled type="submit" className="bg-orange hover:bg-hoverOrange px-6 py-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button className="bg-orange hover:bg-hoverOrange">
                  {restaurant
                    ? "Update Your Restaurant"
                    : "Add Your Restaurant"}
                </Button>

          )}
        </div>
      </form>
    </div>
  );
};

export default Restaurant;
   
