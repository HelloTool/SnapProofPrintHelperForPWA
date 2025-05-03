import { GlobalStyles } from '@mui/material';
import { createPortal } from 'react-dom';

interface PrintProps {
  children: React.ReactNode;
  page?: {
    size?: string;
    marginLeft?: string;
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
  };
}
export default function Print({
  children,
  page: { size = 'A4 landscape', marginLeft, marginTop, marginRight, marginBottom } = {},
}: PrintProps) {
  return (
    <>
      <GlobalStyles
        styles={{
          '@page': {
            size: size,
            margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
          },
          'body > .print': {
            display: 'none',
          },
          '@media print': {
            'body > *:not(.print)': {
              display: 'none',
            },
            'body > .print': {
              display: 'block',
            },
          },
        }}
      />
      {createPortal(<div className="print">{children}</div>, document.body)}
    </>
  );
}
