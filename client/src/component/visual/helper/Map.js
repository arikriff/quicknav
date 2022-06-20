import React, { useState } from 'react'
import MapView from 'react-native-maps'
import { getContext } from '../../unvisual/Context'

export default () => {

  const context = getContext()

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
    >
    </MapView>
  )
}