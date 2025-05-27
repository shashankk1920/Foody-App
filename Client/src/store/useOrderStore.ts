import { CheckoutSessionRequest, OrderState } from "../types/orderType";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


const API_END_POINT = "http://localhost:8000/api/v1/order"; // Updated to use HTTP for local development
axios.defaults.withCredentials = true; 

export const useOrderStore = create<OrderState>()(persist((set => ({
    loading: false,
    orders: [],
    createCheckoutSession: async (checkoutSession: CheckoutSessionRequest) => {
      try {
        set({ loading: true });

        const response = await axios.post(
          `${API_END_POINT}/checkout/create-checkout-session`,
          checkoutSession,
          { headers: { 'Content-Type': 'application/json' } }
        );
        

        if (!response.data?.session?.url) {
          throw new Error("Stripe session URL is missing in the response.");
        }

        window.location.href = response.data.session.url;
      } catch (error: any) {
       
        alert("Something went wrong during checkout. Please try again.");
      } finally {
        set({ loading: false });
      }
    },
   getOrderDetails: async () => {
  try {
    set({ loading: true });

    // ✅ Actual API call
    const response = await axios.get(`${API_END_POINT}/`);
    set({ orders: response.data.orders });

  } catch (error: any) {
  
    alert("Something went wrong while fetching order details.");
  } finally {
    set({ loading: false });
  }
}

})), {
    name: 'order-name',
    storage: createJSONStorage(() => localStorage)
}))