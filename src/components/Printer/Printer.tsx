import { GlobalStyles } from '@mui/material';
import { createPortal } from 'react-dom';

interface PrinterProps {
  children: React.ReactNode;
  size?: string;
  marginLeft?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
}
export default function Printer({
  children,
  size = 'A4 landscape',
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
}: PrinterProps) {
  return (
    <>
      <GlobalStyles
        styles={{
          '@page': {
            size: size,
            margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
          },
          'body > .printer': {
            display: 'none',
          },
          '@media print': {
            'body > *:not(.printer)': {
              display: 'none',
            },
            'body > .printer': {
              display: 'block',
            },
          },
        }}
      />
      {createPortal(<div className="printer">{children}</div>, document.body)}
    </>
  );
}
