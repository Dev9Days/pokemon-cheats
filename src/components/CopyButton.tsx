import { Check, Copy } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { showToast } from "../utils/toast";

const COPY_BUSY_INDICATOR_DELAY_MS = 120;
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

async function copyText(text: string, isCurrent: () => boolean) {
  if (!isCurrent()) return;
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      if (!isCurrent()) return;
      copyTextWithTextArea(text);
      return;
    }
  }

  copyTextWithTextArea(text);
}

type CopyButtonProps = {
  cacheKey?: string;
  getText?: () => Promise<string> | string;
  label: string;
  successDescription?: string;
  text?: string;
};

export function CopyButton({ cacheKey, getText, label, successDescription, text = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const pendingTextRef = useRef<Promise<string> | null>(null);
  const copyInFlightRef = useRef(false);
  const busyIndicatorTimerRef = useRef<number | null>(null);
  const copiedTimerRef = useRef<number | null>(null);
  const generationRef = useRef(0);

  useLayoutEffect(() => {
    generationRef.current += 1;
    pendingTextRef.current = null;
    copyInFlightRef.current = false;
    setCopied(false);
    setIsRetrying(false);

    return () => {
      generationRef.current += 1;
      if (busyIndicatorTimerRef.current !== null) window.clearTimeout(busyIndicatorTimerRef.current);
      if (copiedTimerRef.current !== null) window.clearTimeout(copiedTimerRef.current);
      busyIndicatorTimerRef.current = null;
      copiedTimerRef.current = null;
    };
  }, [cacheKey]);

  function waitForRetryDelay() {
    return new Promise<void>((resolve) => {
      window.setTimeout(resolve, COPY_RETRY_DELAY_MS);
    });
  }

  function scheduleBusyIndicator() {
    if (busyIndicatorTimerRef.current !== null) window.clearTimeout(busyIndicatorTimerRef.current);

    busyIndicatorTimerRef.current = window.setTimeout(() => {
      busyIndicatorTimerRef.current = null;
      setIsRetrying(true);
    }, COPY_BUSY_INDICATOR_DELAY_MS);
  }

  function showBusyIndicatorNow() {
    if (busyIndicatorTimerRef.current !== null) {
      window.clearTimeout(busyIndicatorTimerRef.current);
      busyIndicatorTimerRef.current = null;
    }

    setIsRetrying(true);
  }

  function stopBusyIndicator() {
    if (busyIndicatorTimerRef.current !== null) {
      window.clearTimeout(busyIndicatorTimerRef.current);
      busyIndicatorTimerRef.current = null;
    }

    setIsRetrying(false);
  }

  function loadText() {
    if (!getText) return Promise.resolve(text);

    if (!pendingTextRef.current) {
      const pending = Promise.resolve().then(() => getText()).catch((error) => {
        if (pendingTextRef.current === pending) pendingTextRef.current = null;
        throw error;
      });
      pendingTextRef.current = pending;
    }
    return pendingTextRef.current;
  }

  function prefetchText() {
    void loadText().catch(() => {});
  }

  async function copyCode() {
    if (copyInFlightRef.current) return;

    copyInFlightRef.current = true;
    const generation = generationRef.current;
    const isCurrent = () => generation === generationRef.current;
    if (copiedTimerRef.current !== null) window.clearTimeout(copiedTimerRef.current);
    scheduleBusyIndicator();

    try {
      const nextText = await loadText();
      if (!isCurrent()) return;
      try {
        await copyText(nextText, isCurrent);
      } catch {
        if (!isCurrent()) return;
        showBusyIndicatorNow();
        await waitForRetryDelay();
        if (!isCurrent()) return;
        await copyText(nextText, isCurrent);
      }

      if (!isCurrent()) return;
      stopBusyIndicator();
      setCopied(true);
      showToast({ message: "복사 완료", description: successDescription, variant: "success" });
      copiedTimerRef.current = window.setTimeout(() => {
        copiedTimerRef.current = null;
        if (isCurrent()) setCopied(false);
      }, 1800);
    } catch {
      if (!isCurrent()) return;
      stopBusyIndicator();
      setCopied(false);
      showToast({ message: "복사 실패", variant: "error" });
    } finally {
      if (isCurrent()) copyInFlightRef.current = false;
    }
  }

  return (
    <button
      className="icon-button"
      type="button"
      disabled={isRetrying}
      onClick={copyCode}
      onPointerDown={prefetchText}
      onTouchStart={prefetchText}
      aria-label={`${label} 코드 복사`}
    >
      {isRetrying ? <span className="copy-retry-spinner" aria-hidden="true" /> : copied ? <Check size={15} /> : <Copy size={15} />}
    </button>
  );
}
