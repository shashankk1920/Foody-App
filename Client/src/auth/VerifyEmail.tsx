import { FormEvent, useRef, useState } from "react";
import { Input } from "../components/ui/input";

import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { useUserStore } from "../store/useUserStore";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  //we are useref beacuse we want to target the box means wwhen we write in the one box of than automatically moves to another box

  const inputRef = useRef<any>([]);
 
  const {loading, verifyEmail} = useUserStore();
  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
    //Move to the next input field id a digit is entered

    if (value != "" && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index];
    }
  };

  const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    await verifyEmail(otp.join(""));

  }

  return (
    <div className="flex items-center justify-center h-screen w-full md:border border-gray-200 bg-[#f7f1e8b4]">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Veriify Your Email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6 digit code sent your email address
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex justify-between">
            {otp.map((letter: string, idx: number) => (
              <Input
                key={idx}
                ref={(element) => (inputRef.current[idx] = element)}
                type="text"
                value={letter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(idx, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(idx, e)
                }
                className="md:w-12 md:h-12 w-8 h-8 text:center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:otuline-none focus-ring-2 focus:ring-indigo-500   "
              />
            ))}
          </div>
          {loading ? (
            <Button
              disabled
              className="bg-orange hover:bg-hoverOrange mt-6 w-full"
            >
              {" "}
              <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait{" "}
            </Button>
          ) : (
            <Button className="bg-orange hover:bg-hoverOrange mt-6 w-full">
              {" "}
              Verify{" "}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
