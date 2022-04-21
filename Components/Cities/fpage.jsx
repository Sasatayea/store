import { StyleSheet, Text, View ,Button } from 'react-native'
import React from 'react'

function fpage ({ navigation }) {
  return (
    <View>
      <Text> hello people </Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  )
}

export default fpage

const styles = StyleSheet.create({})