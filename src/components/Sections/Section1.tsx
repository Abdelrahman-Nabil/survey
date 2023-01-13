import React, { useState, useEffect } from 'react'
import { Box, Dropdown, AppBar, Steps, Toolbar, IconButton, MenuIcon, Typography, Button, Container, TextField } from '../'



const genders = [{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'}, {value: 'Other', label: 'Other'}]

const Section = (props: any) => {

    
    
    const [ageError, setAgeError] = useState('')
    const [genderError, setGenderError] = useState('No Gender')
    const [age, setAge] = useState(-1)
    console.log('props', props.onSubmit)
    useEffect(() => {
        if(age === -1)
            return
        if(!isAgeValid()){
            setAgeError('Age must be between 0 and 100')
        } else {
            setAgeError('')
        }
    }, [age])
    const _changeAge = (text: any) => {
        setAge(text.target.value)
        
    }
    const isAgeValid = () => {
        console.log('age', age)
        return (age >= 0) && (age <= 100)
    }
    const _handleGenderChange = (gender: any) => {
        console.log('gender', gender)
        if (!gender)
            setGenderError('Gender is required')
        else setGenderError('')
    }
    const _onNextPressed = () => {
       props.onSubmit(1, age)
    }
    return (
        <div>
            <Box sx={{ alignItems: 'center' }}>
                <Typography sx={{ display: 'flex' }} variant="h6">
                    What is your age ?
                </Typography>
                <TextField
                    onChange={_changeAge}
                    InputProps={{
                        inputProps: { min: 0 }
                    }}
                    error={!!ageError}
                    helperText={ageError}
                    size="medium"
                    type="number" sx={{  mt: 2, width: '20%' }} id="outlined-basic" label="Age" variant="outlined" />
            </Box>
            <Box sx={{  mt: 8, alignItems: 'center' }}>
                <Typography  variant="h6">Select your gender:</Typography>
                <Dropdown error={!!genderError} helperText={genderError} handleChange={_handleGenderChange} defaultLabel={'Gender'} value='' items={genders} />
            </Box>
            <Button onClick={_onNextPressed} disabled={!!ageError || age == -1 || !age || !!genderError} sx={{ mt: 8 }} variant="contained">Next</Button>
        </div>
    )
}

Section.defaultProps = {
  onSubmit: () => {}
}

export default Section