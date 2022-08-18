import { CreateImageGalleryEstimation } from "../components/Cards";
import { Box, Grid, Grow } from "@mui/material";
import NoData from "../components/NoData";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { ButtonSettings, ImageGalleryEstimation } from "../models/Model";

interface Props {
  shows: ImageGalleryEstimation[];
  buttonSettings: ButtonSettings;
  cardCallback:Function;
}

const ShowsGrid = ({ shows, buttonSettings, cardCallback }: Props) => {
  return (
    <Box mt={3} mb={3}>
      {shows.length > 0 ? (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {shows.map((k, i) => {
            return (
              <Grow key={i} in={true} style={{ transformOrigin: "0 0 0" }}>
                <Grid item xs={2} sm={4} md={3}>
                  <CreateImageGalleryEstimation props={k} buttonSettings={buttonSettings} cardCallback={cardCallback}/>
                </Grid>
              </Grow>
            );
          })}
        </Grid>
      ) : (
        <NoData
          Icon={<SearchOffIcon sx={{ fontSize: 72, color: "red" }} />}
          height="auto"
          text="No search results"
          secondaryText="Write appropriate word . Check for typos . Be more specific"
          isButton={false}
        />
      )}
    </Box>
  );
};

export default ShowsGrid;
