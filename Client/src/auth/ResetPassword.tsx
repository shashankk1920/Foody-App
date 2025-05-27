import { Input } from "../components/ui/input";
import { useState } from "react";
import { Loader2, LockKeyholeIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom"; // Ensure the correct import path

const ResetPassword= () => {
  const [newPassword, setNewPassword] = useState<string>(""); // Define state correctly
  const loading = false;

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#f7f1e8b4] ">
      <form className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg md:border border-gray-300 ">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2 hover:text-hoverOrange h transition duration-300 ease-in-ou">Reset Password</h1>
          <p className="text-sm text-gray-600">Enter your new password to reset old one</p>
        </div>
        <div className="relative">
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} // Corrected onChange handler
            placeholder="Enter your new password"
            className="pl-10"
          />
          <LockKeyholeIcon className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>
        {
          loading ? (
            <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button className="w-full bg-orange hover:bg-hoverOrange">
               Reset 
            </Button>
          )
        }
        <span className="text-center">
          Back to{" "}
          <Link to="/login" className="text-blue-500  hover:underline">Login</Link> 
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
