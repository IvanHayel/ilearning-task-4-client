import AdminPanelSettingsIcon                         from "@mui/icons-material/AdminPanelSettings";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import {observer}                                     from "mobx-react";
import React                                          from "react";
import {useNavigate}                                  from "react-router-dom";
import {SignInModal, SignOutButton, SignUpModal,}     from "../../Components/";
import {ROUTE_URL}                                    from "../../Constants";
import {isAuthenticated}                              from "../../Services";
import "./Styles/Header.scss";

export const Header = observer(() => {
  const navigate = useNavigate();
  const isCurrentUserAuthenticated = isAuthenticated();
  const handleBrandClick = () => navigate(ROUTE_URL.HOME);
  const handleAdminBoardClick = () => navigate(ROUTE_URL.ADMIN.BOARD);
  return (
      <AppBar position="sticky" className="header-bar"
              sx={{backgroundColor: 'mediumpurple'}}>
        <Toolbar>
          <Typography
              variant="h5"
              noWrap
              onClick={handleBrandClick}
              className="brand"
          >
            Task 4
          </Typography>
          <Box className="main-buttons">

          </Box>
          <Box className="sign-group">
            {isCurrentUserAuthenticated ? (
                <>
                  <IconButton
                      color="inherit"
                      size="medium"
                      onClick={handleAdminBoardClick}
                  >
                    <AdminPanelSettingsIcon fontSize="large" />
                  </IconButton>
                  <SignOutButton />
                </>
            ) : (
                <>
                  <SignInModal />
                  <SignUpModal />
                </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
  );
});
