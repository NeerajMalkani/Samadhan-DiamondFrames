import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { ImageDataModel } from "../models/Model";

interface IProps {
  itemData: Array<ImageDataModel>;
}

export default function TitlebarBelowImageList(props: IProps) {
  return (
    <ImageList sx={{ maxWidth: 896 }} cols={5} gap={12} rowHeight={170}>
      {props.itemData.map((item: ImageDataModel) => (
        <ImageListItem key={item.id}>
          <img src={`${item.url}?w=164&h=164&fit=crop&auto=format`} srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`} alt={item.title} loading="lazy" />
          <ImageListItemBar
            title={item.title}
          />
        </ImageListItem>
      ))}
      
    </ImageList>
  );
}
