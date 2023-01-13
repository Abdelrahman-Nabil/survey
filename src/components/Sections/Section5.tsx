import React, { useEffect, useState } from 'react'
import { RadioGroup, Box, Dropdown, AppBar, Steps, Toolbar, IconButton, MenuIcon, Typography, Button, Container, TextField } from '../'

const choices = [{ value: 'FWD', label: "FWD" }, { value: 'RWD', label: "RWD" }, { value: 'IDK', label: "I don't know" }]
const EMISSION_CHOICES = [{ value: 'yes', label: "Yes" }, { value: 'no', label: "No" }]
const CAR_MAKES = [{ value: 'BMW', label: 'BMW' }, { value: 'mercedes', label: 'Mercedes' }, { value: 'toyota', label: 'Toyota' }, { value: 'cadillac', label: 'Cadillac' }]
let pattern1Regex = /^m*[0-9]{3}[d|i]*$/i
let pattern2Regex = /^[x|z]+[0-9]{1}$/i

export default (props: any) => {

    const [driveTrain, setDrivetrainVal] = useState('')
    const [emissions, setEmissionsVal] = useState('')
    const [carsAmount, setCarsVal] = useState(0)
    const [carsAmountError, setCarsError] = useState('')
    const [carModels, setCarModels] = useState<any>({})
    const [carModelErrors, setCarModelErrors] = useState<any>({})
    const [carMakes, setCarMakes] = useState<any>({})
    const [carMakesErrors, setCarMakesErrors] = useState<any>({})

    useEffect(() => {
        console.log('data: ', carMakes, carMakesErrors, carModels, carModelErrors)

    }, [carMakes, carModels])
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
    }
    const _onNextPressed = () => {
        props.onSubmit(4, { driveTrain, emissions, carsAmount, carModels, carMakes })
    }
    const _onPickMake = (val: string, index: number) => {
        setCarMakes({...carMakes, [index]: val})
        if(!val)
            setCarMakesErrors({ ...carMakesErrors, [index]: 'Make Required' })
        else setCarMakesErrors({...carMakesErrors, [index]: ''})
    }
    const _onChangeCarModel = (val: string = '', index: number) => {
        setCarModels({...carModels, [index]: val.trim().toLowerCase()})
        console.log(val, index)
        if(!val)
            setCarModelErrors({ ...carModelErrors, [index]: 'Model Required' })
        else setCarModelErrors({...carModelErrors, [index]: ''})
        
        if(carMakes[index] === 'BMW'){
            let invalidPattern = !pattern1Regex.test(val) && !pattern2Regex.test(val)
            console.log(invalidPattern)
            if(invalidPattern){
                setCarModelErrors({ ...carModelErrors, [index]: 'Invalid BMW model' })
            } else {
                setCarModelErrors({ ...carModelErrors, [index]: '' })

            }
        }
    }
    const _renderCarModels = () => {
        console.log('cars amount', carsAmount)
        let questions = []
        for (let make = 0; make < carsAmount && make < 25; make++) {
            questions.push(
                <Box sx = {{ display: 'flex', flexDirection: 'column', width: '100%', mt: 4, height: '100%' }}>
                    <Dropdown error={!!carMakesErrors[make]} helperText={carMakesErrors[make]} handleChange={(val: string) => _onPickMake(val, make)} defaultLabel={'Select Make'} value='' items={CAR_MAKES} />
                    <TextField
                        onChange={(event: any) => _onChangeCarModel(event.target.value, make)}
                        error={!!carModelErrors[make]}
                        helperText={carModelErrors[make]}
                        size="medium"
                        sx={{ width: '50%' }} id="outlined-basic" label="Model" variant="standard"
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
        <Box>
            <RadioGroup title="Which drivetrain do you prefer?" choices={choices} onChangeValue={_handleOnChangeValueDrivetrain} />
            <Box sx = {{ mt: 4 }}>
             <RadioGroup title="Are you worried about fuel emissions?" choices={EMISSION_CHOICES} onChangeValue={_handleOnChangeValueEmissions} />
            </Box>


            <Typography sx = {{ mt: 4 }} variant="h5">How many cars do you have in your family?</Typography>
            <TextField
                onChange={_handleCarsAmountChange}
                InputProps={{
                    inputProps: { min: 0, max: 20 }
                }}
                value = {carsAmount}
                error={!!carsAmountError}
                helperText={carsAmountError}
                size="medium"
                type="number" sx={{ width: '50%', mt: 2, display: 'flex' }} id="outlined-basic" label="Number of Cars" variant="standard"
            />
            {_renderCarModels()}

            <Button onClick={_onNextPressed} disabled={!driveTrain || !emissions || !!carsAmountError || _hasModelError()} sx={{ mt: 8 }} variant="contained">Next</Button>

        </Box>
    )
}