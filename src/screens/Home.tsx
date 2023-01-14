import React, { useState, useRef } from 'react'
import { WelcomeSection, Icon, Section1, EndSection, Section3, Section4, Section5, Box, AppBar, Steps, Typography } from '../components'
import Divider from '@mui/material/Divider';
import t from '../translation'
import { useNavigate } from 'react-router-dom';

const sections = [WelcomeSection, Section1, EndSection, Section3, Section4, Section5]

const sectionsText = ['', '',
    t('sectionText1')
    , t('sectionText2')
    , t('sectionText3'),
    t('sectionText4')
]
const steps = [0, 0, 3, 1, 1, 2]
export default () => {


    const [step, setStep] = useState(0)
    const [stepperStep, setStepperStep] = useState(0)
    const [endText, setEndText] = useState('')
    const age = useRef(0)
    const navigate = useNavigate();

    const _changeStep = (prevStep: number, val: any) => {
        const adolscents = JSON.parse(localStorage.getItem('adolscents') || "0")
        const allParticipants = JSON.parse(localStorage.getItem('allParticipants') || "0")
        const untargetable = JSON.parse(localStorage.getItem('untargetable') || "0")
        if (prevStep === 0) {
            setStep(1)
            setStepperStep(0)
        }
        if (prevStep === 1 && val < 18) {
            setEndText(sectionsText[2])
            setStep(2)

            localStorage.setItem("adolscents"
                , JSON.stringify(adolscents + 1))
            localStorage.setItem("allParticipants"
                , JSON.stringify(allParticipants + 1))
            localStorage.setItem("untargetable"
                , JSON.stringify(untargetable + 1))

        }
        if (prevStep === 1 && val >= 18) {
            setStep(3)
            setStepperStep(1)

            age.current = val
            localStorage.setItem("allParticipants"
                , JSON.stringify(allParticipants + 1))
        }
        if (prevStep === 3 && val != 'yes') {
            setEndText(sectionsText[3])
            setStep(2)

            localStorage.setItem("untargetable"
                , JSON.stringify(untargetable + 1))
        }
        if (prevStep === 3 && val === 'yes') {
            const licensed = JSON.parse(localStorage.getItem('licensed') || "0")
            localStorage.setItem("licensed"
                , JSON.stringify(licensed + 1))
            if (age.current >= 18 && age.current <= 25) {
                setStep(4)

            }
            else {
                setStep(5)
                setStepperStep(2)

            }
        }
        if (prevStep === 4 && val === 'yes') {
            setEndText(sectionsText[4])
            setStep(2)
            const firstTimers = JSON.parse(localStorage.getItem('firstTimers') || "0")
            localStorage.setItem("firstTimers"
                , JSON.stringify(firstTimers + 1))
            localStorage.setItem("untargetable"
                , JSON.stringify(untargetable + 1))

        }
        if (prevStep === 4 && val === 'no') {
            setStep(5)
            setStepperStep(2)

        }

        if (prevStep === 5) {
            setEndText(sectionsText[5])
            setStepperStep(4)
            setStep(2)
            let { driveTrain, emissions, carsAmount, carMakes, carModels } = val
            const caresAboutEmissions = JSON.parse(localStorage.getItem('caresAboutEmissions') || "-1")
            if (emissions === 'yes') {
                localStorage.setItem("caresAboutEmissions"
                    , JSON.stringify(caresAboutEmissions === -1 ? 1 : caresAboutEmissions + 1))

            } else if (caresAboutEmissions === -1) {
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
    }

    const _goToStats = () => {
        console.log('gotostats')
        navigate('/statistics')
    }
    let ActiveSection = sections[step]

    return (
        <Box sx={{ p: '1.5%', height: '100vh' }}>

            <Box sx={{ width: '100%', height: '100%' }}>
                <Box sx={{ height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon />
                        <Typography sx={{ mr: 4, ml: 4,  minWidth: 800, fontWeight: 'bold' }} variant="h4">{t('header')}</Typography>
                    </div>
                    <Divider />
                    <Box sx={{ display: 'flex', height: '100%' }}>
                        <AppBar onNavigate = {_goToStats}/>
                        <Divider sx={{ ml: '1.5%', mr: '1.5%' }} orientation="vertical" flexItem />
                        <Box sx={{ ml: 2 }}>
                            {step > 0 && <Steps error = {step === 2} activeStep={stepperStep} />}
                            <ActiveSection onSubmit={_changeStep} endText={endText} onConfirm={() => setStep(0)} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}