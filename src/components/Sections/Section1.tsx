import React, { useState, useEffect } from 'react'
import { Box, Dropdown, Typography, Button, TextField } from '../'
import t from '../../translation'
import { GENDERS } from '../../utils/constants'
import { ISectionProps } from '../../utils/types'



const Section = (props: ISectionProps) => {



    const [ageError, setAgeError] = useState('')
    const [genderError, setGenderError] = useState('No Gender')
    const [age, setAge] = useState(-1)

    useEffect(() => {
        if (age === -1)
            return
        if (!isAgeValid()) {
            setAgeError(t('ageError'))
        } else {
            setAgeError('')
        }
    }, [age])

    const _changeAge = (text: any) => {
        setAge(text.target.value)

    }

    const isAgeValid = () => {
        return (age >= 0) && (age <= 100)
    }

    const _handleGenderChange = (gender: any) => {
        if (!gender)
            setGenderError(t('genderRequired'))
        else setGenderError('')
    }

    const _onNextPressed = () => {
        props.onSubmit(1, age)
    }

    return (
        <div>
            <Box sx={{ alignItems: 'center' }}>
                <Typography sx={{ display: 'flex' }} variant="h6">
                    {t('question1')}
                </Typography>
                <TextField
                    onChange={_changeAge}
                    InputProps={{
                        inputProps: { min: 0 }
                    }}
                    error={!!ageError}
                    helperText={ageError}
                    size="medium"
                    type="number" sx={{ mt: 2, width: 200 }} id="outlined-basic" label="Age" variant="outlined" />
            </Box>
            <Box sx={{ mt: 8, alignItems: 'center' }}>
                <Typography variant="h6">{t('question2')}</Typography>
                <Dropdown  handleChange={_handleGenderChange} defaultLabel={'Gender'} value='' items={GENDERS} />
            </Box>
            <Button onClick={_onNextPressed} disabled={!!ageError || age == -1 || !age || !!genderError} sx={{ mt: 8 }} variant="contained">{t('next')}</Button>
        </div>
    )
}

Section.defaultProps = {
    onSubmit: () => { }
}

export default Section