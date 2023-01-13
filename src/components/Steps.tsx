import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Personal Information', 'License', 'General', 'Finish'];

export default function HorizontalLinearStepper(props: any) {

  let { activeStep } = props
  return (
    <Box sx={{  marginLeft: '-2%', marginTop: '4%', width: '40%', marginBottom: '6%' }}>
      <Stepper sx = {{ }} activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          return (
            <Step key={label} >
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      
    </Box>
  );
}