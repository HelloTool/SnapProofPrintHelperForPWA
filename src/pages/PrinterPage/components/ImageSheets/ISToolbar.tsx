import AddIcon from '@suid/icons-material/Add';
import ClearAllOutlinedIcon from '@suid/icons-material/ClearAllOutlined';
import { Toolbar } from '@suid/material';
import { ToolbarIconButton } from '@/components/toolbar/ToolbarIconButton';
import ToolbarTitle from '@/components/toolbar/ToolbarTitle';

interface ToolbarProps {
  imagesCount: number;
  onAddImageClick: () => void;
  onClearImagesClick: () => void;
}
export default function ISToolbar(props: ToolbarProps) {
  return (
    <Toolbar>
      <ToolbarTitle>图片（{props.imagesCount} 张）</ToolbarTitle>
      <ToolbarIconButton
        disabled={props.imagesCount === 0}
        icon={<ClearAllOutlinedIcon />}
        label={'移除所有图片'}
        onClick={props.onClearImagesClick}
      />
      <ToolbarIconButton edge="end" icon={<AddIcon />} label={'添加图片'} onClick={props.onAddImageClick} />
    </Toolbar>
  );
}
