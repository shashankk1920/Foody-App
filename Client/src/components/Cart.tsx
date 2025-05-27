import { Minus, Plus, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useCartStore } from "../store/useCartStore";
import { CartItem } from "../types/cartType";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    cart,
    decrementQuantity,
    incrementQuantity,
    clearCart,
    removeFromTheCart,
  } = useCartStore();

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatNumber = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Shopping Cart</h2>
        {cart.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => {
              if (confirm("Are you sure you want to clear the cart?")) {
                clearCart();
              }
            }}
            className="gap-2"
          >
            <Trash2 size={18} />
            Clear All
          </Button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-xl">Your cart is empty.</div>
      ) : (
        <>
          <Table className="shadow-md rounded-md border border-gray-200">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item: CartItem) => (
                <TableRow key={item._id} className="hover:bg-gray-50">
                  <TableCell>
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={item.image} alt={item.name} />
                      <AvatarFallback>{item.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{formatNumber(item.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 rounded-full  border-gray-300">
                      <Button
                        onClick={() => decrementQuantity(item._id)}
                        size="icon"
                        variant="ghost"
                        className="rounded-full hover:bg-hoverOrange text-white bg-orange hover:text-white"
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        onClick={() => incrementQuantity(item._id)}
                        size="icon"
                        variant="ghost"
                        className="rounded-full bg-orange text-white hover:bg-hoverOrange"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{formatNumber(item.price * item.quantity)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFromTheCart(item._id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-gray-100 text-lg font-bold">
              <TableRow>
                <TableCell colSpan={4}></TableCell>
                <TableCell>Total:</TableCell>
                <TableCell className="text-right">{formatNumber(totalAmount)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <div className="flex justify-end mt-6">
            <Button
              onClick={() => setOpen(true)}
              className="bg-orange text-white hover:bg-hoverOrange px-6 py-2 text-lg rounded-lg shadow"
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}

      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
