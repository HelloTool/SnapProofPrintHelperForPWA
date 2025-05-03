import ToolbarTitle from '@/components/toolbar/ToolbarTitle';
import { Toolbar as MuiToolbar } from '@mui/material';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import AddIcon from '@mui/icons-material/Add';
import { ToolbarIconButton } from '@/components/toolbar/ToolbarIconButton';

interface ToolbarProps {
  imagesCount: number;
  onAddImageClick: () => void;
  onClearImagesClick: () => void;
}
export default function Toolbar({ imagesCount, onAddImageClick, onClearImagesClick }: ToolbarProps) {
  return (
    <MuiToolbar>
      <ToolbarTitle>图片（{imagesCount} 张）</ToolbarTitle>
      <ToolbarIconButton
        icon={<ClearAllOutlinedIcon />}
        label={'移除所有图片'}
        onClick={onClearImagesClick}
        disabled={imagesCount === 0}
      />
      <ToolbarIconButton
        icon={<AddIcon />}
        label={'添加图片'}
        onClick={onAddImageClick}
        disabled={imagesCount === 0}
        edge="end"
      />
    </MuiToolbar>
  );
}
