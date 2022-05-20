import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { getUserById } from '../../db/Data/Users';

const UserSite = ({navigation ,route}) => {
    let item = route.params.item;

    const change = () => {
        getUserById(item.uid).then((user) => {
          const user1 = user;
          editUser({
            ...user1[0],
            name: name,
            image: image,
            password: pass,
            countryname: countryname,
            mony:mony,

          });
        });
    };

      const [image, setImage] = useState();
      const [pass, setpass] = useState();
      const [countryname, setcountryname] = useState();
      const [name, setName] = useState();
      const [mony, setmony] = useState();
      const [id, setId] = useState(0);

  return (
    <View>
      <View style={styles.in}>
          <TextInput
            onChangeText={setName}
            keyboardType="default"
            placeholder="user name"
            value={item.name}
            style={styles.inpp}
          />
        </View>
        <TextInput
            onChangeText={setmony}
            keyboardType="default"
            placeholder="user name"
            value={item.money}
            style={styles.inpp}
          />
        <TextInput
            onChangeText={setcountryname}
            keyboardType="default"
            placeholder="user name"
            value={item.countryname}
            style={styles.inpp}
          />
          <TextInput
            // onChangeText={setName}
            keyboardType="default"
            placeholder="user name"
            value={item.email}
            style={styles.inpp}
          />
          <TextInput
            onChangeText={setpass}
            keyboardType="default"
            placeholder="user name"
            value={item.password}
            style={styles.inpp}
          />
      <Button title="done" onPress={change} />

    </View>
  )
}

export default UserSite

const styles = StyleSheet.create({
    inpp: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})