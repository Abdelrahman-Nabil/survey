import React, { useState } from 'react'
import { RadioGroup, Box, Button } from '../'
import t from '../../translation'
import { YES_NO_CHOICES } from '../../utils/constants'
import { ISectionProps } from '../../utils/types'


export default (props: ISectionProps) => {

    const [value, setVal] = useState('')
    const _handleOnChangeValue = (value: string) => {
        setVal(value)
    }
    const _onNextPressed = () => {
        props.onSubmit(4, value)
    }
    return (
        <Box>
            <RadioGroup title={t('question4')} choices={YES_NO_CHOICES} onChangeValue={_handleOnChangeValue} />
            <Button onClick={_onNextPressed} disabled={!value} sx={{ mt: 8 }} variant="contained">{t('next')}</Button>
        </Box>
    )
}