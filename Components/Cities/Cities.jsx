import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../../db/Config';

const Cities = () => {
    getDocs(collection(db, "cities")).then(
        querySnapshot=>
    querySnapshot.forEach((doc) => {
      console.log(doc.id,doc.data());
    })
    );
  return (
    <View>
      <Text>Cities</Text>
    </View>
  )
}

export default Cities

const styles = StyleSheet.create({})