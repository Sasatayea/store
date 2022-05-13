import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Slideshow from "react-native-image-slider-show";
import { useEffect, useState } from "react";
import { getCities, subscribe } from "../../db/Data/products";

const SlideshowTest = (item) => {
  const data = item.item;

  // for (let i = 0; i < data.length; i++) {
  //     setDataa([...dataa ,{id: data[i].id , size:data[i].liked.length}])
  // }
  // console.log(arr);

  //   console.log(data);
 
  const [position, setposition] = useState(1);
  const [interval, setInterval] = useState(null);

  const [dataSource, setdataSource] = useState([
    {
      title: "Title 1",
      caption: "Caption 1",
      url: "http://placeimg.com/640/480/any",
    },
    {
      title: "Title 2",
      caption: "Caption 2",
      url: "http://placeimg.com/640/480/any",
    },
    {
      title: "Title 3",
      caption: "Caption 3",
      url: "http://placeimg.com/640/480/any",
    },
  ]);

  const componentWillMount = () => ({
    interval: setInterval(() => {
      setState({
        position: position === dataSource.length ? 0 : position + 1,
      });
    }, 2000),
  });
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
    <View>
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

const styles = StyleSheet.create({});
