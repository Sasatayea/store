import { onAuthStateChanged } from "firebase/auth";
import CitiesList from "./Components/Cities/CitiesList";
import { auth } from "./db/Config";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import Login from "./Components/Users/Login";
import Register from "./Components/Users/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import cart from "./Components/cart/cart";
import { getAuth } from "firebase/auth";
import Admin from "./Components/Admin/Admin";
import EditP from "./Components/Admin/EditP";
import Edit from "./Components/Admin/Edit";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import fpage from "./Components/Cities/fpage";
import product from "./Components/items/product";
import profile from "./Components/Cities/profile";
import search from "./Components/Cities/search";
import AddP from "./Components/Admin/AddP";

export default function App({ navigation }) {
  const auth = getAuth();
  const userr = auth.currentUser;
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));
    return () => {
      unsub();
    };
  }, []);

  const [user, setUser] = useState(undefined);

  console.log(user);
  if (user) {
    const email = userr.email;
    if (email == "sheeka@gamil.com") {
      console.log("app", email);
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Admin" component={Admin} options={{}} />
            <Stack.Screen name="EditP" component={EditP} options={{}} />
            <Stack.Screen name="AddP" component={AddP} options={{}} />
            <Stack.Screen name="Edit" component={Edit} options={{}} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={CitiesList}
              options={{
                tabBarIcon: () => (
                  <Image
                    source={require("./assets/home.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Search"
              component={search}
              options={{
                tabBarIcon: () => (
                  <Image
                    source={require("./assets/search.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Cart"
              component={cart}
              options={{
                tabBarIcon: () => (
                  <Image
                    source={require("./assets/shopping-cart.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={profile}
              options={{
                tabBarIcon: () => (
                  <Image
                    source={require("./assets/user (1).png")}
                    style={{ width: 20, height: 20 }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="product"
              component={product}
              options={{ tabBarButton: () => null, tabBarVisible: false }}
            />
            <Tab.Screen
              name="fpage"
              component={fpage}
              options={{ tabBarButton: () => null, tabBarVisible: false }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="fpage"
            component={fpage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTransparent: true,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerTransparent: true,
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      //<fpage />
    );
  }
}
const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "red",
  },
});
