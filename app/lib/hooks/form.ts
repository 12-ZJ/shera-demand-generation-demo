import { useRouter } from "next/navigation";
import { toastSuccess } from "../utils/toast-msg";
import { TOAST_DURATION_MS } from "../constants/config";
import { handleApiErrorWithRedirect } from "../utils/error-handler";

export const useFormSubmit = <T>() => {
  const router = useRouter();

  const handleSubmit = async ({
    e,
    validateForm,
    onSave,
    onSuccess,
    onError,
    redirectPath = "/",
    setProcessing,
    processing,
  }: {
    e: React.FormEvent;
    validateForm: () => boolean;
    setErrors?: React.Dispatch<React.SetStateAction<Partial<Record<keyof T, string>>>>;
    onSave: () => Promise<void>;
    onSuccess?: () => void;
    onError?: (err: any) => void;
    redirectPath?: string;
    setProcessing: (v: boolean) => void;
    processing: boolean;
  }) => {
    if (processing) return;

    e.preventDefault();

    const valid = validateForm();

    const isValid = valid;
    if (!isValid) return;

    try {
        setProcessing(true);
        await onSave();
        toastSuccess("Data saved successfully.");
        onSuccess?.()
        if (redirectPath) {
          setTimeout(() => router.replace(redirectPath), TOAST_DURATION_MS);
        }
    } catch (error) {
        if (onError) {
          onError(error);
        } else {
          handleApiErrorWithRedirect(error, router);
        }
    } finally {
        setTimeout(() => {
          setProcessing(false);
        }, TOAST_DURATION_MS);
    }
  };

  return { handleSubmit };
};