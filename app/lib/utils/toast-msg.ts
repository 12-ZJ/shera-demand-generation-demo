import { Slide, toast } from "react-toastify";
import { TOAST_DURATION_MS } from "../constants";

export function toastInfo(msg: string) {
    toast.info(msg, {
        className: "toast-container",
        position: "top-right",
        autoClose: TOAST_DURATION_MS,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
    });
}

export function toastSuccess(msg: string) {
    toast.success(msg, {
        className: "toast-container",
        position: "top-right",
        autoClose: TOAST_DURATION_MS,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
    });
}

export function toastWarning(msg: string) {
    toast.warning(msg, {
        className: "toast-container",
        position: "top-right",
        autoClose: TOAST_DURATION_MS,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
    });
}

export function toastError(msg: string) {
    toast.error(msg, {
        className: "toast-container",
        position: "top-right",
        autoClose: TOAST_DURATION_MS,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
    });
}