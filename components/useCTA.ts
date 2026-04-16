"use client";

export function useCTAHandler() {
  return (email?: string) => {
    const value = email?.trim() ?? "";

    if (value.includes("@")) {
      window.alert(
        "You're on the list! We will reach out before launch to lock in your founder pricing."
      );
      return true;
    }

    const hero = document.querySelector<HTMLInputElement>(".hero-email-input");
    const final = document.querySelector<HTMLInputElement>(".final-email-input");
    (hero ?? final)?.focus();
    return false;
  };
}
