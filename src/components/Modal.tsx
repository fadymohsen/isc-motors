"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal
        className="mx-4 w-full max-w-md border border-white/10 bg-dark2 p-8 shadow-2xl"
      >
        {children}
      </div>
    </div>
  );
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="font-display text-2xl uppercase tracking-tightest2 text-white">
        {title}
      </h3>
      <p className="mt-3 font-mono text-sm uppercase leading-relaxed text-white/60">
        {message}
      </p>
      <div className="mt-8 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 border border-white/20 py-3 font-mono text-xs uppercase tracking-wide text-white/70 transition-colors hover:border-white/40 hover:text-white"
        >
          {cancelLabel}
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="flex-1 bg-red py-3 font-mono text-xs uppercase tracking-wide text-white transition-colors hover:bg-[#e00e0f]"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
