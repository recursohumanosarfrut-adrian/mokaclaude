"use client";
import { useEffect, useState } from "react";
import { getOpenStatus } from "./hours";

/** Se calcula solo en el cliente para evitar diferencias de hidratación. */
export function useOpenStatus() {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);
  return status;
}
