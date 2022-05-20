import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { getUserById } from '../../db/Data/Users';
import { editUser } from '../../db/Data/Users';

const UserSite = ({navigation ,route}) => {
    let item = route.params.item;

    const change = () => {
        getUserById(item.id).then((user) => {
          const user1 = user;
          editUser({
            ...user1[0],
            money:money,

          });
        });
      };

      
      const [money, setmoney] = useState(item.money);
    

  return (
    <View>
        <TextInput
            onChangeText={setmoney}
            keyboardType="default"
            placeholder="user name"
            value={money}
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