import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const MaterialSetup = () => {
  function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const handleChange = () => {};

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 960 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                  <FormLabel component="legend">Assign responsibility</FormLabel>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox checked={true} onChange={handleChange} name="gilad" />} label="Gilad Gray" />
                    <FormControlLabel control={<Checkbox checked={false} onChange={handleChange} name="jason" />} label="Jason Killian" />
                    <FormControlLabel control={<Checkbox checked={false} onChange={handleChange} name="antoine" />} label="Antoine Llorca" />
                  </FormGroup>
                  <FormHelperText>Be careful</FormHelperText>
                </FormControl>
              </TableCell>
              <TableCell align="right">
                <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="HSN / SAC Code"
                    variant="outlined"
                    size="small"
                    //value={hsn}
                    onChange={(e) => {
                      //  setHsn(e.currentTarget.value);
                    }}
                  />
                </Grid>
              </TableCell>
              <TableCell align="right">
                <Grid item xs={4} sm={4} md={4} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small" error={false}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Category Name</b>
                      <label style={{ color: "#ff0000" }}>*</label>
                    </Typography>
                    <Select value="" onChange={() => {}}>
                      <MenuItem disabled={true} value="--Select--">
                        --Select--
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">
                {" "}
                <LoadingButton loading={false} variant="contained" sx={{ mt: 1 }} onClick={() => {}}>
                  Submit
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialSetup;
