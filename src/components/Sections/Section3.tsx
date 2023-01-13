import React, { useState } from 'react'
import { RadioGroup, Box, Button } from '../'
import t from '../../translation'
import { TRANSPORT_CHOICES } from '../../utils/constants'
import { ISectionProps } from '../../utils/types'


export default  (props: ISectionProps) => {

    const [value, setVal] = useState('')
    const _handleOnChangeValue = (val: any) => {
        setVal(val)
    }
    const _onNextPressed = () => {
        props.onSubmit(3, value)
    }
    return (
       <Box>
            <RadioGroup title = {t('question3')} choices = {TRANSPORT_CHOICES} onChangeValue = {_handleOnChangeValue} />
            <Button onClick={_onNextPressed} disabled={!value} sx={{ mt: 8 }} variant="contained">{t('next')}</Button>

       </Box>
    )
}