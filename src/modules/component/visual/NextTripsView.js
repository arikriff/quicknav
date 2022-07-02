import React from 'react'
import moment from 'moment-timezone'
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

const DepartureItem = ({item, direction}) => {

  return (
    <Text style={[styles.nextDepartures, getDirectionStyle(direction)]}>
      {item.departure}
    </Text>
  )
}

const DurationText = () => {

  const context = getContext()

  return (
    <Text
      style={{ ...styles.duration, ...getDirectionStyle(context.state.direction) }}
    >
      {`במשך: ${moment.duration(context.state.nextTrips[0].arrival.diff(context.state.nextTrips[0].departure)).asMinutes()} דק\'`}
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
        context.state.nextTrips[0].departure.format('HH:mm') +
        ' - ' +
        context.state.nextTrips[0].arrival.format('HH:mm')
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

const MoreTripsTitle = () => (
  <NextDepartureSeparator>
    נסיעות נוספות:
  </NextDepartureSeparator>
)

const Comma = () => (
  <NextDepartureSeparator>
    ,
  </NextDepartureSeparator>
)

const Trips = () => {

  const context = getContext()

  const renderItem = item => {

    return (
      <DepartureItem
        item={item}
        direction={context.state.direction}
      />
    )
  }

  

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
      <Row>
        <Text style={styles.nextTrip}>
          הנסיעות הבאות:{`\n${context.state.nextTrips.slice(1).map(trip => `${trip.departure.format('HH:mm')} במשך: ${moment.duration(trip.arrival.diff(trip.departure)).asMinutes()} דק\'`).join('\n')}`}
        </Text>
      </Row>
      {/* {context.state.nextTrips.length > 1 &&
        <Row style={styles.visual}>
          <FlatList
            data={context.state.nextTrips.slice(1)}
            renderItem={renderItem}
            horizontal={true}
            ListFooterComponent={MoreTripsTitle}
            ItemSeparatorComponent={Comma}
          />
        </Row>
      } */}
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
        (context.state.nextTrips.length > 0 ? <Trips/> : <NoTrips/>)
      }
    </Column>

  )
}