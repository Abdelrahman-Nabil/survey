import React from 'react'
import { Box, Typography, Button } from '../'
import t from '../../translation'
import { ISectionProps } from '../../utils/types'


export default (props: ISectionProps) => {

    const _onNextPressed = () => {
        props.onSubmit(0)
    }

    return (
        <Box sx={{ marginTop: 4 }}>
            <Typography sx = {{ minWidth: 300 }} variant="h5">{t('welcome')}</Typography>
            <Typography sx={{ mt: 2, minWidth: 100}} variant="body1">{t('welcomeHead')}</Typography>
            <Button sx={{ mt: 4 }} onClick={_onNextPressed} variant="contained">{t('start')}</Button>
        </Box>
    )
}