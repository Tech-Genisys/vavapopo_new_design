"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./authcontext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
