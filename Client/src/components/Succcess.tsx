import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderStore } from "../store/useOrderStore";
import { useEffect } from "react"; 
import { CartItem } from "../types/cartType";

const Success = () => {
  const { orders, getOrderDetails } = useOrderStore();

  useEffect(() => {
    getOrderDetails();
  }, []);

  if (orders.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-blue-400 to-blue-600">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 max-w-lg w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Order Status:{" "}
              <span className="text-[#FF5A5A]">{"CONFIRM"}</span>
            </h1>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Order Summary
            </h2>
            {orders.map((order:any, index:number) => (
              <div key={index}>
                {order.cartItems.map((item:CartItem) => (
                  <div className="mb-4" key={item._id}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt=""
                          className="w-14 h-14 rounded-md object-cover"
                        />
                        <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                          {item.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-800 dark:text-gray-200 flex items-center">
                          <IndianRupee />
                          <span className="text-lg font-medium">{item.price}</span>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                  </div>
                ))}
              </div>
            ))}
        <div className="flex justify-center mt-6">
 <Link to="/cart">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md shadow-lg">
               Continue Shopping
              </Button>
            </Link>
</div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Success;