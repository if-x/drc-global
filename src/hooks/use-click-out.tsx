import * as React from "react";

interface ClickOutHookInput {
  ref: React.RefObject<HTMLInputElement | HTMLDivElement>;
  callback?: (node: HTMLInputElement | HTMLDivElement) => void;
}

export const useClickOut = ({ ref, callback }: ClickOutHookInput) => {
  const handleClickOut = (e: Event, node: HTMLDivElement | null) => {
    if (!!callback && node && !node.contains(e.target as Node)) {
      callback(node);
    }
  };

  // Dismiss mobile keyboard on scrolling, so user could see all the content
  React.useEffect(() => {
    const clickOutListener = (e: Event) => handleClickOut(e, ref.current);

    document.addEventListener("touchstart", clickOutListener);
    document.addEventListener("mousedown", clickOutListener);

    return () => {
      document.removeEventListener("touchstart", clickOutListener);
      document.removeEventListener("mousedown", clickOutListener);
    };
  }, [ref, callback]);
};
