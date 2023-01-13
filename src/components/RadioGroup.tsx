import React, { useState } from 'react'
import { Box, Dropdown, AppBar, Steps, Toolbar, IconButton, MenuIcon, Typography, Button, Container, TextField } from './'
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { RadioGroup as Radios, Radio } from '@mui/material'


const RadioGroup = (props: any) => {

    const _handleOnChangeValue = (event: any) => {
        props.onChangeValue(event.target.value)
    }
    let { choices } = props
    return (
       <Box>
            <Typography variant="h5">{props.title}</Typography>
            <FormControl>
            <Radios
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                onChange={_handleOnChangeValue}
                name="radio-buttons-group"
                sx = {{ mt: 2 }}
            >
                
                {choices.map((choice: any) => (
                    <FormControlLabel value={choice.value} control={<Radio />} label={choice.label} />
                ))}
            </Radios>
            </FormControl>

       </Box>
    )
}

RadioGroup.defaultProps = {
    onChangeValue: () => {},
    choices: []
}
export default RadioGroup