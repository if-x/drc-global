import invariant from "ts-invariant";

export const grid = (size: number) => {
  const isSizeAllowed = size % 0.5 === 0;

  invariant(
    isSizeAllowed,
    "Error: value that can't be divided by 0.5 is not allowed."
  );

  return `${size * 10}px`;
};
