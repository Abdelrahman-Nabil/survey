import React from 'react'
import { Box, Typography, Button } from '..'
import t from '../../translation'
import { ISectionProps } from '../../utils/types'

const EndSection = (props: ISectionProps) => {

    return (
        <Box>
            <Typography variant="h4">{t('surveyEnded')}</Typography>
            <Typography sx={{ mt: 4 }} variant="h5">{props.endText}</Typography>
            <Button sx={{ height: 40, marginTop: 8 }} onClick={props.onConfirm} variant="contained">
                {t('done')}
            </Button>
        </Box>
    )
}


EndSection.defaultProps = {
    onSubmit: () => {},
    endText: '',
    onConfirm: () => {}
}
export default EndSection