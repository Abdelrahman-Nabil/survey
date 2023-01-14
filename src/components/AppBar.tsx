import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PieChart from '@mui/icons-material/PieChart'
import { useNavigate } from 'react-router-dom';


export default function ClippedDrawer(props: any) {

  return (
    <div role = 'sideDrawer'>
      <CssBaseline />
      <Box>
        <List>
          <ListItem onClick={props.onNavigate} key={0} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PieChart />

              </ListItemIcon>
              <ListItemText primary={'Staff Statistics'} />
            </ListItemButton>
          </ListItem>
        </List>

      </Box>

    </div>
  );
}