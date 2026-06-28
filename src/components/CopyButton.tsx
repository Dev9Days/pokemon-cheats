import { Check, Copy } from "lucide-react";
import { useState } from "react";

async function copyText(text: string) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

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

export function CopyButton({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await copyText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button className="icon-button" type="button" onClick={copyCode} aria-label={`${label} 코드 복사`}>
      {copied ? <Check size={15} /> : <Copy size={15} />}
    </button>
  );
}
