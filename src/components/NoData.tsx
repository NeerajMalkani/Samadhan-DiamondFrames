import { Box, Typography } from "@mui/material";

const NoData = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}>
      <Typography variant="h4">No Data</Typography>
    </Box>
  );
};

export default NoData;
