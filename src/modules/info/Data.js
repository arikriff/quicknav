
import { toCollege } from './Direction'
import { origin } from './StopUse'
import moment from 'moment-timezone'

const line = require('../../db/line.json')
const route = require('../../db/route.json')
const stops = require('../../db/stops.json')
const traffic = require('../../db/traffic.json')


export default () => ({line, route, stops, traffic})

export const getRoute = () => route
export const getStops = () => stops

export const getLineName = () => line.name

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

export const getCollegeStopData = () => {

  const stopInLine = getCollegeStopInLine()
  const stopFeature = getStopFeature(stopInLine.id)

  return getStopData(stopInLine, stopFeature)
  
}

export const getOptionalStops = stopUse => {

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

// get the next available trips from a given stop and direction.
export const getNextTrips = (stopId, direction) => {
  const MAX_TRIPS_NUM = 7
  const [originIndex, destinationIndex] = getJourneyIndexes(stopId, direction)
  // const estimatedTripIndex = getEstimatedTripIndex(originIndex, now)
  let nextTrips = []

  // find the next trip from now
  let nextTripIndex = line.tripTimes.findIndex((_trip, index) =>
    calculateArrivalTime(0, originIndex, getMoment(line.tripTimes[index])).isSameOrAfter()
  );

  // add MAX_TRIPS_NUM trips from the trip found
  for (let i = 0; i < MAX_TRIPS_NUM; i++) {
    if (nextTripIndex + i == line.tripTimes.length)
      break;
    const departure = calculateArrivalTime(0, originIndex, getMoment(line.tripTimes[nextTripIndex + i]));
    nextTrips.push({
      departure: departure,
      arrival: calculateArrivalTime(originIndex, destinationIndex, departure)
    });
  }

  return nextTrips
}

const getJourneyIndexes = (stopId, direction) => {

  if (direction === toCollege){

    return [

      line.stops.findIndex (
        stop => (stop.id == stopId && stop.use.origin === true)
      ),

      line.stops.length - 1

    ]
  }

  else {

    return [
      0,
      line.stops.findIndex (
        stop => (stop.id == stopId && stop.use.destination === true)
      )
    ]
  }
}

// calculates the estimated arrival time with traffic between two stops at a given time.
const calculateArrivalTime = (originIndex, destinationIndex, departureTime) => {
  let realArrivalTime = departureTime

  for (let i = originIndex; i < destinationIndex; i++) {
    const originTime = moment.duration(line.stops[i].plannedTime);
    const destinationTime = moment.duration(line.stops[i+1].plannedTime);
    const plannedArrivalDuration = destinationTime.clone().subtract(originTime);
    const plannedArrivalTime = realArrivalTime.clone().add(plannedArrivalDuration)
    const trafficWindow = getRelevantTrafficWindow(realArrivalTime, plannedArrivalTime)
    const realtimeArrivalDuration = moment.duration(line.stops[i+1].duration[trafficWindow])

    realArrivalTime = realArrivalTime.clone().add(trafficWindow ? realtimeArrivalDuration : plannedArrivalDuration)
  }

  return realArrivalTime
}

// check if segment is overlapping with traffic times.
// if true, return the traffic window name.
// if false, return undefined.
const getRelevantTrafficWindow = (departure, arrival) => {
  let trafficToday = {};
  let value;

  for (let type in traffic) {
    trafficToday[type] = {}
    for (let edge in traffic[type])
      trafficToday[type][edge] = getMoment(traffic[type][edge]);

    [departure, arrival].find(time => {
      if (time.isBetween(trafficToday[type].start, trafficToday[type].end))
        return value = type;
    });
    if (value)
      break;
  }

  return value;
}

// normalize string entries from the database to moment type
const getMoment = (momentStr) => {

  const DATE_FORMAT = 'DD/MM/YYYY'
  const TIME_FORMAT = 'HH:mm:ss'

 return normalized = moment(
    `${moment().format(DATE_FORMAT)} ${momentStr}`,
    `${DATE_FORMAT} ${TIME_FORMAT}`
  )

}
