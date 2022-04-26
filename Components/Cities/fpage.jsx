import { StyleSheet, Text, View ,Button ,ImageBackground } from 'react-native'
import React from 'react'
import fpagee from '../../assets/fpagee.png'
function fpage ({ navigation }) {
  return (
    <ImageBackground source={fpagee} resizeMode="cover"
      style={styles.heder}>
      <View style={styles.pp}>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      </View>
      <View style={styles.pp2}>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Register')}
      />
      </View>
    </ImageBackground>
  )
}

export default fpage

const styles = StyleSheet.create({
  heder:{
    height:'100%',
    width:'100%',
  },
  pp:{
    marginTop:'90%',
    padding:'5%',
  },
  pp2:{
    padding:'5%'
  }
})