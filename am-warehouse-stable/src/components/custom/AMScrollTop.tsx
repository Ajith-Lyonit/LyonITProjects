// AMScrollTop.tsx
import { useEffect } from "react";
import { Platform } from "react-native";

interface ScrollToTopProps {
  navigationRef: any;
}

export default function ScrollToTop({ navigationRef }: ScrollToTopProps) {
  useEffect(() => {
    if (Platform.OS !== "web") return;
    if (!navigationRef) return;

    const unsubscribe = navigationRef.addListener("state", () => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    return unsubscribe;
  }, [navigationRef]);

  return null;
}