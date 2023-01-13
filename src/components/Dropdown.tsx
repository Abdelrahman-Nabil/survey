import React, {useState} from 'react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const Dropdown =  (props: any) => {

    const [val, setVal] = useState(props.value)
    const handleChange = (choice: any) => {
        console.log(choice.target.value)
        setVal(choice.target.value)
        props.handleChange(choice.target.value)
    }
    return (
        <FormControl variant="standard" sx={{  width: '50%' }}>
        <InputLabel id="demo-simple-select-standard-label">{props.defaultLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={val}
          onChange={handleChange}
          label={props.defaultLabel}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.items.map((item: any) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
           
          ))}
        </Select>
      </FormControl>
    )
}

Dropdown.defaultProps = {
    handleChange: () => {},
    label: 'Select One'
}
export default Dropdown