import React, { useState } from 'react'
import { RadioGroup, Box, Dropdown, AppBar, Steps, Toolbar, IconButton, MenuIcon, Typography, Button, Container, TextField } from '../'


const choices = [{ value: 'yes', label: "Yes"}, { value: 'no', label: "No, I prefer using other transport"}]
export default  (props: any) => {

    const [value, setVal] = useState('')
    const _handleOnChangeValue = (val: any) => {
        setVal(val)
    }
    const _onNextPressed = () => {
        props.onSubmit(0, value)
    }
    return (
       <Box sx = {{ marginTop: '2%' }}>
            <Typography variant = "h4">Welcome to our Customer Survey!</Typography>
            <Typography sx= {{ mt: 2, maxWidth: '50%' }} variant = "h5">Please not that this survey is intended for experienced drivers above the age of 18.</Typography>
            <Button sx = {{ mt: 4 }} onClick = {_onNextPressed} variant = "contained">Start Survey</Button>
       </Box>
    )
}