import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";

const LandingPage = () => {
  const handleOnclickSucess = () => {
    toast.success("This is a success message!");
  };

  const handleOnclickWarning = () => {
    toast.warning("This is a warning message!");
  };

  const handleOnclickInfo = () => {
    toast.info("This is an info message!");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen bg-gray-50">
      <div className="flex gap-4">
        <Button
          onClick={handleOnclickSucess}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <CheckCircle size={18} />
          Success
        </Button>

        <Button
          onClick={handleOnclickWarning}
          variant="destructive"
          className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2"
        >
          <AlertTriangle size={18} />
          Warning
        </Button>

        <Button
          onClick={handleOnclickInfo}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Info size={18} />
          Info
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
