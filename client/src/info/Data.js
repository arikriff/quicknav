import { read } from './File'
import { origin } from './StopUse'

export default () => {

  const line = read('../../../server/src/db/line.json', false)
  if (!line) return null

  const route = read('../../../server/src/db/route.geojson', true)
  if (!route) return null

  const stops = read('../../../server/src/db/stops.geojson', true)
  if (!stops) return null

  return {line, route, stops}
  
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