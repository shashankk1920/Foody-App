import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Loader2, LocateIcon, Mail, MapPin, MapPinnedIcon, Plus } from "lucide-react";
import { useRef, useState, FormEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { useUserStore } from "../store/useUserStore";

const Profile = () => {
  const { user, updateProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    profilePicture: user?.profilePicture || "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>(profileData.profilePicture || "");

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateProfile(profileData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-blue-400 to-blue-600 text-white">
      <div className="flex flex-col items-center justify-center min-h-screen bg-white-300 dark:bg-gray-800">
        <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5 p-6 bg-white rounded-lg shadow-md">
          {/* Profile Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Profile Picture */}
              <Avatar className="relative w-28 h-28 border-4 border-orange rounded-full">
                <AvatarImage src={selectedProfilePicture} className="w-full h-full object-cover rounded-full" />
                <AvatarFallback className="text-lg font-bold bg-gray-300 rounded-full flex items-center justify-center">
                  CN
                </AvatarFallback>
                <input ref={imageRef} className="hidden" type="file" accept="image/*" onChange={fileChangeHandler} />
                <div
                  onClick={() => imageRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60 rounded-full cursor-pointer"
                >
                  <Plus className="text-white w-10 h-10" />
                </div>
              </Avatar>

              {/* Full Name Input */}
              <Input
                type="text"
                name="fullname"
                value={profileData.fullname}
                onChange={changeHandler}
                className="text-2xl font-bold outline-none border-none focus:ring-2 focus:ring-orange rounded-md p-2"
              />
            </div>
          </div>

          {/* User Information Fields */}
          <div className="grid md:grid-cols-4 gap-4 my-10">
            {[
              { icon: <Mail className="text-gray-500" />, label: "Email", name: "email", value: profileData.email, disabled: true },
              { icon: <LocateIcon className="text-gray-500" />, label: "Address", name: "address", value: profileData.address },
              { icon: <MapPin className="text-gray-500" />, label: "City", name: "city", value: profileData.city },
              { icon: <MapPinnedIcon className="text-gray-500" />, label: "Country", name: "country", value: profileData.country },
            ].map(({ icon, label, name, value, disabled }) => (
              <div key={name} className="flex items-center gap-4 p-3 rounded-md bg-gray-100 shadow-sm">
                {icon}
                <div className="w-full">
                  <Label className="text-gray-600 font-semibold">{label}</Label>
                  <input
                    name={name}
                    value={value}
                    onChange={changeHandler}
                    disabled={disabled}
                    className="w-full bg-transparent text-gray-700 focus:ring-2 focus:ring-orange outline-none p-2 rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Update Button */}
          <div className="text-center flex items-center justify-center">
            <Button
              disabled={isLoading}
              className="bg-orange hover:bg-hoverOrange flex items-center justify-center py-3 px-6 rounded-lg shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;