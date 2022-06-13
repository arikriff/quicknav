
const findStopFromLine = (line, id) => (
	line.stops.find(stop => stop.id == id)
)
	
const findStopFromStops = (stopFeatures, id) => (
  stopFeatures.find(stop => stop.properties.stop_id == id)
)

const getStopNameById = (stopFeatures, id) => (
  findStopFromStops(stopFeatures, id).properties.stop_name
)

const findCollegeStopName = (line, stopFeatures) => {
	const collegeStop = line.stops.find(stop => stop.use.college)
	return getStopNameById(stopFeatures, collegeStop.id)
}

const getStopDataById = (id, lineStops, stopFeatureData) => {

  const stopFeature = stopFeatureData.find(stop => stop.properties.id == id)
  const stopInLine = lineStops.filter(stop => stop.id == id)

  const stopData = {
    id: id,
    name: stopFeature.properties.name,
    geometry: stopFeature.geometry,
    plannedTime: stopInLine
      "duration": null,
      "use": {
        "college": true,
        "origin": true,
        "destination": false
      }



  }
}

export {
  findStopFromLine,
  findStopFromStops,
  getStopNameById,
  findCollegeStopName
}