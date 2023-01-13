import React, { useState } from 'react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IDropdownProps } from '../utils/types';


const Dropdown = (props: IDropdownProps) => {

  const [val, setVal] = useState(props.value)
  const handleChange = (choice: any) => {
    setVal(choice.target.value)
    props.handleChange(choice.target.value)
  }
  return (
    <FormControl variant="outlined" sx={{ mt: 2, width: '20%' }}>
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
  handleChange: () => { },
  defaultLabel: '',
  label: 'Select One',
  value: ''
}
export default Dropdown