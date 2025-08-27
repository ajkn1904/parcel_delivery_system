import type { ReactNode } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "./ui/alert-dialog";

interface IProps {
  children: ReactNode;
  onConfirm: () => void;
  actionType?: "block" | "unblock" | "delete" | "restore";
  customTitle?: string;
  customDescription?: string;
}

export default function BlockOrDeleteConfirmation({
  children,
  onConfirm,
  actionType,
  customTitle,
  customDescription,
}: IProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const actionText =
    actionType === "delete"
      ? "delete" 
      : actionType === "restore"
      ? "restore"
      : actionType === "block"
      ? "block"
      : "unblock";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Are you sure you want to ${actionText} this ${customTitle}`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {customDescription ||
              `This action will ${actionText} the selected user/data.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="text-white" onClick={handleConfirm}>
            {actionText.charAt(0).toUpperCase() + actionText.slice(1)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
