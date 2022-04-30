import { View, Text, Button, TextInput ,FlatList ,Image ,Picker ,StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import {
  getCities,
  addCity,
  deleteCity,
  subscribe,
} from "../../db/cities/cities";
import { subscribeUser } from "../../db/cities/users";
import Pitem from "../items/Pitem";
import { editUser,getUsers } from "../../db/cities/users";
import image1 from "../../assets/loginn.png";
import EditCity from "./EditCity";
import { TouchableOpacity } from "react-native-web";

const CitiesList = ({ navigation }) => {
  const getUsersList = async () => {
    const u = await getUsers();
    setUsers(u);
    let newcart = u.map((e)=>(e.cart));
    setCartt(newcart);
    console.log("users: ", u);
  };
  const getCitiesList = async () => {
    const c = await getCities();
    setCities(c);
    console.log("cities", c);
  };
  
  useEffect(() => {
    getCitiesList();
    getUsersList();
  }, []);
  
  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      //   console.log("changes", change, snapshot, change.type);
      // if (snapshot.metadata.hasPendingWrites) {
      if (change.type === "added") {
        //console.log("New city: ", change.doc.data());
        getCitiesList();
      }
      if (change.type === "modified") {
        //console.log("Modified city: ", change.doc.data());
        getCitiesList();
      }
      if (change.type === "removed") {
        //console.log("Removed city: ", change.doc.data());
        getCitiesList();
      }
      // }
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribeUser = subscribeUser(({ change, snapshot }) => {
      if (change.type === "added") {
        getUsersList();
      }
      if (change.type === "modified") {
        getUsersList();
        
      }
      if (change.type === "removed") {
        getUsersList();
      }
    });
    
    return () => {
      unsubscribeUser();
    };
  }, []);

  const [cities, setCities] = useState([]);
  const [users, setUsers] = useState([]);
  const [cityToEdit, setCityToEdit] = useState(undefined);

  const [cartt, setCartt] = useState([]);
  console.log("mycart: ",cartt);
  const AddToCart = (id)=>{
    setCartt ((prevCart)=>{

    
      let x = cities.filter((iteem) => iteem.id == id);
      let x2 = [
        x.map((iteem) => (iteem.id)),
        ...prevCart
        ]
        editUser({id:" Lb1OO6KAkbEarIlRq5xl",email:"201927074@std.sci.cu.edu.eg",password:"1927074",money:1,cart:x2,sold:[]});
        return x2;
      })
    }
    const addUserCart = ()=>{
      let car = cartt.map((e)=>(e[0].id));
      return{id:" Lb1OO6KAkbEarIlRq5xl",email:"201927074@std.sci.cu.edu.eg",password:"1927074",money:1,cart:car,sold:[]};
    }
    //editUser(addUserCart());
    
    

  const [selectedValue, setSelectedValue] = useState("bed");

  let dataa = cities.filter((e)=>e.type== selectedValue);
  //const [dataa, setDataa] = useState([]);
  //setDataa = cities.filter((e)=>e.type== selectedValue);

  if(selectedValue == "All"){
    dataa = cities ;
  }


  return (
    <View>

      <Button
        title="cart"
        onPress={() => navigation.navigate('cart', {itemId:cartt} )}
      />
    
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="chair" value="chair" />
        <Picker.Item label="bed" value="bed" />
        <Picker.Item label="sofa" value="sofa" />
      </Picker>
    </View>

      <View
          style={{
            height:550,
          }}>
      <FlatList 
        data={dataa}
        keyExtractor={cities.id}
        renderItem={({item})=>(
          <Pitem navigation={navigation} item = {item} AddToCart={AddToCart} />
          )}
      />
    </View>
  </View>
    
  );
};

export default CitiesList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center"
  }
});