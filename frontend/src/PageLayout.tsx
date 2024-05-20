import { Redirect } from "wouter";
import { useSession } from "./hooks/useSession";

interface IProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: IProps) {
  const { data: session } = useSession();
  if (!session) return <Redirect to="/login" />;
  return children;
}
