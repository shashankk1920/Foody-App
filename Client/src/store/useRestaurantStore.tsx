import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import { MenuItem, RestaurantState } from "../types/restaurantTypes";
import { Orders } from "../types/orderType";

const API_END_POINT = "http://localhost:8000/api/v1/restaurant"; // For local development
axios.defaults.withCredentials = true;

export const useRestaurantStore = create<RestaurantState >()(
  persist(
    (set, get) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      restaurantOrder: [],

      // Create a new restaurant
      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            await get().getRestaurant();
           
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
          set({ loading: false });
        }
      },

      // Fetch all restaurants
      getRestaurant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);
          if (response.data.success) {
            set({ restaurant: response.data.restaurant });
          }
        } catch (error: any) {
          if (error.response?.status === 404) {
            set({ restaurant: null });
          }
        } finally {
          set({ loading: false });
        }
      },

      // Update a restaurant
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
          set({ loading: false });
        }
      },

      // Search restaurants
      searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: String[]) => {
      
        try {
            set({ loading: true });

            const params = new URLSearchParams();
            params.set("searchQuery", searchQuery);
            params.set("selectedCuisines", selectedCuisines.join(","));

            // await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);
            if (response.data.success) {
                set({ loading: false, searchedRestaurant: response.data });
            }
        } catch (error) {
            set({ loading: false });
        }
    },

      // Add a menu to a restaurant
      addMenuToRestaurant: (menu: MenuItem) => {
        set((state: any) => ({
            restaurant: state.restaurant ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] } : null,
        }))
    },
    

      // Update a menu in a restaurant
      updateMenuToRestaurant: (updatedMenu: MenuItem) => {
        set((state) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.map((menu: MenuItem) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenuList,
              },
            };
          }
          return state;
        });
      },

      // Apply a filter
      setAppliedFilter: (value: string) => {
        set((state) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },

      // Reset all filters
      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },

      // Fetch a single restaurant by ID
      getSingleRestaurant: async (restaurantId: string) => {
        try {
          const response = await axios.get(`${API_END_POINT}/${restaurantId}`);
          if (response.data.success) {
            set({ singleRestaurant: response.data.restaurant });
          }
        } catch (error: any) {
          toast.error("Failed to fetch the restaurant details");
        }
      },

      // Fetch restaurant orders
      getRestaurantOrder: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/order`);
          if (response.data.success) {
            set({ restaurantOrder: response.data.orders });
          }
        } catch (error: any) {
          toast.error("Failed to fetch restaurant orders");
        } finally {
          set({ loading: false });
        }
      },
      updateRestaurantOrder: async (orderId: string, status: string) => {
        try {
            const response = await axios.put(`${API_END_POINT}/order/${orderId}/status`, { status }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                const updatedOrder = get().restaurantOrder.map((order: Orders) => {
                    return order._id === orderId ? { ...order, status: response.data.status } : order;
                })
                set({ restaurantOrder: updatedOrder });
                toast.success(response.data.message);
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    }),
  {
    name: "restaurant-name",
    storage: createJSONStorage(() => localStorage),
  })
);
