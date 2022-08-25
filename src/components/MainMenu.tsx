import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  IconButton,
  Typography,
  Button,
  Toolbar,
} from "@mui/material";

const MainMenu = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/info")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/list")}>
            Candidates
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainMenu;
