"use client";

import Loader from "@/components/Loader/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Define the props for the Protected component
interface ProtectedProps {
  children: React.ReactNode; // children can be any React node
}

const Protected = ({ children }: ProtectedProps) => {
  const router = useRouter();
  const { user, loading, error } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user?.status === "404" || error) {
        router.push("/auth/login");
      }
    }
  }, [loading, user, error, router]);

  if (loading) {
    return <Loader />;
  }

  if (user?.status === "200") {
    return <div>{children}</div>;
  }

  return null; // or a fallback UI if needed
};

export default Protected;
