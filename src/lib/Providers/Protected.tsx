"use client";

import Loader from "@/components/Loader/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

// Define the props for the Protected component
interface ProtectedProps {
  children: ReactElement; // children should be a React element to pass props
}

const Protected = ({ children }: ProtectedProps) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    router.push("/auth/login");
    return null; // Early return to prevent rendering children
  }

  // Clone the children element and pass the user prop to it
  return <div>{children}</div>;
};

export default Protected;
