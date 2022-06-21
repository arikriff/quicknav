const fs = require('react-native-fs')
const GeoJSON = require('geojson')

export const read = path => {

  let separated = filePath.split('.')
  const extension = separated.pop() === 'geojson' ? 'GeoJSON' : 'JSON'

  let fileData = {
    name: separated[separated.length-1].split('/').pop(),
    content: undefined
  }
  
  fs.readFile(path, 'utf8').then (

    content => {

      try {
        fileData.content = (
          extension === 'GeoJSON' ?
          GeoJSON.parse(content) :
          JSON.parse(content)
        )
      }
      catch (err) {
        console.log(`Error parsing ${extension} ${fileData.name} string:`, err)
      }
    },

    err => {console.log(`Error read ${extension} ${fileData.name} file:`, err)}
  )

  return fileData

}

export const readMany = paths => {

  data = {}

  paths.forEach(path => {

    const fileData = read(path)
    if (!fileData.content) return undefined

    data[fileData.name] = fileData.content

  })

  return data

}