import * as fs from 'node:fs'
const GeoJSON = require('geojson')

export const read = (file, geojson) => {

  let obj = null

  fs.readFile(file, 'utf8', (err, data) => {

    const fileType = geojson ? 'GeoJSON' : 'JSON'

    if (err) {
      console.log(`Error read ${fileType} file:`, err)
      return
    }

    try {
      obj = geojson ? GeoJSON.parse(data) : JSON.parse(data)
    }
    catch {
      console.log(`Error parsing ${fileType} string:`, err)
      obj = null
    }

  })

  return obj

}