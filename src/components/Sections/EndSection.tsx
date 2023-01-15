import React from 'react'
import { Box, Typography, Button } from '..'
import t from '../../translation'
import { ISectionProps } from '../../utils/types'

const EndSection = (props: ISectionProps) => {

    return (
        <Box>
            <Typography variant="h5">{t('surveyEnded')}</Typography>
            <Typography sx={{ mt: 4 }} variant="body1">{props.endText}</Typography>
            <Button sx={{ mt: 4 }} onClick={props.onConfirm} variant="contained">
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