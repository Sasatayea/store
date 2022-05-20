import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Slideshow from "react-native-image-slider-show";
import { useEffect, useState } from "react";
import { getCities, subscribe } from "../../db/Data/products";

const SlideshowTest = (item) => {
  const data = item.item; 
  const [position, setposition] = useState(1);
  const [interval, setInterval] = useState(null);

  

  
  //   console.log("sssssssss", x);
  const sort = (arr) => {
    let arr1 = [];
    arr1 = arr;
    arr1.sort((a, b) => b.liked.length - a.liked.length);
    return arr1;
  };
  
  const arr = sort(data);
//   console.log("data",arr);
  if(arr.length!=0){
//    console.log("image",arr[0].image);
   return (
    <View >
      <Slideshow 
      
        dataSource={[
          {
            url: arr[0].image,
          },
          {
            url: arr[1].image,
          },
          {
            url: arr[2].image,
          },
        ]}
      /> 
    </View>
  );
}else{
    return(<Text></Text>);
}
  
  
};

export default SlideshowTest;

const styles = StyleSheet.create({
  
});
