
import { toCollege } from './Direction'
import { origin } from './StopUse'
import moment from 'moment'

const line = require('../../db/line.json')
const route = require('../../db/route.json')
const stops = require('../../db/stops.json')
const traffic = require('../../db/traffic.json')


export default () => ({line, route, stops, traffic})

export const getRouteData = () => route
export const getStopsData = () => stops

export const getStopFeature = id => (
  stops.features.find(stop => stop.properties.id == id)
)
	
export const getStopInLine = id => {

  const filtered = line.stops.filter(stop => stop.id == id)
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

export const getCollegeStopInLine = () => {
  const id = line.stops.find(stop => stop.use.college).id
  return getStopInLine(id)
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

export const getStopDataById = id => {

  const stopInLine = getStopInLine(id)
  const stopFeature = getStopFeature(id)

  return getStopData(stopInLine, stopFeature)

}

export const getCollegeStopData = () => {

  const stopInLine = getCollegeStopInLine()
  const stopFeature = getStopFeature(stopInLine.id)

  return getStopData(stopInLine, stopFeature)
  
}

export const getJourneyStopsData = stopUse => {

  let journeyStopsData = []
  
  const journeyLineStops = line.stops.filter(stop => {
    
    return (
      !(stop.use.college) &&
      (stopUse === origin ? stop.use.origin : stop.use.destination)
    )
  })
  
  journeyLineStops.forEach(stop => {

    journeyStopsData.push({
      id: stop.id,
      name: getStopFeature(stop.id).properties.name
    })
    
  })

  return journeyStopsData

}

export const getNextTrips = (stopId, direction) => {

  const now = moment()
  const trafficToday = getTrafficToday(now)

  const {originIndex, destinationIndex} = getJourneyIndexes(stopId, direction)
  const estimatedTripIndex = getEstimatedTripIndex(originIndex, now)

  const MAX_TRIPS_NUM = 4

  let trips = []

  for (
    let i = estimatedTripIndex;
    i>=0 && nextTrips.length < MAX_TRIPS_NUM;
    i--
  ) {

    const stopTime = getOriginArrivalTime (
      estimatedTripIndex,
      originIndex,
      trafficToday
    )

    if (!stopTime) break
    trips = [{departure: stopTime}, ...nextTrips]

  }

  for (
    let i = estimatedTripIndex+1;
    i < line.tripTimes.length && nextTrips.length < MAX_TRIPS_NUM;
    i++
  ) {
    
    const stopTime = getOriginArrivalTime (
      estimatedTripIndex,
      originIndex,
      trafficToday
    )

    if (!stopTime) break
    nextTrips.push({departure: stopTime})

  }

  trips.forEach(trip => {
    
    trip.arrival = getArrivalTime (

      trip.departure,

      {
        origin: originIndex,
        destination: destinationIndex
      },

      trafficToday

    )

  })

  return trips
  
}

const getOriginArrivalTime = (estimatedTripIndex, originIndex, trafficToday) => {

  const stopTime = getArrivalTime (

    getMoment(line.tripTimes[estimatedTripIndex]),

    {
      origin: 0,
      destination: originIndex
    },

    trafficToday
  )

  if (stopTime.isBefore(now)) return undefined
  return stopTime

}

const getJourneyIndexes = (stopId, direction) => {

  if (direction === toCollege) return {

    origin: line.stops.findIndex (
      stop => (stop.id == stopId && stop.use.origin === true)
    ),

    destination: line.stops.length - 1

  }

  else {

    return {

      origin: 0,

      destination: line.stops.findIndex (
        stop => (stop.id == stopId && stop.use.destination === true)
      )
    }
  }
}

const getEstimatedTripIndex = (stopIndex, now) => {

  let bottom = 0, top = line.tripTimes.length - 1
  let middle = undefined

  while (bottom < top) {

    middle = top + Math.floor((top - bottom + 1) / 2)

    const estimatedDeparture = now.subtract (
      moment.duration(line.stops[stopIndex].plannedTime)
    )

    const tripDeparture = getMoment(line.tripTimes[middle], now)

    if (estimatedDeparture.isSame(tripDeparture)) {
      return middle
    }

    if (estimatedDeparture.isBefore(getMoment(line.tripTimes[bottom], now))) {
      return bottom
    }

    if (estimatedDeparture.isAfter(getMoment(line.tripTimes[top], now))) {
      return top
    }

    if (estimatedDeparture.isBefore(tripDeparture)) {
      bottom = middle + 1
    }
    else {
      top = middle - 1
    }
    
  }

}

const getArrivalTime = (departureTime, journeyIndexes, trafficToday) => {

  let realArrivalTime = departureTime

  for (let i = journeyIndexes.origin; i < journeyIndexes.destination; i++) {

    const arrivalPlannedTime = getPlannedSegmentArrival(realArrivalTime, i)
    const relevantTraffic = getRelevantTraffic (

      {
        departure: i == journeyIndexes.origin ? relevantTraffic : undefined,
        arrival: arrivalPlannedTime
      },

      trafficToday
    )

    realArrivalTime = (
      relevantTraffic ?
      realArrivalTime.add(moment.duration(line.stops[i+1].duration[relevantTraffic])) :
      arrivalPlannedTime
    )
    
  }

  return realArrivalTime
  
}

const getPlannedSegmentArrival = (departureTime, originIndex) => {

  const cumulative = {
    origin: moment.duration(line.stops[originIndex].plannedTime),
    destination: moment.duration(line.stops[originIndex+1].plannedTime)
  }

  const duration = cumulative.arrival.subtract(cumulative.destination)
  return departureTime.add(duration)

}

const getRelevantTraffic = (journeyTimes, trafficToday) => {

  for (type in trafficToday) {

    for (time in journeyTimes) {

      if (
        time.isAfter(trafficToday[type].start) &&
        time.isBefore(trafficToday[type].end)
      ) {
        return trafficToday[type]
      }

    }
  }

  return undefined

}

const getMoment = (momentStr, now) => {

  let normalized = moment(`${now.format('DD/MM/YYYY')} ${momentStr}`)
  
  if (now.get('hour') < 4 && normalized.get('hour') >= 4) {
    normalized = normalized.subtract(1, 'days')
  }
  else if (now.get('hour') >= 4 && normalized.get('hour') < 4) {
    normalized = normalized.add(1, 'days')
  }

  return normalized

}

const getTrafficToday = now => {

  let trafficToday = {}

  for (let type in traffic) {

    trafficToday[type] = {}

    for (let edge in traffic[type]) {
      trafficToday[type][edge] = getMoment(traffic[type][edge], now)
    }

  }

  return trafficToday

}