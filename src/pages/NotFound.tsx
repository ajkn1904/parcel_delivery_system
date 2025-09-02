import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Button className="text-white uppercase" onClick={() => navigate("/")}>Go Home</Button>
    </div>
  );
}
