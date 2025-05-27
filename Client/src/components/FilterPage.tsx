import { useEffect } from "react";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export type FilterOptionsState = {
  id: string;
  label: string;
};

const filterOptions: FilterOptionsState[] = [
  { id: "burger", label: "Burger" },
  { id: "thali", label: "Thali" },
  { id: "biryani", label: "Biryani" },
  { id: "momos", label: "Momos" },
];

const FilterPage = () => {
  const {
    setAppliedFilter,
    appliedFilter,
    resetAppliedFilter,
    searchRestaurant,
  } = useRestaurantStore();

  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value); // Zustand store already toggles based on existence
  };

  useEffect(() => {
    const searchText = ""; // Modify based on your app's flow
    const searchQuery = ""; // You can derive this from search bar if needed
    searchRestaurant(searchText, searchQuery, appliedFilter);
  }, [appliedFilter, searchRestaurant]);

  return (
    <div className="md:w-72 p-5 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-semibold text-xl text-gray-900">Filter by cuisines</h1>
        <Button variant={"link"} className="text-sm text-blue-600 hover:text-blue-800" onClick={resetAppliedFilter}>
          Reset
        </Button>
      </div>

      <div className="flex flex-col space-y-4">
        {filterOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center space-x-3 cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100 transition"
          >
            <Checkbox
              id={option.id}
              checked={appliedFilter.includes(option.label)}
              onCheckedChange={() =>
                appliedFilterHandler(option.label)
              }
              className="cursor-pointer"
            />
            <Label
              htmlFor={option.id}
              className="text-sm font-medium leading-none cursor-pointer select-none text-gray-800"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPage;
