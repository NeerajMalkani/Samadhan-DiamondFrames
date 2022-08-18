import { Box, Button, Typography } from "@mui/material";

interface Props {
  Icon: any;
  text: string;
  secondaryText?: string;
  height?: string;
  isButton: boolean;
  buttonText?: string;
  buttonOnClick?: any;
}
const NoData = ({ Icon, text, secondaryText, height, isButton, buttonText, buttonOnClick }: Props) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" height={height ? height : "80vh"} sx={{ marginTop: 10 }}>
      {Icon}
      <Typography variant="h5">{text}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
        {secondaryText}
      </Typography>
      {isButton ? (
        <Button variant="contained" onClick={buttonOnClick} sx={{ marginTop: 2 }}>
          {buttonText}
        </Button>
      ) : null}
    </Box>
  );
};

export default NoData;
