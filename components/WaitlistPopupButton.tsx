"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import WaitlistForm from "@/components/WaitlistForm";

type WaitlistPopupButtonProps = {
  className?: string;
  children: ReactNode;
  initialEmail?: string;
  onOpen?: () => void;
};

export default function WaitlistPopupButton({
  className,
  children,
  initialEmail = "",
  onOpen,
}: WaitlistPopupButtonProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          onOpen?.();
          setShowPopup(true);
        }}
      >
        {children}
      </button>

      {mounted && showPopup &&
        createPortal(
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/55 px-4 py-8 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-3xl">
            <WaitlistForm
              mode="popup"
              initialEmail={initialEmail}
              onClose={() => setShowPopup(false)}
            />
          </div>
        </div>
        , document.body)}
    </>
  );
}
