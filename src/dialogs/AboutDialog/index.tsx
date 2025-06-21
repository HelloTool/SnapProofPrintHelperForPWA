import type { ModalUnstyledOnClose } from '@suid/base/ModalUnstyled';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Link } from '@suid/material';
import { For, type JSX } from 'solid-js';
import APP_ICON from '@/assets/images/icon.svg';
import { APP_EMAIL, APP_VERSION, URL_APP_LICENSE, URL_REPOSITORY } from '@/constants';
import AboutHeader from './AboutHeader';

interface AboutInformation {
  label: string;
  content: JSX.Element;
}

interface AboutDialogProps {
  open: boolean;
  onClose?: ModalUnstyledOnClose<'backdropClick' | 'escapeKeyDown' | 'buttonClick'>;
}
export default function AboutDialog(props: AboutDialogProps) {
  const infos: AboutInformation[] = [
    {
      label: '开源许可：',
      content: (
        <Link href={URL_APP_LICENSE} target="_blank">
          Apache 2.0
        </Link>
      ),
    },
    {
      label: '开源仓库：',
      content: (
        <Link href={URL_REPOSITORY} target="_blank">
          {URL_REPOSITORY}
        </Link>
      ),
    },
    {
      label: '联系作者：',
      content: (
        <Link href={`mailto:${APP_EMAIL}`} target="_blank">
          {APP_EMAIL}
        </Link>
      ),
    },
  ];
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogContent
        sx={{
          userSelect: 'text',
          overflowWrap: 'break-word',
        }}
      >
        <AboutHeader icon={APP_ICON} name="快照凭证打印助手" version={APP_VERSION} />
        <DialogContentText
          component="div"
          sx={{
            marginTop: 1,
            marginLeft: 7,
          }}
        >
          <Box component="p">将多个转账记录图、电商订单图等以凭证样式打印到纸中。</Box>
          <Box
            component="p"
            sx={{
              marginTop: 1,
            }}
          >
            <For each={infos}>
              {(info) => (
                <Box>
                  {info.label}
                  {info.content}
                </Box>
              )}
            </For>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button>法律信息…</Button> */}
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={() => props.onClose?.({}, 'buttonClick')}>确定</Button>
      </DialogActions>
    </Dialog>
  );
}
