import { origin } from './StopUse'

const line = require('../../db/line.json')
const route = require('../../db/route.json')
const stops = require('../../db/stops.json')

export default () => ({line, route, stops})

export const getStopFeature = (id, stopFeatures) => (
  stopFeatures.find(stop => stop.properties.id == id)
)
	
export const getStopInLine = (id, lineStops) => {

  const filtered = lineStops.filter(stop => stop.id == id)
  let stopsInTrip = []

  filtered.forEach(stop => {

    stopsInTrip.push ({

      plannedTime: stop.plannedTime,

      use: {
        origin: stop.origin,
        destination: stop.destination
      }
    })
  })

  return {
    id,
    college: filtered[0].use.college,
    stopsInTrip
  }

}

export const getCollegeStopInLine = lineStops => {
  const id = lineStops.find(stop => stop.use.college).id
  return getStopInLine(id, lineStops)
}

export const getStopData = (stopInLine, stopFeature) => {

  return {
    id: stopFeature.properties.id,
    name: stopFeature.properties.name,
    geometry: stopFeature.geometry,
    college: stopInLine.college,
    stopsInTrip: stopInLine.stopsInTrip
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

  let journeyStopsData = []
  
  const journeyLineStops = lineStops.filter(stop => {
    
    return (
      !(stop.use.college) &&
      (stopUse === origin ? stop.use.origin : stop.use.destination)
    )
  })
  
  journeyLineStops.forEach(stop => {

    journeyStopsData.push({
      id: stop.id,
      name: getStopFeature(stop.id, stopFeatures).properties.name
    })
    
  })

  return journeyStopsData

}