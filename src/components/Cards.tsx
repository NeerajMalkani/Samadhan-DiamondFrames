import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { ActionButtons, ButtonSettings, ImageGalleryEstimation } from "../models/Model";
export const CreateGeneralCards = (title: string, icon: any) => {
  const [shadow, setShadow] = useState(1);
  const onMouseOver = () => setShadow(4);
  const onMouseOut = () => setShadow(1);
  return (
    <Grid item xs={2} sm={4} md={3}>
      <Paper elevation={shadow} className="flex-column flex-center padding-16 cur-pointer" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <div className="flex-center" style={{ width: "64px", height: "64px", borderRadius: "50%" }}>
          {icon}
        </div>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {title}
        </Typography>
      </Paper>
    </Grid>
  );
};

export const CreateTotalUserCards = (title: string, value: number, icon: any, bgColor: string, color: string) => {
  return (
    <Grid item xs={2} sm={4} md={3}>
      <Paper className="flex-column flex-center padding-16">
        {/* <div className="flex-center" style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: bgColor === null ? "#f2f2f2" : bgColor }}>
            {icon}
          </div> */}
        <Typography variant="h4" sx={{ mt: 2, color: { color } }}>
          {value}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {title}
        </Typography>
      </Paper>
    </Grid>
  );
};

interface Props {
  props: ImageGalleryEstimation;
  buttonSettings: ButtonSettings;
  cardCallback:Function;
}
export const CreateImageGalleryEstimation = ({ props, buttonSettings, cardCallback }: Props) => {
  const [shadow, setShadow] = useState(1);
  const onMouseOver = () => setShadow(20);
  const onMouseOut = () => setShadow(1);

  return (
    <Card elevation={shadow} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <CardActionArea
        onClick={(e) => {
          console.log(e);
          cardCallback(props.imageName);
        }}
      >
        <CardMedia
          component="img"
          image={props.imageName}
          alt={props.categoryName}
          data-id={props.id}
          // onClick={(event: React.MouseEvent) => {
          //   event.preventDefault();
          // }}
        />

        <CardContent
          data-id={props.id}
          // onClick={(event) => {
          //   event.preventDefault();
          // }}
        >
          <Typography variant="h6" color="text.primary" noWrap={true}>
            {props.categoryName}
          </Typography>
          <Typography variant="h6" color="text.secondary" noWrap={true}>
            {props.productName}
          </Typography>
        </CardContent>
      </CardActionArea>
      {buttonSettings.actionButtons ? (
        <CardActions disableSpacing sx={{ flex: 1, display: "flex", position: "relative" }}>
          {buttonSettings.actionButtons.map((value: ActionButtons, index: number) => {
            return (
              <Button
                variant={value.type}
                sx={{ marginTop: 2 }}
                onClick={() => {
                  value.callBack();
                }}
              >
                {value.title}
              </Button>
            );
          })}
          {/* <Button variant="contained" sx={{ marginTop: 2 }}>
          fsfzfd
        </Button> */}
        </CardActions>
      ) : (
        <></>
      )}
    </Card>
  );
};
