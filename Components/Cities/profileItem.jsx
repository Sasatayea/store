import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileItem = ({ item }) => {
  return (
    <View>
    <Text>{item.name}</Text>
    <Text>{item.email}</Text>
    <Text>{item.countryname}</Text>
    <Text>{item.money}</Text>

    </View>
  )
}

export default ProfileItem

const styles = StyleSheet.create({})