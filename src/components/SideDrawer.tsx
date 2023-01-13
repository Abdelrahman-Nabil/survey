import React from 'react'
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home'
import PieChart from '@mui/icons-material/PieChart'
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default () => {
    const navigate = useNavigate();

    return (
        <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem onClick={() => navigate('/statistics')} key={0} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PieChart />
                  
                </ListItemIcon>
                <ListItemText primary={'Staff Statistics'} />
              </ListItemButton>
            </ListItem>
          </List>

        </Box>
      </Drawer>

    )
}