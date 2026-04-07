"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getUserName, setUserName as saveUserName } from "@/lib/storage";

type UserContextType = {
  userName: string;
  setName: (name: string) => void;
  showNameModal: () => void;
};

const UserContext = createContext<UserContextType>({
  userName: "",
  setName: () => {},
  showNameModal: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function UserIdentityProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserNameState] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getUserName();
    if (stored) {
      setUserNameState(stored);
    } else {
      setModalOpen(true);
    }
  }, []);

  const setName = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    saveUserName(trimmed);
    setUserNameState(trimmed);
    setModalOpen(false);
    setInput("");
  }, []);

  const showNameModal = useCallback(() => {
    setInput(userName);
    setModalOpen(true);
  }, [userName]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <UserContext.Provider value={{ userName, setName, showNameModal }}>
      {children}

      {/* Persistent name badge */}
      {userName && !modalOpen && (
        <button
          onClick={showNameModal}
          className="fixed bottom-4 right-4 z-50 rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-cream shadow-lg hover:bg-ink/80 transition-colors"
          data-no-print
        >
          {userName}
        </button>
      )}

      {/* Name modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm" data-no-print>
          <div className="mx-4 w-full max-w-sm rounded-xl bg-parchment p-6 shadow-2xl">
            <h2 className="font-heading text-xl font-semibold text-ink">
              {userName ? "Change your name" : "Welcome! What's your name?"}
            </h2>
            <p className="mt-1 text-sm text-stone">
              Your name appears on votes and comments.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setName(input);
              }}
              className="mt-4"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your name"
                autoFocus
                className="w-full rounded-lg border border-mist bg-cream px-3 py-2 text-sm text-ink placeholder:text-stone/50 focus:border-loch focus:outline-none focus:ring-1 focus:ring-loch"
              />
              <div className="mt-4 flex gap-2">
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="rounded-lg bg-loch px-4 py-2 text-sm font-medium text-cream hover:bg-loch/90 disabled:opacity-40 transition-colors"
                >
                  {userName ? "Update" : "Continue"}
                </button>
                {userName && (
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-stone hover:text-ink transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </UserContext.Provider>
  );
}
