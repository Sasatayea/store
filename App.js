import { onAuthStateChanged } from "firebase/auth";
import CitiesList from "./Components/Cities/CitiesList";
import EditCity from "./Components/Cities/EditCity";



import imm from "./assets/icon.png";
import { auth } from "./db/Config";
import { useState, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, Button ,Image } from "react-native";
import Login from "./Components/Users/Login";
import Register from "./Components/Users/Register";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import cart from "./Components/Cart/cart";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// import Cities from "./Components/Cities/Cities";
// import GuessMyNumber from "./Components/GuessMyNumber";
import fpage from './Components/Cities/fpage';
import product from './Components/items/product';

function Root() {
  return (
    <Stack.Navigator >

    </Stack.Navigator>
  );
}
export default function App({navigation}) {

  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));
    return () => {
      unsub();
    };
  }, []);
  
  const [user, setUser] = useState(undefined);

      // user ? <CitiesList /> : <Register/>

      if(user){
            return (
            <NavigationContainer>
              
            <Stack.Navigator >
              <Stack.Screen name="Home Page"   component={CitiesList}
                options={{
                  headerStyle: {
                    backgroundColor: '#0F5959',
                  },
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerRight: () => (
                      <Button
                      onPress={() => navigation.navigate('cart')}
                      title="cart"
                    /> 
                    // <Img source={imm}  />
                  ),
                }}
              />
              <Stack.Screen name="EditCity" component={EditCity} />
              <Stack.Screen name="product" component={product} />
              <Stack.Screen name="cart" component={cart} />
              

            </Stack.Navigator>
          </NavigationContainer>
              // <CitiesList /> 
              )
      }else{ 
        return(
          <NavigationContainer>
            <Stack.Navigator initialRouteName="fpage" >
              <Stack.Screen name="fpage" component={fpage} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
            
          </NavigationContainer>
            //<fpage />
        )}
      
}
const styles = StyleSheet.create({});