import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function Unauthorized() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>This is Unauthorized component</h1>
      <div className="flex justify-end">
        <Button variant="default" className="flex items-center gap-2 dark:text-foreground hover:bg-blue-600 dark:hover:bg-blue-700" onClick={() => navigate('/login')}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>
    </div>
  );
}