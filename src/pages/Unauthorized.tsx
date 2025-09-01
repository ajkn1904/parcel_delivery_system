import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-background px-4">
      {/* Icon */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900 mb-6">
        <Lock className="w-10 h-10 text-red-500" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2 text-center">Access Denied</h1>
      <p className="text-muted-foreground text-center mb-6">
        You don’t have permission to view this page.
        Please log in with the right credentials.
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="default"
          className="flex items-center gap-2 uppercase px-6 py-2 text-white"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          BACK
        </Button> or
        <Button
          variant="outline"
          className="flex items-center gap-2 uppercase px-6 py-2 dark:bg-white text-black hover:text-black dark:hover:bg-gray-200"
          onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    </div>
  );
}
