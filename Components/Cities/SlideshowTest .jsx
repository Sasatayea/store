import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slideshow from 'react-native-image-slider-show';
import { useEffect, useState } from "react";

const SlideshowTest  = () => {

    const [position, setposition] = useState(1);
    const [interval, setInterval] = useState(null);

    const [dataSource, setdataSource] = useState(
        [
            {
            title: 'Title 1',
            caption: 'Caption 1',
            url: 'http://placeimg.com/640/480/any',
            }, {
            title: 'Title 2',
            caption: 'Caption 2',
            url: 'http://placeimg.com/640/480/any',
            }, {
            title: 'Title 3',
            caption: 'Caption 3',
            url: 'http://placeimg.com/640/480/any',
            },
        ]
    );

    const componentWillMount =()=> ({
        interval: setInterval(() => {
            setState({
                position: position === dataSource.length ? 0 : position + 1
            });
        }, 2000)
    });
    
    return (
    <Slideshow 
        dataSource={[
        { url:'https://75324b7afe1a238e9728-48cce035978395103897a6b442a94265.lmsin.net/162778494-162778494-HC01112020_01-345.jpg?v=1' },
        { url:'https://75324b7afe1a238e9728-48cce035978395103897a6b442a94265.lmsin.net/163664058-163664058-HC30092021_01-345.jpg?v=2' },
        { url:'https://75324b7afe1a238e9728-48cce035978395103897a6b442a94265.lmsin.net/164074812-164074812-HC03022022_01-345.jpeg' }
    ]}/>
//     <Slideshow 
//         dataSource={dataSource}
//         position={position}
//         onPositionChanged={position => setState({ position })} />
    )
}

export default SlideshowTest 

const styles = StyleSheet.create({})