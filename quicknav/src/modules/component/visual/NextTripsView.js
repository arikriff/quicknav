import React from 'react'
import moment from 'moment'
import { FlatList, Text } from 'react-native'
import { getLineName } from '../../info/Data'
import { toCollege } from '../../info/Direction'
import { getContext } from '../invisual/Context'
import styles from '../invisual/styles'
import { Column, Row } from './Container'

const NoTrips = () => (
  <Row>
    <Text style={styles.noTrips}>
      אין נסיעות בקרוב
    </Text>
  </Row>
)

const DepartureItem = ({item, direction}) => (
  <Text style={[styles.nextDepartures, getDirectionStyle(direction)]}>
    {item.departure}
  </Text>
)

const DurationText = () => {

  const context = getContext()

  return (
    <Text
      style={[
        styles.duration,
        getDirectionStyle(context.state.direction)
      ]}
    >
      {
        'במשך: ' +
        (
          moment.duration (
            context.state.nextTrips[0].arrival.diff(
              context.state.nextTrips[0].departure
            )
          ).asMinutes
        ) +
        ' דק\''
      }
    </Text>
  )
}

const getDirectionStyle = direction => (
  direction === toCollege ? styles.toCollege : styles.fromCollege
)

const JourneyTimes = () => {

  const context = getContext()

  return (
    <Text
      style={[
        styles.nextTrip,
        styles.nextTripsSaparator,
        getDirectionStyle(context.state.direction)
      ]}
    >
      {
        context.state.nextTrips[0].departure.format('H:mm') +
        ' - ' +
        context.state.nextTrips[0].arrival.format('H:mm')
      }
    </Text>
  )

  
}

const NextDepartureSeparator = ({children}) => (
  <Text
    style={[
      styles.nextDepartures,
      styles.nextDepartureSeparator,
      styles.nextTripsSaparator
    ]}
  >
    {children}
  </Text>

)

const Trips = () => {

  const context = getContext()

  const renderItem = item => (
    <DepartureItem
      item={item}
      direction={context.state.direction}
    />
  )

  return (
    <Column>
      <Row style={styles.visual}>
        <Column style={styles.lineNameView}>
          <Text style={styles.lineNameText}>
            {getLineName()}
          </Text>
        </Column>
      </Row>
      <Row style={styles.visual}>
        <JourneyTimes/>
        <DurationText/>
      </Row>
      {
        context.state.nextTrips.length > 1 ?
        (
          <Row style={styles.visual}>
            <FlatList

              data={context.state.nextTrips.slice(1)}
              renderItem={renderItem}
              horizontal={true}

              ListFooterComponent={
                <NextDepartureSeparator>
                  נסיעות נוספות:
                </NextDepartureSeparator>
              }

              ItemSeparatorComponent={
                <NextDepartureSeparator>
                  ,
                </NextDepartureSeparator>
              }

            />
          </Row>
        ) :
        null
      }
    </Column>
  )
}

export default () => {

  const context = getContext()

  return (
    <Column>
      {
        context.state.nextTrips === undefined ?
        null :
        (context.state.nextTrips === [] ? <NoTrips/> : <Trips/>)
      }
    </Column>

  )
}