import React, { useState } from 'react'
import MapView, { Geojson } from 'react-native-maps'
import styles from '../invisual/styles'

const route = require('../../../db/route.json')
const stops = require('../../../db/stops.json')

export default () => {

  const [region, setRegion] = useState({
    latitude: 31.791840951947094,
    longitude: 35.18217059644936,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08
  })

  const onRegionChange = newRegion => {setRegion(newRegion)}

  return (
    <MapView
      region={region}
      onRegionChange={onRegionChange}
      style={[styles.lineMap, styles.visual]}
    >
      <Geojson
        geojson={route}
        strokeColor='green'
        strokeWidth={2}
      />
      <Geojson
        geojson={stops}
        color='green'
      />
    </MapView>
  )
}