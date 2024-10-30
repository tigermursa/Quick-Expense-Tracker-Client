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
      className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
