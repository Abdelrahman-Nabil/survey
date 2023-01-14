import React, { useEffect, useState } from 'react'
import { RadioGroup, Box, Dropdown, Typography, Button, TextField } from '../'
import t from '../../translation'
import { DRIVETRAIN_CHOICES, EMISSION_CHOICES, CAR_MAKES, PATTERN_BMW_1, PATTERN_BMW_2 } from '../../utils/constants'
import { ISectionProps } from '../../utils/types'



export default (props: ISectionProps) => {

    const [driveTrain, setDrivetrainVal] = useState('')
    const [emissions, setEmissionsVal] = useState('')
    const [carsAmount, setCarsVal] = useState(0)
    const [carsAmountError, setCarsError] = useState('')
    const [carModels, setCarModels] = useState<any>({})
    const [carModelErrors, setCarModelErrors] = useState<any>({})
    const [carMakes, setCarMakes] = useState<any>({})
    const [carMakesErrors, setCarMakesErrors] = useState<any>({})

    const _handleOnChangeValueDrivetrain = (value: string) => {
        setDrivetrainVal(value)
    }

    const _handleOnChangeValueEmissions = (value: string) => {
        setEmissionsVal(value)
    }

    const _handleCarsAmountChange = (event: any) => {
        let val = event.target.value
        setCarsVal(val > 25 ? 25 : val)
        if (val < 0 || !val)
            setCarsError("Invalid amount")
        else setCarsError("")

        // remove unrendered fields from data
       Object.keys(carMakes).forEach((key) => {
        if(key >= val)
            delete carMakes[key]
            
       })
       setCarMakes(carMakes)

       Object.keys(carModels).forEach((key) => {
        if(key >= val)
            delete carModels[key]
       })
       setCarModels(carModels)
       console.log('carMake', carMakes, 'carModels', carModels)
    }

    const _onNextPressed = () => {
        props.onSubmit(5, { driveTrain, emissions, carsAmount, carModels, carMakes })
    }

    const _onPickMake = (val: string, index: number) => {
        setCarMakes({ ...carMakes, [index]: val })
        if (!val)
            setCarMakesErrors({ ...carMakesErrors, [index]: 'Make Required' })
        else setCarMakesErrors({ ...carMakesErrors, [index]: '' })
    }

    const _onChangeCarModel = (val: string = '', index: number) => {
        setCarModels({ ...carModels, [index]: val.trim().toLowerCase() })

        if (!val)
            setCarModelErrors({ ...carModelErrors, [index]: 'Model Required' })
        else setCarModelErrors({ ...carModelErrors, [index]: '' })

        if (carMakes[index] === 'BMW') {
            let invalidPattern = !PATTERN_BMW_1.test(val) && !PATTERN_BMW_2.test(val)

            if (invalidPattern) {
                setCarModelErrors({ ...carModelErrors, [index]: 'Invalid BMW model' })
            } else {
                setCarModelErrors({ ...carModelErrors, [index]: '' })

            }
        }
    }

    const _renderCarModels = () => {

        let questions = []
        for (let make = 0; make < carsAmount && make < 25; make++) {
            questions.push(
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mt: 4 }}>
                    <Dropdown  handleChange={(val: string) => _onPickMake(val, make)} defaultLabel={'Select Make'} value='' items={CAR_MAKES} />
                    <TextField
                        onChange={(event: any) => _onChangeCarModel(event.target.value, make)}
                        error={!!carModelErrors[make]}
                        helperText={carModelErrors[make]}
                        size="medium"
                        sx={{ mt: 2, width: 200 }} id="outlined-basic" label="Model" variant="outlined"
                    />
                </Box>
            )
        }
        return questions
    }

    const _hasModelError = () => {

        return !carsAmount ||
            Object.keys(carMakes).length < carsAmount ||
            Object.keys(carModels).length < carsAmount ||
            !!Object.values(carModelErrors).find((v: any) => v != '') ||
            !!Object.values(carMakesErrors).find((v: any) => v != '')


    }

    return (
        <Box sx={{ pb: '15%' }}>
            <RadioGroup title={t('question5')} choices={DRIVETRAIN_CHOICES} onChangeValue={_handleOnChangeValueDrivetrain} />
            <Box sx={{ mt: 4 }}>
                <RadioGroup title={t('question6')} choices={EMISSION_CHOICES} onChangeValue={_handleOnChangeValueEmissions} />
            </Box>


            <Typography sx={{ mt: 4 }} variant="h5">{t('question7')}</Typography>
            <TextField
                onChange={_handleCarsAmountChange}
                InputProps={{
                    inputProps: { min: 0, max: 20 }
                }}
                value={carsAmount}
                error={!!carsAmountError}
                helperText={carsAmountError}
                size="medium"
                type="number" sx={{ width: 200, mt: 2, display: 'flex' }} id="outlined-basic" label={t('numCars')} variant="standard"
            />
            <Box style={{ overflow: 'auto', maxHeight: 200 }}>
                {_renderCarModels()}
            </Box>

            <Button onClick={_onNextPressed} disabled={!driveTrain || !emissions || !!carsAmountError || _hasModelError()} sx={{ mt: 8 }} variant="contained">{t('next')}</Button>

        </Box>
    )
}