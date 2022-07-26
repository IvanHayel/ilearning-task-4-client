import {Box, Typography} from "@mui/material";
import {observer}        from "mobx-react";
import React             from "react";
import {useStore}        from "../../Hooks";
import "./Styles/Home.scss";

export const Home = observer(() => {
  const authenticationStore = useStore("authenticationStore");
  const isCurrentUserAuthenticated = authenticationStore.isAuthenticated();
  const currentUser = authenticationStore.getCurrentUser();
  return (
      <Box className="home">
        <Typography variant="h3" className="home-greeting">
          Welcome{isCurrentUserAuthenticated && (`, ${currentUser.username}`)}!
        </Typography>
      </Box>
  );
});
