import React from 'react'
import { Box, Dropdown, AppBar, Steps, Toolbar, IconButton, MenuIcon, Typography, Button, Container, TextField } from '..'



export default  (props: any) => {

    return (
       <Box>
        <Typography variant="h4">Survey has ended</Typography>
        <Typography sx = {{ mt: 4 }} variant="h5">{props.endText}</Typography>
        <Button sx = {{ height: 40, marginTop: 8}} onClick={props.onConfirm} variant="contained">Done</Button>

       </Box>
    )
}