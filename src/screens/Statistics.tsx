import React, { useEffect, useState } from 'react'
import PieChart from '../components/PieChart'
import Grid from '@mui/material/Grid';
import { Button, TableGrid, Box, Typography } from '../components';

export default () => {

  let INITIAL_STATE = {
    series: [100],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['No Data'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      legend: {
       //position: 'bottom',
       width: 100
      }
    },
   

  }

const INITIAL_STATE_PARENT = {
  adolsCount: 0,
  unlicensedCount: 0,
  firstTimerCount: 0,
  targetableCount: 0,
  adolescents:INITIAL_STATE,
  unlicensed:INITIAL_STATE,
  firstTimer:INITIAL_STATE,
  untargetable: INITIAL_STATE,
  breakdown: INITIAL_STATE,
  emissions: INITIAL_STATE,
  nonRWD: INITIAL_STATE,
  carsCountAverage: 0,
  makes: INITIAL_STATE,
  models: INITIAL_STATE
}
  const [data, setData] = useState<any>(
    INITIAL_STATE_PARENT
  )
  const [forceUpdate, setForceUpdate] = useState(false)
  const _resetAll = () => {
    localStorage.clear()
    setForceUpdate(!forceUpdate)
  }
  useEffect(() => {
    let participants = JSON.parse(localStorage.getItem('allParticipants') || "0")
    if (participants == 0){
      setData(INITIAL_STATE_PARENT)// Reset
      return
    }
    let adolscents = JSON.parse(localStorage.getItem('adolscents') || "0")
    let adults = participants - adolscents

    let licensed = JSON.parse(localStorage.getItem('licensed') || "0")
    let numberOfUnlicensed = adults - licensed

    let licensedPercentage = (licensed / participants) * 100
    let notLicensedPercentage = 100 - licensedPercentage

    let untargetable = JSON.parse(localStorage.getItem('untargetable') || "0")
    let targetable = participants - untargetable
    let untargetablePercentage = (untargetable/participants)*100 
    let targetablePercentage = 100 - untargetablePercentage

    
    let adolesPercentage = (adolscents / participants) * 100
    let adultsPercentage = 100 - adolesPercentage

    const adoles =
    { ...INITIAL_STATE, series: [adolscents, adults], options: { ...INITIAL_STATE.options, labels: ['Adolescents', 'Adults'] } }

    const untargetables =
    { ...INITIAL_STATE, series: [untargetable, targetable], options: { ...INITIAL_STATE.options, labels: ['Untargetable Users', 'Targetable Users'] } }
    
    const unlicensed =
    licensed == 0 && numberOfUnlicensed == 0
    ? INITIAL_STATE
    : { ...INITIAL_STATE, series: [numberOfUnlicensed, licensed], options: { ...INITIAL_STATE.options, labels: ['Unlicensed', 'Licensed'] } }

    console.log('licenes', licensed, numberOfUnlicensed)
    let newData = { ...data, adolescents: adoles, untargetable: untargetables, unlicensed, adolsCount: adolscents, unlicensedCount: numberOfUnlicensed, targetableCount: targetable }
    setData(newData)
    
   
    
    

    let firstTimers = JSON.parse(localStorage.getItem('firstTimers') || "-1")
    if(firstTimers == -1 && targetable == 0)
      return

      let firstTimersPercentage = 0
      let notFirstTimersPercentage = 0
      let restOfUsers = adults - (adolscents + numberOfUnlicensed)
      console.log('rest of users', restOfUsers, adults, adolscents, numberOfUnlicensed, firstTimers)
    if(firstTimers != -1){
      firstTimersPercentage = (firstTimers/participants) * 100
      let notFirstTimers = licensed - firstTimers
      notFirstTimersPercentage = 100 - firstTimersPercentage
      console.log('firsttimer', firstTimers, firstTimersPercentage, notFirstTimersPercentage)
      
      const firstTime =
      { ...INITIAL_STATE, series: [firstTimers, notFirstTimers], options: { ...INITIAL_STATE.options, labels: ['First-timers', 'Not First-timers'] } }
      
      newData = { ...newData, firstTimer: firstTime, firstTimerCount: firstTimers }
      restOfUsers = restOfUsers - firstTimers

      setData(newData)
    }
    


    let caresAboutEmissions = JSON.parse(localStorage.getItem('caresAboutEmissions') || "-1")
    if(caresAboutEmissions == -1)
      return
    let caresAboutEmissionsPercentage = (caresAboutEmissions/(targetable||1))*100
    let doesNotCareAboutEmissions = targetable - caresAboutEmissions
    let doesNotCareAboutEmissionsPercentage = 100 - caresAboutEmissionsPercentage

    let RWD = JSON.parse(localStorage.getItem('RWD') || "0")
    let nonRWD = targetable - RWD 
    let nonRWDPercentage = (nonRWD/(targetable||1)) * 100 
    let RWDPercentage = 100 - nonRWDPercentage

    let cars  = JSON.parse(localStorage.getItem('cars') || "0")
    let families = JSON.parse(localStorage.getItem('families') || "0")
    let carsCountAverage = (cars/(families||1)).toFixed(2)

    let carMakes = JSON.parse(localStorage.getItem('makes') || "[]")
    let carModels = JSON.parse(localStorage.getItem('models') || "[]")
    console.log('makes and models', carMakes, carModels)
    let countPerModel: any = {}
    let countPerMake: any = {}

    for(let i=0; i<carMakes.length; i++){// count
      countPerMake[carMakes[i]] = (countPerMake[carMakes[i]]||0) + 1
      countPerModel[carModels[i]] = (countPerModel[carModels[i]]||0) + 1
      
    }
    let BMWCount = countPerMake['BMW'] || 0
    console.log('fater first loop', countPerMake, BMWCount)

    // Object.keys(countPerModel).forEach((element) => {// percentage
    //   countPerModel[element] = (countPerModel[element]/cars) * 100
    // })
    // Object.keys(countPerMake).forEach((element) => {// percentage
    //   countPerMake[element] = (countPerMake[element]/BMWCount) * 100
    // })
    //let carMakesAverage = (carMakes/cars) * 100
    //let carModelsAverage = (carModels/cars) * 100

   
   
   
    
    console.log('cars', cars, 'families', families)
    const breakdown = 
    { ...INITIAL_STATE, series: restOfUsers == adults ? [restOfUsers] : [adolscents, numberOfUnlicensed, firstTimers, restOfUsers], options: { ...INITIAL_STATE.options, labels: restOfUsers == adults ? ['All Adults'] : ['Adolescents', 'Unlicensed', 'First-timers', 'Rest of Adults'] } }

    const emissions = 
    { ...INITIAL_STATE, series: [caresAboutEmissions, doesNotCareAboutEmissions], options: { ...INITIAL_STATE.options, labels: ['Cares about Emissions', 'Does not Care about Emissions'] } }

    const nonRWDs = 
    { ...INITIAL_STATE, series: [nonRWD, RWD], options: { ...INITIAL_STATE.options, labels: ["FWD or Don't Know", 'RWD'] } }

    const makes = 
    { ...INITIAL_STATE, series: [...Object.values(countPerMake)], options: { ...INITIAL_STATE.options, labels: [...Object.keys(countPerMake)] } }

    const models = 
    { ...INITIAL_STATE, series: [...Object.values(countPerModel)], options: { ...INITIAL_STATE.options, labels: [...Object.keys(countPerModel)] } }

    setData({ ...newData,  breakdown, emissions, nonRWD: nonRWDs, carsCountAverage, makes, models })
  

  }, [forceUpdate])
  let rows = [
    { name: 'Adolescents', count: data.adolsCount }, { name: 'Unlicensed', count: data.unlicensedCount }, { name: 'First-timers', count: data.firstTimerCount },
    { name: 'Targetable', count: data.targetableCount }, { name: 'Average #Cars per Family', count: data.carsCountAverage }
  ]
  return (
    <Box sx = {{ maxWidth: '100vw', paddingLeft: '2%', paddingRight: '2%', paddingBottom: '2%', display: 'flex', height: '100%', flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "rgb(166, 218, 213)" }}>
                {/* <Box sx = {{ alignItems: 'center', display: 'flex', flexDirection: 'column',  }}>
                 <PieChart params={data.adolescents} />
                 <Typography>Adolescents</Typography>
                </Box>
                <PieChart params={data.unlicensed} />
                <PieChart params={data.firstTimer} />
                <PieChart params={data.untargetable} />
                <PieChart params={data.breakdown} />
                <PieChart params={data.emissions} />
                <PieChart params={data.nonRWD} />
                <PieChart params={data.makes} />
                <PieChart params={data.makes} />
                <PieChart params={data.models} /> */}
      {/* <Box sx = {{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx = {{ padding: '2%', mt: 10 }} variant="h5">Average Number of Cars per Family: {data.carsCountAverage}</Typography>
        <Typography sx = {{ padding: '2%', mt: 10 }} variant="h5">Number of Adolescents participated: {data.adolsCount}</Typography>
      </Box> */}
      <TableGrid rows = {rows}/>
      <Button sx = {{ alignSelf: 'flex-end', display: 'flex', height: 50, margin: '2%' }} onClick={_resetAll} variant="contained">Reset All</Button>

     <Box style = {{ padding: '2%', backgroundColor: 'white', borderRadius: 16 }}>
     <Grid container spacing={2}>
        <Grid item xs={4}>
          <PieChart params={data.adolescents} />
        </Grid>
        <Grid item xs={4}>
          <PieChart params={data.unlicensed} />
        </Grid>
        <Grid item xs={4}>
          <PieChart params={data.firstTimer} />
        </Grid>
        <Grid item xs={4}>
          <PieChart params={data.untargetable} />
        </Grid>
        <Grid item xs={4}>
          <PieChart params={data.breakdown} />
        </Grid>
        <Grid item xs={4}>
          <PieChart params={data.emissions} />
        </Grid>
        <Grid item xs={4}>
          <PieChart params={data.nonRWD} />
        </Grid>
        <Grid item xs={4}>
          <PieChart params={data.makes} />
        </Grid>
        <Grid item xs={4}>
          <PieChart params={data.models} />
        </Grid>
      </Grid>
     </Box>

    </Box>
  )
}