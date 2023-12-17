import React from "react";
import { Box, AppBar, Toolbar, IconButton} from "@mui/material";
import { faUser, faHome, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavSearchBar from "./NavSearchBar";
import { useNavigate } from "react-router-dom";
import './Navbar.css'


function Navbar() {
  const navigate = useNavigate()
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Box className='navbar'>
            <NavSearchBar/>
          <Toolbar sx={{ justifyContent: 'flex-end' }}>
            <IconButton onClick={() => {navigate(`/account`)}}>
              <FontAwesomeIcon icon={faUser} />
            </IconButton>
            <IconButton onClick={() => {navigate(`/`)}}>
              <FontAwesomeIcon icon={faHome} />
            </IconButton>
            <IconButton onClick={() => {navigate(`/cart`)}}>
              <FontAwesomeIcon icon={faCartShopping} />
            </IconButton>
          </Toolbar>
          </Box>
        </AppBar>
      </Box>
      )
}

export default Navbar