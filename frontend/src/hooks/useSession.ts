import { useEffect, useState } from "react";
import { SESSION_KEY } from "../constants";
import { IAccount } from "../types";

const listeners = new Set<VoidFunction>();
const callListeners = () => {
  listeners.forEach((fn) => fn());
};

const subscribe = (fn: VoidFunction) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

const getSession = () => {
  return JSON.parse(
    localStorage.getItem(SESSION_KEY) as string
  ) as IAccount | null;
};

export const useSession = () => {
  const [session, setSession] = useState(getSession);

  useEffect(() => subscribe(() => setSession(getSession)), []);

  return {
    data: session,
    add: (s: IAccount) => {
      localStorage.setItem(SESSION_KEY, JSON.stringify(s));
      callListeners();
    },
    clear: () => {
      localStorage.removeItem(SESSION_KEY);
      callListeners();
    },
  };
};
