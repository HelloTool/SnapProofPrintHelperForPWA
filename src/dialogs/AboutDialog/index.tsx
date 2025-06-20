import type { ModalUnstyledOnClose } from '@suid/base/ModalUnstyled';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Typography,
} from '@suid/material';
import { For, type JSX } from 'solid-js';
import APP_ICON from '@/assets/images/icon.svg';
import { APP_EMAIL, APP_VERSION, URL_REPOSITORY } from '@/constants';

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
      content: 'Apache-2.0',
    },
    {
      label: '开源仓库：',
      content: <Link href={URL_REPOSITORY}>{URL_REPOSITORY}</Link>,
    },
    {
      label: '联系作者：',
      content: <Link href={`mailto:${APP_EMAIL}`}>{APP_EMAIL}</Link>,
    },
  ];
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        sx: {
          minWidth: 'min(calc(100% - 64px), 280px)',
        },
      }}
    >
      <DialogTitle
        component="div"
        sx={{
          userSelect: 'text',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'block',
              width: '48px',
              height: '48px',
            }}
            component="img"
            src={APP_ICON}
            alt="应用图标"
          />
          <Box
            sx={{
              marginLeft: 3,
            }}
          >
            <Typography variant="subtitle1">快照凭证打印助手</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              v{APP_VERSION}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          userSelect: 'text',
          overflowWrap: 'break-word',
        }}
      >
        <DialogContentText component="div">
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
