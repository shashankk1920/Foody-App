import { Input } from "../components/ui/input";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoginInputState, userLoginSchema } from "../schema/userSchema";
import { useUserStore } from "../store/useUserStore";

const Login = () => { 
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });

  const [error, setErrors] = useState<Partial<LoginInputState>>({});
  const{loading, login} = useUserStore();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value }); 
  }

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setErrors(fieldError as Partial<LoginInputState>);
      return;
    }

    await login(input);
  }



  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f7f1e8b4] "> {/* Added bg-gray-100 for background color */}
      <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 bg-white">
        <div className="mb-5">
          <h1 className="font-bold text-2xl text-center hover:text-hoverOrange transition duration-300 ease-in-out">FoodyPlace</h1>
        </div>
        <div className="mb-5">
          <div className="relative">
            <Input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-2 left-3 text-gray-500 pointer-events-none" />
            {error && <span className="text-sm text-red-500">{error.email}</span>}
          </div>
        </div>
        <div className="mb-5">
          <div className="relative">
            <Input
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-2 left-3 text-gray-500 pointer-events-none" />
            {error.password && <span className="text-sm text-red-500">{error.password}</span>}
          </div>
        </div>
        <div className="mb-11">
          {loading ? (
            <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">Login</Button>
          )}
          <div className="mt-3 text-center">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password</Link>
          </div>
        </div>
        <Separator />
        <p className="mt-2 justify-center text-center">
          Don't have an account?
          <Link to="/signup" className="text-blue-500 ml-1 hover:underline">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
