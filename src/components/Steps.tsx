import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { IStepperProps } from '../utils/types';

const steps = ['Personal Information', 'License', 'General', 'Finish'];

const HorizontalLinearStepper = (props: IStepperProps) => {

  let { activeStep } = props
  return (
    <Box sx={{ marginLeft: -4, marginTop: '4%', width: '35%', minWidth: 300, marginBottom: '3%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
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

HorizontalLinearStepper.defaultProps = {
  activeStep: 0
}

export default HorizontalLinearStepper