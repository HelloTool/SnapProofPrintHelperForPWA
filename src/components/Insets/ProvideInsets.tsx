import { InsetsContext, useInsets } from './InsetsContext';

interface ProvideInsetsProps {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  children: React.ReactNode;
}
export default function ProvideInsets({ left, top, right, bottom, children }: ProvideInsetsProps) {
  const insets = useInsets();
  return (
    <InsetsContext
      value={{
        left: left ?? insets.left,
        top: top ?? insets.top,
        right: right ?? insets.right,
        bottom: bottom ?? insets.bottom,
      }}
    >
      {children}
    </InsetsContext>
  );
}
