import React, { useEffect, useState, useRef } from 'react'
import { Icon, Section1, EndSection, Section3, Section4, Section5, Box, Dropdown, AppBar, Steps, Toolbar, IconButton, MenuIcon, Typography, Button, Container, TextField } from '../components'
import { Outlet } from "react-router-dom";
import Divider from '@mui/material/Divider';

const sections = [Section1, EndSection, Section3, Section4, Section5]
const sectionsText = ['',
    'This survey is intended for people above the age of 18. Thank you for taking the time to submit your responses.'
    , 'This survey is intended for people who own a car, Thank you for taking the time to submit your responses.'
    , 'We are targeting more experienced clients, thank you for your interest',
    'Thank you for taking the time to complete this survey.'
]
const steps = [0,3,1,1,2]
export default () => {


    const [step, setStep] = useState(0)
    const [endText, setEndText] = useState('')
    const age = useRef(0)

    const _changeStep = (prevStep: any, val?: any) => {

        const adolscents = JSON.parse(localStorage.getItem('adolscents') || "0")
        const allParticipants = JSON.parse(localStorage.getItem('allParticipants') || "0")
        const untargetable = JSON.parse(localStorage.getItem('untargetable') || "0")
        if (prevStep == 0 && val < 18) {
            console.log('setting step')
            setEndText(sectionsText[1])
            setStep(1)

            localStorage.setItem("adolscents"
                , JSON.stringify(adolscents + 1))
            localStorage.setItem("allParticipants"
                , JSON.stringify(allParticipants + 1))
            localStorage.setItem("untargetable"
                , JSON.stringify(untargetable + 1))

        }
        if (prevStep == 0 && val >= 18) {
            setStep(2)
            age.current = val
            localStorage.setItem("allParticipants"
                , JSON.stringify(allParticipants + 1))
        }
        if (prevStep == 2 && val != 'yes') {
            setEndText(sectionsText[2])
            setStep(1)

            localStorage.setItem("untargetable"
                , JSON.stringify(untargetable + 1))
        }
        if (prevStep == 2 && val == 'yes') {
            const licensed = JSON.parse(localStorage.getItem('licensed') || "0")
            localStorage.setItem("licensed"
                , JSON.stringify(licensed + 1))
            if (age.current >= 18 && age.current <= 25) {
                setStep(3)
            }
            else {
                setStep(4)
            }
        }
        if (prevStep == 3 && val == 'yes') {
            setEndText(sectionsText[3])
            setStep(1)
            const firstTimers = JSON.parse(localStorage.getItem('firstTimers') || "0")
            localStorage.setItem("firstTimers"
                , JSON.stringify(firstTimers + 1))
            localStorage.setItem("untargetable"
                , JSON.stringify(untargetable + 1))

        }
        if (prevStep == 3 && val == 'no') {
            setStep(4)
        }

        if (prevStep == 4) {
            setEndText(sectionsText[4])
            setStep(1)
            let { driveTrain, emissions, carsAmount, carMakes, carModels } = val
            console.log('last step', driveTrain, emissions, carsAmount, carModels, carMakes)
            const caresAboutEmissions = JSON.parse(localStorage.getItem('caresAboutEmissions') || "-1")
            if (emissions == 'yes') {
                localStorage.setItem("caresAboutEmissions"
                    , JSON.stringify(caresAboutEmissions == -1 ? 1 : caresAboutEmissions + 1))

            } else if (caresAboutEmissions == -1) {
                localStorage.setItem("caresAboutEmissions"
                    , JSON.stringify(0))
            }
            if (driveTrain != 'FWD' && driveTrain != 'IDK') { // RWD users to calculate the rest later
                const RWD = JSON.parse(localStorage.getItem('RWD') || "0")
                localStorage.setItem("RWD"
                    , JSON.stringify(RWD + 1))
            }
            const families = JSON.parse(localStorage.getItem('families') || "0")
            const cars = JSON.parse(localStorage.getItem('cars') || "0")
            const makes = JSON.parse(localStorage.getItem('makes') || "[]")
            const models = JSON.parse(localStorage.getItem('models') || "[]")

            localStorage.setItem("families"
                , JSON.stringify(families + 1))
            localStorage.setItem("cars"
                , JSON.stringify(cars + parseInt(carsAmount)))
            localStorage.setItem("makes"
                , JSON.stringify([...makes, ...Object.values(carMakes)]))
            localStorage.setItem("models"
                , JSON.stringify([...models, ...Object.values(carModels)]))


        }
        console.log('prevstep', prevStep, typeof val, val, age)
    }
    let ActiveSection = sections[step]
    let stepperStep = steps[step]
    return (
        <Box sx={{ p: '2%', height: '100vh' }}>
          
            <Box sx={{ width: '100%', height: '100%' }}>
                {/* <Outlet /> */}

                <Box sx={{ height: '100%' }}>
                    <div style = {{ display: 'flex',alignItems: 'center' }}>
                        <Icon />
                        <Typography sx = {{ mr: 4, ml: 4, fontWeight: 'bold' }} variant="h4">Automotive Sales Customer Survey</Typography>
                    </div>
                    <Divider />
                    <Box sx = {{ display: 'flex', height: '100%' }}>
                        <AppBar />
                        <Divider  sx = {{ ml: '2%', mr: '2%' }} orientation="vertical" flexItem/>
                        <Box sx={{ p: 4, width: '30vw' }}>
                            <Steps activeStep = {stepperStep} />
                            <ActiveSection onSubmit={_changeStep} endText={endText} onConfirm={() => setStep(0)} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}