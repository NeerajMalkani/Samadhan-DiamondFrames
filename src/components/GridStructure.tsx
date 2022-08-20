import { CreateImageGalleryEstimation } from "../components/Cards";
import { Box, Grid, Grow } from "@mui/material";
import NoData from "../components/NoData";
import ListIcon from "@mui/icons-material/List";
import { ButtonSettings, ImageGalleryEstimation } from "../models/Model";

interface Props {
  shows: ImageGalleryEstimation[];
  buttonSettings: ButtonSettings;
  cardCallback: Function;
  type: string;
}

const ShowsGrid = ({ shows, buttonSettings, cardCallback, type }: Props) => {
  return (
    <Box mt={3} mb={3}>
      {shows.length > 0 ? (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {shows.map((k, i) => {
            return (
              <Grow key={i} in={true} style={{ transformOrigin: "0 0 0" }}>
                <Grid item xs={2} sm={4} md={3}>
                  <CreateImageGalleryEstimation key={i} count={i} props={k} buttonSettings={buttonSettings} cardCallback={cardCallback} type={type} />
                </Grid>
              </Grow>
            );
          })}
        </Grid>
      ) : (
        <NoData Icon={<ListIcon sx={{ fontSize: 72, color: "red" }} />} height="auto" text="No data found" secondaryText="" isButton={false} />
      )}
    </Box>
  );
};

export default ShowsGrid;
