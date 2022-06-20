import { origin } from './StopUse'
import * as fs from 'node:fs'


export default () => {
  
  try {

    fs.readFile('../../../server/db/line.json', 'utf8', (err, lineJsonString) => {

      if (err) {
        console.log('Error read JSON file:', err)
        throw err
      }

      fs.readFile('../server/src/db/route.geojson', 'utf8', (err, routeGeojsonString) => {

        if (err) {
          console.log('Error read JSON file:', err)
          throw err
        }

        fs.readFile('../server/src/db/stops.geojson', 'utf8', (err, stopsGeojsonString) => {

          if (err) {
            console.log('Error read JSON file:', err)
            throw err
          }
          
          try {

            const line = JSON.parse(lineJsonString)
            const route = JSON.parse(routeGeojsonString)
            const stop = JSON.parse(stopsGeojsonString)

            return {line, route, stop}

          }

          catch {
            console.log('Error parsing JSON string:', err)
            throw err
          }
        })
      })
    })
  }

  catch (err) {
    return null
  }
}

export const getStopFeature = (id, stopFeatures) => (
	stopFeatures.find(stop => stop.properties.id == id)
)
	
export const getStopInLine = (id, lineStops) => (
  lineStops.filter(stop => stop.id == id)
)

export const getCollegeStopInLine = lineStops => (
  lineStops.filter(stop => stop.use.college)
)

export const getStopData = (stopInLine, stopFeature) => {

  let stopsInTrip = []

  stopInLine.forEach(stop => {

    stopsInTrip.push({

      duration: stop.duration,

      use: {
        origin: stop.use.origin,
        destination: stop.use.destination
      }
    })
  })

  return {
    id: stopFeature.id,
    name: stopFeature.properties.name,
    geometry: stopFeature.geometry,
    college: stopInLine[0].use.college,
    stopsInTrip: stopsInTrip
  }

}

export const getStopDataById = (id, lineStops, stopFeatures) => {

  const stopInLine = getStopInLine(id, lineStops)
  const stopFeature = getStopFeature(id, stopFeatures)

  return getStopData(stopInLine, stopFeature)

}

export const getCollegeStopData = (lineStops, stopFeatures) => {

  const stopInLine = getCollegeStopInLine(lineStops)
  const stopFeature = getStopFeature(stopInLine.id, stopFeatures)

  return getStopData(stopInLine, stopFeature)
  
}

export const getJourneyStopsData = (lineStops, stopFeatures, stopUse) => {

  let journeystopsData = []
  
  const journeyLineStops = lineStops.filter(stop =>
    !stop.use.college &&
    stopUse === origin ? stop.use.origin : stop.use.destination
  )
  
  journeyLineStops.forEach(stop => {
    journeyLineStops.push({
      id: stop.id,
      name: getStopFeature(stop.id, stopFeatures).name
    })
  })

  return journeyLineStops

}