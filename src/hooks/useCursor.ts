"use client";

import { useState } from "react";
import { CursorState } from "@/types";

export function useCustomCursor() {
  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    scale: 1,
    label: "",
    visible: true,
    isHovering: false,
  });

  return {
    ...state,
    setLabel: (label: string) => setState((prev) => ({ ...prev, label })),
    setHovering: (isHovering: boolean) => setState((prev) => ({ ...prev, isHovering })),
    setVisible: (visible: boolean) => setState((prev) => ({ ...prev, visible })),
  };
}
