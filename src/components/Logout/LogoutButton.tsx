"use client";

import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LogoutButton: React.FC = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call the logout API with an empty object
      await logout({}).unwrap();

      // Clear userId from localStorage
      localStorage.removeItem("userId");

      // Notify user of successful logout
      toast.success("Logged out successfully");

      // Redirect to login page
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
