import React, { useEffect, useState } from 'react'
import PieChart from '../components/PieChart'
import Grid from '@mui/material/Grid';
import { Button, Icon, AppBar, TableGrid, Box, Typography } from '../components';
import Divider from '@mui/material/Divider';
import t from '../translation'

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
      width: 100
    }
  },


}

const INITIAL_STATE_PARENT = {
  adolsCount: 0,
  adultsCount: 0,
  unlicensedCount: 0,
  licensedCount: 0,
  restOfUsers: 0,
  firstTimerCount: 0,
  notFirstTimerCount: 0,
  firstTimerPercentage: 0,
  targetableCount: 0,
  untargetableCount: 0,
  nonRWDPercentage: 0,
  RWDPercentage: 0,
  adolesPercentage: 0,
  notLicensedPercentage: 0,
  notLicensedPercentageALLparticipants: 0,
  caresAboutEmissionsCount: 0,
  doesntCareAboutEmissionsCount: 0,
  adolescents: INITIAL_STATE,
  unlicensed: INITIAL_STATE,
  firstTimer: INITIAL_STATE,
  untargetable: INITIAL_STATE,
  breakdown: INITIAL_STATE,
  emissions: INITIAL_STATE,
  nonRWD: INITIAL_STATE,
  carsCountAverage: 0,
  makes: INITIAL_STATE,
  models: INITIAL_STATE
}

