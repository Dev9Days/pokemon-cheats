import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import { showToast } from "../utils/toast";

const COPY_RETRY_DELAY_MS = 500;

function copyTextWithTextArea(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.append(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  try {
    const copied = document.execCommand("copy");
    if (!copied) throw new Error("copy command failed");
  } finally {
    textarea.remove();
  }
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      copyTextWithTextArea(text);
      return;
    }
  }

  copyTextWithTextArea(text);
}

type CopyButtonProps = {
  getText?: () => Promise<string> | string;
  label: string;
  text?: string;
};

export function CopyButton({ getText, label, text = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const pendingTextRef = useRef<Promise<string> | null>(null);

  function waitForRetryDelay() {
    return new Promise<void>((resolve) => {
      window.setTimeout(resolve, COPY_RETRY_DELAY_MS);
    });
  }

  function loadText() {
    if (!getText) return Promise.resolve(text);

    pendingTextRef.current ??= Promise.resolve(getText()).catch((error) => {
      pendingTextRef.current = null;
      throw error;
    });
    return pendingTextRef.current;
  }

  function prefetchText() {
    void loadText();
  }

  async function copyCode() {
    try {
      const nextText = await loadText();
      try {
        await copyText(nextText);
      } catch {
        setIsRetrying(true);
        await waitForRetryDelay();
        await copyText(nextText);
      }

      setIsRetrying(false);
      setCopied(true);
      showToast({ message: "복사 완료", variant: "success" });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setIsRetrying(false);
      setCopied(false);
      showToast({ message: "복사 실패", variant: "error" });
    }
  }

  return (
    <button
      className="icon-button"
      type="button"
      onClick={copyCode}
      onPointerDown={prefetchText}
      onTouchStart={prefetchText}
      aria-label={`${label} 코드 복사`}
    >
      {isRetrying ? <span className="copy-retry-spinner" aria-hidden="true" /> : copied ? <Check size={15} /> : <Copy size={15} />}
    </button>
  );
}
