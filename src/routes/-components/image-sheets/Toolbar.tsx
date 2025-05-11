import { ToolbarIconButton } from '@/components/toolbar/ToolbarIconButton';
import ToolbarTitle from '@/components/toolbar/ToolbarTitle';
import AddIcon from '@mui/icons-material/Add';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import { Toolbar as MuiToolbar } from '@mui/material';

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
      <ToolbarIconButton icon={<AddIcon />} label={'添加图片'} onClick={onAddImageClick} edge="end" />
    </MuiToolbar>
  );
}
