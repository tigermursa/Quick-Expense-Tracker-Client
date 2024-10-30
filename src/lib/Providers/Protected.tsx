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

  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (user?.status == "200") {
    // console.log("i am user data 200 ", user);
    return <div>{children}</div>;
  } else if (user?.status == "404" || error) {
    router.push("/auth/login");
  }
};

export default Protected;
