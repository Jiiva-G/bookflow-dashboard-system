
// Re-export from sonner
import { toast } from "sonner";

export { toast };

export function useToast() {
  return {
    toast,
    // Adding dismiss method for backward compatibility
    dismiss: (toastId?: string) => {
      if (toastId) {
        toast.dismiss(toastId);
      } else {
        toast.dismiss();
      }
    }
  };
}
