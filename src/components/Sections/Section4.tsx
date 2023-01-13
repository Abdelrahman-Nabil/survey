import React, { useState } from 'react'
import { RadioGroup, Box, Dropdown, AppBar, Steps, Toolbar, IconButton, MenuIcon, Typography, Button, Container, TextField } from '../'
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const choices = [{ value: 'yes', label: "Yes"}, { value: 'no', label: "No"}]

export default  (props: any) => {

    const [value, setVal] = useState('')
    const _handleOnChangeValue = (value: string) => {
        setVal(value)
    }
    const _onNextPressed = () => {
        props.onSubmit(3, value)
    }
    return (
       <Box>
            <RadioGroup title = "Is this your first car?" choices = {choices} onChangeValue = {_handleOnChangeValue} />
            <Button onClick={_onNextPressed} disabled={!value} sx={{ mt: 8 }} variant="contained">Next</Button>

       </Box>
    )
}