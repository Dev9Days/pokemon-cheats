export type ToastVariant = "success" | "error";

export type ToastPayload = {
  message: string;
  variant: ToastVariant;
};

export const TOAST_EVENT_NAME = "pokemon-cheats:toast";

export function showToast(payload: ToastPayload) {
  window.dispatchEvent(new CustomEvent<ToastPayload>(TOAST_EVENT_NAME, { detail: payload }));
}
