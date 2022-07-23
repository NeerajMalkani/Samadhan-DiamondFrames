import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { ImageDataModel } from "../models/Model";

interface IProps {
  itemData: Array<ImageDataModel>;
  callback:Function
}

export default function TitlebarBelowImageList(props: IProps) {
  return (
    <ImageList sx={{ maxWidth: 896 }} cols={4} gap={12} rowHeight={170}>
      {props.itemData.map((item: ImageDataModel, index: number) => (
        <ImageListItem
          key={item.id}
          onClick={(e:any) => {
           props.callback(e.target.getAttribute("data-index"))
          }}
        >
          <img  data-index={index} src={`${item.url}?w=164&h=164&fit=crop&auto=format`} srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`} alt={item.title} loading="lazy" />
          <ImageListItemBar data-index={index} title={item.title} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
