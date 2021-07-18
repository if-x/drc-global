export const copyToClipboard = (str: string) => {
  if (typeof window !== undefined) {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.width = "0";
    el.style.height = "0";
    el.style.overflow = "hidden";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
};
