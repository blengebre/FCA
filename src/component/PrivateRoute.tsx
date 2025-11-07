// components/PrivateRoute.tsx
import { ReactNode } from "react"
import { useAppSelector } from "../types/hooks";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
