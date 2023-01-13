import React from 'react'
import { Box, Typography } from './'
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { RadioGroup as Radios, Radio } from '@mui/material'
import { IRadioGroup } from '../utils/types';


const RadioGroup = (props: IRadioGroup) => {

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
                    sx={{ mt: 2 }}
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
    onChangeValue: () => { },
    choices: []
}
export default RadioGroup