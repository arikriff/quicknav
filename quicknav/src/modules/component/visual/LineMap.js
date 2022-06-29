import React, { useState } from 'react'
import MapView, { Geojson } from 'react-native-maps'
import { getRouteData, getStopData } from '../../info/query/StopQuery'
import styles from '../invisual/styles'

export default () => {

  const initialRegion = {
    latitude: 31.791840951947094,
    longitude: 35.18217059644936,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08
  }

  return (
    <MapView
      initialRegion={initialRegion}
      style={[styles.lineMap, styles.visual]}
    >
      <Geojson
        geojson={getRouteData()}
        strokeColor='green'
        strokeWidth={5}
      />
      <Geojson
        geojson={getStopData()}
        color='green'
      />
    </MapView>
  )
}