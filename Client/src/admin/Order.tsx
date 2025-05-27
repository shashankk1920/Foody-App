import { useEffect } from "react";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useRestaurantStore } from "../store/useRestaurantStore";

const Orders = () => {
  const { restaurantOrder, getRestaurantOrder, updateRestaurantOrder } = useRestaurantStore();

  const handleStatusChange = async (id: string, status: string) => {
    await updateRestaurantOrder(id, status);
  };

  useEffect(() => {
    getRestaurantOrder();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        Orders Overview
      </h1>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantOrder.map((order) => (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-300 dark:border-gray-700 transition-transform duration-300 hover:scale-105">
            {/* Order Details */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {order.deliveryDetails.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Address:</span> {order.deliveryDetails.address}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Total Amount:</span> ₹{order.totalAmount / 100}
              </p>
            </div>

            {/* Order Status Dropdown */}
            <div className="w-full">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Status
              </Label>
              <Select onValueChange={(newStatus) => handleStatusChange(order._id, newStatus)} defaultValue={order.status}>
                <SelectTrigger className="border-2 border-gray-300 dark:border-gray-600 py-3 px-4 rounded-md text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {["Pending", "Confirmed", "Preparing", "OutForDelivery", "Delivered"].map((status, index) => (
                      <SelectItem
                        key={index}
                        value={status.toLowerCase()}
                        className="py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;