export default () => {


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
    if (participants == 0) {
      setData(INITIAL_STATE_PARENT)// Reset
      return
    }
    let adolscents = JSON.parse(localStorage.getItem('adolscents') || "0")
    let adults = participants - adolscents

    let adolesPercentage = (adolscents / participants) * 100

    let licensed = JSON.parse(localStorage.getItem('licensed') || "0")
    let numberOfUnlicensed = adults - licensed


    let licensedPercentage = (licensed / adults) * 100 //adults
    let licensedPercentageALLparticipants = (licensed / participants) * 100

    let notLicensedPercentage = 100 - licensedPercentage //adults
    let notLicensedPercentageALLparticipants = 100 - licensedPercentageALLparticipants - adolesPercentage

    let untargetable = JSON.parse(localStorage.getItem('untargetable') || "0")
    let targetable = participants - untargetable



    const adoles =
      { ...INITIAL_STATE, series: [adolscents, adults], options: { ...INITIAL_STATE.options, labels: ['Adolescents', 'Adults'] } }

    const untargetables =
      { ...INITIAL_STATE, series: [untargetable, targetable], options: { ...INITIAL_STATE.options, labels: ['Untargetable Users', 'Targetable Users'] } }

    const unlicensed =
      licensed == 0 && numberOfUnlicensed == 0
        ? INITIAL_STATE
        : { ...INITIAL_STATE, series: [numberOfUnlicensed, licensed], options: { ...INITIAL_STATE.options, labels: ['Unlicensed', 'Licensed'] } }

    let restOfUsers = 100 - (notLicensedPercentageALLparticipants + adolesPercentage)

    let breakdown =
      { ...INITIAL_STATE, series: [adolesPercentage, notLicensedPercentageALLparticipants, 0, restOfUsers], options: { ...INITIAL_STATE.options, labels: ['Adolescents', 'Unlicensed', 'First-timers', 'Rest of Adults'] } }

    let newData = { ...data, notLicensedPercentage, notLicensedPercentageALLparticipants, restOfUsers, adolesPercentage, breakdown, untargetableCount: untargetable, adultsCount: adults, adolescents: adoles, untargetable: untargetables, unlicensed, adolsCount: adolscents, licensedCount: licensed, unlicensedCount: numberOfUnlicensed, targetableCount: targetable }
    setData(newData)


    let firstTimers = JSON.parse(localStorage.getItem('firstTimers') || "-1")
    if (firstTimers == -1 && targetable == 0)
      return

    let firstTimersPercentage = 0
    let notFirstTimersPercentage = 0

    if (firstTimers != -1) {
      firstTimersPercentage = (firstTimers / participants) * 100
      let notFirstTimers = licensed - firstTimers
      notFirstTimersPercentage = 100 - firstTimersPercentage

      const firstTime =
        { ...INITIAL_STATE, series: [firstTimers, notFirstTimers], options: { ...INITIAL_STATE.options, labels: ['First-timers', 'Not First-timers'] } }
      restOfUsers = restOfUsers - firstTimersPercentage

      breakdown =
        { ...INITIAL_STATE, series: restOfUsers == adults ? [restOfUsers] : [adolesPercentage, notLicensedPercentageALLparticipants, firstTimersPercentage, restOfUsers], options: { ...INITIAL_STATE.options, labels: restOfUsers == adults ? ['All Adults'] : ['Adolescents', 'Unlicensed', 'First-timers', 'Rest of Adults'] } }

      newData = { ...newData, breakdown, restOfUsers, firstTimerPercentage: firstTimersPercentage, adolesPercentage, firstTimer: firstTime, notFirstTimerCount: notFirstTimers, firstTimerCount: firstTimers }

      setData(newData)
    }



    let caresAboutEmissions = JSON.parse(localStorage.getItem('caresAboutEmissions') || "-1")
    if (caresAboutEmissions == -1)
      return
    let doesNotCareAboutEmissions = targetable - caresAboutEmissions

    let RWD = JSON.parse(localStorage.getItem('RWD') || "0")
    let nonRWD = targetable - RWD
    let nonRWDPercentage = (nonRWD / (targetable || 1)) * 100
    let RWDPercentage = 100 - nonRWDPercentage

    let cars = JSON.parse(localStorage.getItem('cars') || "0")
    let families = JSON.parse(localStorage.getItem('families') || "0")
    let carsCountAverage = (cars / (families || 1)).toFixed(2)

    let carMakes = JSON.parse(localStorage.getItem('makes') || "[]")
    let carModels = JSON.parse(localStorage.getItem('models') || "[]")

    let countPerModel: any = {}
    let countPerMake: any = {}

    for (let i = 0; i < carMakes.length; i++) {// count
      countPerMake[carMakes[i]] = (countPerMake[carMakes[i]] || 0) + 1
      countPerModel[carModels[i]] = (countPerModel[carModels[i]] || 0) + 1

    }


    breakdown =
      { ...INITIAL_STATE, series: restOfUsers == adults ? [restOfUsers] : [adolesPercentage, notLicensedPercentageALLparticipants, firstTimersPercentage, restOfUsers], options: { ...INITIAL_STATE.options, labels: restOfUsers == adults ? ['All Adults'] : ['Adolescents', 'Unlicensed', 'First-timers', 'Rest of Adults'] } }

    const emissions =
      { ...INITIAL_STATE, series: [caresAboutEmissions, doesNotCareAboutEmissions], options: { ...INITIAL_STATE.options, labels: ['Cares about Emissions', 'Does not Care about Emissions'] } }

    const nonRWDs =
      { ...INITIAL_STATE, series: [nonRWD, RWD], options: { ...INITIAL_STATE.options, labels: ["FWD or Don't Know", 'RWD'] } }

    const makes =
      { ...INITIAL_STATE, series: [...Object.values(countPerMake)], options: { ...INITIAL_STATE.options, labels: [...Object.keys(countPerMake)] } }

    const models =
      { ...INITIAL_STATE, series: [...Object.values(countPerModel)], options: { ...INITIAL_STATE.options, labels: [...Object.keys(countPerModel)] } }

    setData({ ...newData, carMakes, carModels, breakdown, emissions, nonRWDPercentage, RWDPercentage, caresAboutEmissionsCount: caresAboutEmissions, doesntCareAboutEmissionsCount: doesNotCareAboutEmissions, nonRWD: nonRWDs, carsCountAverage, makes, models })


  }, [forceUpdate])

  let rows = [
    { name: 'Adolescents', count: data.adolsCount }, { name: 'Unlicensed', count: data.unlicensedCount }, { name: 'First-timers', count: data.firstTimerCount },
    { name: 'Targetable', count: data.targetableCount }, { name: 'Average #Cars per Family', count: data.carsCountAverage }
  ]


  return (
    <Box sx={styles.topContainer}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: 'white', borderRadius: 2, padding: '2%', mb: 2, mt: 2, mr: 2 }}>
          <Box sx={{ height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon />
              <Typography sx={{ mr: 4, ml: 4, fontWeight: 'bold' }} variant="h5">{t('header')}</Typography>
            </div>
            <Divider flexItem />
            <Box sx={{ display: 'flex', height: '100%' }}>
              <Box sx={{ pt: 4 }}>
                <Typography sx={{ mr: 4 }} variant="h6">{t('statsHeader2')}</Typography>
                <Button onClick={_resetAll} sx={{ mt: 4 }} variant='contained'>{t('resetAll')}</Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <TableGrid rows={rows} />
      </Box>


      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={styles.gridContainer}>
              <Typography variant='h6' mr={10} ml={4}>
                {t('adolsCount')} {data.adolsCount}
                <Typography mt={2} variant='h6'>{t('adultsCount')} {data.adultsCount}</Typography>
                <Typography mt={2} variant='h6'>{t('total')} {data.adolsCount + data.adultsCount}</Typography>
              </Typography>
              <PieChart params={data.adolescents} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles.gridContainer}>
              <Typography mr={10} ml={4}>
                <Typography mt={2} variant='h6'>{t('licensedAdults')} {data.licensedCount}</Typography>
                <Typography mt={2} variant='h6'>{t('unlicensedAdults')} {data.unlicensedCount}</Typography>
                <Typography mt={2} variant='h6'>{t('total')} {data.unlicensedCount + data.licensedCount}</Typography>

              </Typography>

              <PieChart params={data.unlicensed} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles.gridContainer}>
              <Typography mr={10} ml={4}>
                <Typography mt={2} variant='h6'>{t('firstTimers')} {data.firstTimerCount}</Typography>
                <Typography mt={2} variant='h6'>{t('notFirstTimers')} {data.notFirstTimerCount}</Typography>
                <Typography mt={2} variant='h6'>{t('total')} {data.firstTimerCount + data.notFirstTimerCount}</Typography>

              </Typography>

              <PieChart params={data.firstTimer} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles.gridContainer}>
              <Typography mr={10} ml={4}>
                <Typography mt={2} variant='h6'>{t('targetableUsers')} {data.targetableCount}</Typography>
                <Typography mt={2} variant='h6'>{t('untargetableUsers')} {data.untargetableCount}</Typography>
                <Typography mt={2} variant='h6'>{t('total')} {data.targetableCount + data.untargetableCount}</Typography>

              </Typography>

              <PieChart params={data.untargetable} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles.gridContainer}>
              <Typography variant='h6' mr={5} ml={4}>
                <Typography mt={2} variant='h6'>{t('percentageOfAdols')} {data.adolesPercentage.toFixed(2)}%</Typography>
                <Typography mt={2} variant='h6'>{t('percentageOfNotLicensed')} {data.notLicensedPercentageALLparticipants.toFixed(2)}%</Typography>
                <Typography mt={2} variant='h6'>{t('percentageOfFirstTimers')} {data.firstTimerPercentage.toFixed(2)}%</Typography>
                <Typography mt={2} variant='h6'>{t('percentageOfTheRest')} {data.restOfUsers.toFixed(2)}%</Typography>
              </Typography>
              <PieChart params={data.breakdown} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles.gridContainer}>
              <Typography ml={4}>
                <Typography mt={2} variant='h6'>{t('caresAboutEmissions')} {data.caresAboutEmissionsCount}</Typography>
                <Typography mt={2} variant='h6'>{t('doesntCareEmissions')} {data.doesntCareAboutEmissionsCount}</Typography>
                <Typography mt={2} variant='h6'>{t('total')} {data.caresAboutEmissionsCount + data.doesntCareAboutEmissionsCount}</Typography>
              </Typography>
              <PieChart params={data.emissions} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles.gridContainer}>
              <Typography mr={5} ml={4}>
                <Typography mt={2} variant='h6'>{t('nonRWDPerc')} {data.nonRWDPercentage.toFixed(2)}%</Typography>
                <Typography mt={2} variant='h6'>{t('RWDPerc')} {data.RWDPercentage.toFixed(2)}%</Typography>
              </Typography>
              <PieChart params={data.nonRWD} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles.gridContainer}>
              <Typography mr={5} ml={4}>
                <Typography mt={2} variant='h6'>{t('makeDist')}</Typography>
              </Typography>
              <PieChart params={data.makes} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles.gridContainer}>
              <Typography mr={5} ml={4}>
                <Typography mt={2} variant='h6'>{t('modelDist')}</Typography>
              </Typography>
              <PieChart params={data.models} />
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Box>
  )
}


const styles = {
  gridContainer:
    { alignItems: 'center', padding: '2%', display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 2 },
  topContainer:
    { maxWidth: '100vw', paddingLeft: '2%', paddingRight: '2%', paddingBottom: '2%', height: '100%', flexWrap: 'wrap', backgroundColor: "#EEEDE7" }
}