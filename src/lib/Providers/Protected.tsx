"use client";

import Loader from "@/components/Loader/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
const Protected = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
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
  }
  console.log(user?.data);
  return <div>{children}</div>;
};

export default Protected;
