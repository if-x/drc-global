import * as React from "react";
import { useInView } from "react-intersection-observer";

interface ImageProps extends React.HTMLProps<HTMLImageElement> {
  alt: string;
  fallbackSrc?: string;
  turnOffLazyLoading?: boolean;
}

const BASE64_ONE_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

const Image: React.FC<ImageProps> = ({
  src,
  fallbackSrc,
  onError,
  turnOffLazyLoading,
  alt,
  ...otherProps
}) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
    rootMargin: "200px",
  });

  return (
    // @ts-ignore crossOrigin is fancy new attributes
    <img
      ref={!turnOffLazyLoading ? ref : undefined}
      src={inView || turnOffLazyLoading ? src : BASE64_ONE_PIXEL}
      onError={(e) => {
        e.currentTarget.src = fallbackSrc || BASE64_ONE_PIXEL;
        if (onError) {
          onError(e);
        }
      }}
      alt={alt}
      {...otherProps}
    />
  );
};

export default Image;
