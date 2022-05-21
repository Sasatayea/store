import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Slideshow from "react-native-image-slider-show";
import { useEffect, useState } from "react";
import { getCities, subscribe } from "../../db/Data/products";

const SlideshowTest = (item) => {
  const data = item.item;
  const arr2 = [...data];
  const sort = (arr) => {
    let arr1 = [];
    arr1 = arr;
    arr1.sort((a, b) => b.liked.length - a.liked.length);
    return arr1;
  };

  const arr = sort(arr2);
  //   console.log("data",arr);
  if (arr.length != 0) {
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
  } else {
    return <Text></Text>;
  }
};

export default SlideshowTest;

const styles = StyleSheet.create({});
