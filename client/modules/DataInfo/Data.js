
const getStopFeature = (id, stopFeatures) => (
	stopFeatures.find(stop => stop.properties.id == id)
)
	
const getStopInLine = (id, lineStops) => (
  lineStops.filter(stop => stop.id == id)
)

const getCollegeStopInLine = lineStops => (
  lineStops.filter(stop => stop.use.college)
)

const getStopData = (stopInLine, stopFeature) => {

  const stopsInTrip = []

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

const getStopDataById = (id, lineStops, stopFeatures) => {

  const stopInLine = getStopInLine(id, lineStops)
  const stopFeature = getStopFeature(id, stopFeatures)

  return getStopData(stopInLine, stopFeature)

}

const getCollegeStopData = (lineStops, stopFeatures) => {

  const stopInLine = getCollegeStopInLine(lineStops)
  const stopFeature = getStopFeature(stopInLine.id, stopFeatures)

  return getStopData(stopInLine, stopFeature)
  
}

export {
  getStopFeature,
  getStopInLine,
  getCollegeStopInLine,
  getStopData,
  getStopDataById,
  getCollegeStopData
}