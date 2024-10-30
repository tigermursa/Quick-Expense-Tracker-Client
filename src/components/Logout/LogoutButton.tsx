"use client";

import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface LogoutButtonProps {
  refetch: () => void; // Define the refetch prop type
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ refetch }) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      localStorage.removeItem("userId");
      toast.success("Logged out successfully");
  
      // Trigger refetch to update the user data after logout
      refetch(); 
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Error during logout");
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className=" w-[70%] px-2 text-red-700  text-lg text-start"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
