import type { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return <div className="max-w-container-max mx-auto px-gutter">{children}</div>;
}

