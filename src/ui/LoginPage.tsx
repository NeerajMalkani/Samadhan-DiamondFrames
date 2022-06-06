import { Box, Button, Paper, Typography } from "@mui/material";
import "../theme/Styles.css";

const LoginPage = () => {
  const loginClick = () => {};
  return (
    <Box  height="80vh" className="flex-center" sx={{ marginTop: 10 }}>
      <Paper elevation={3} style={{ padding: 32, minWidth: 256 }}>
        <Typography variant="h5" textAlign="center">
          Login
        </Typography>

        <Button type="submit" variant="contained" fullWidth={true} sx={{ marginTop: 3 }} onClick={loginClick}>
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
