import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../theme/Styles.css";
import { CreateGeneralCards, CreateTotalUserCards } from "../components/Cards";
import { useCookies } from "react-cookie";
import Provider from "../api/Provider";
import { RoleDetails } from "../models/Model";
import { LoadingButton } from "@mui/lab";

const HomePage = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [role, setRole] = useState("--Select--");
  const [roleID, setRoleID] = useState<number>(0);
  const [roleError, setRoleError] = useState<boolean>(false);
  const [roleErrorText, setRoleErrorText] = useState<string>("");

  const [userName, setUserName] = useState("");
  const [userCountData, setUserCountData] = useState<RoleDetails[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [roleName, setRoleName] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [CookieRoleID, SetCookieRoleID] = useState(0);

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/Samadhan-DiamondFrames/login`);
    else SetCookieRoleID(cookies.dfc.RoleID);
  }, []);

  const images = [
    { url: "images/1.jpg" },
    { url: "images/2.jpg" },
    { url: "images/3.jpg" },
    { url: "images/4.jpg" },
    { url: "images/5.jpg" },
    { url: "images/6.jpg" },
    { url: "images/7.jpg" },
  ];

  useEffect(() => {
    GetUserCount();
  }, []);

  const GetUserCount = () => {
    Provider.getAll("registration/getusers")
      .then((response: any) => {
        if (response.data && response.data.code === 200) {
          // var res = response.data.data.map(el:any => el.roleCount);

          // setTotalUsers(
          //   response.data.data[0].generalUsers +
          //     response.data.data[0].dealers +
          //     response.data.data[0].contractors +
          //     response.data.data[0].architects
          // );
          setUserCountData(response.data.data);
        }
        //  setIsLoading(false);
      })
      .catch((e) => {
        debugger;
        // setIsLoading(false);
      });
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    let roleName: string = event.target.value;
    debugger;
    let ac = userCountData.find(
      (el) => el.roleName.toLowerCase() === roleName.toLowerCase()
    );
    if (ac !== undefined) {
      setRole(roleName);
      setRoleID(ac?.id);
      setRoleError(false);
      setRoleErrorText("");
    }
  };

  const SwitchUserClick = () => {
    if (role === "" || roleID === 0) {
      setRoleError(true);
      setRoleErrorText("Error");
    } else {
      //ajax
      setButtonLoading(true);
    }
  };

  return (
    <Box height="100vh" sx={{ mt: 7 }}>
      <Header />
      <Container sx={{ padding: { xs: 2, md: 4 } }} maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {CookieRoleID !== 1 ? (
            <Grid item xs={4} sm={4} md={6} sx={{ mt: 1 }}>
              <FormControl fullWidth size="small" error={roleError}>
                <Typography sx={{ mb: 1 }}>Switch Role</Typography>
                <Select value={role} onChange={handleRoleChange}>
                  <MenuItem disabled={true} value="--Select--">
                    --Select--
                  </MenuItem>
                  {userCountData.map((item, index) => {
                    return (
                      <MenuItem key={item.id} value={item.roleName}>
                        {item.roleName}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>{roleErrorText}</FormHelperText>
              </FormControl>
              <Grid>
                <LoadingButton
                  loading={buttonLoading}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  //style={{ marginTop: 24 }}
                  onClick={SwitchUserClick}
                >
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          ) : null}
          <Grid item xs={4} sm={8} md={12} sx={{ mt: 2 }}>
            <Grid item xs={4} sm={8} md={12}>
              <Typography variant="h5">Total Users ({totalUsers})</Typography>
            </Grid>
            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {userCountData.map((item, index) => {
                return CreateTotalUserCards(
                  userCountData[index].roleName,
                  userCountData[index].roleCount,
                  null,
                  "#f4efff",
                  "theme.palette.primary"
                );
              })}
            </Grid>
          </Grid>

          <Grid></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
