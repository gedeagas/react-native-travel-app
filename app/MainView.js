/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  Animated,
  Easing,
  ScrollView
} from 'react-native';
//Import From Node Modules
import { StackNavigator } from 'react-navigation';

//Import Component 
import Carousel from './Component/Carousel'



let {height, width} = Dimensions.get('window');
let lebarSlider = width;
let lebarItem = 300;


export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: '', 
      searchOpacity: new Animated.Value(0),
      width: 0,
      height: 0,
    };
  }
  
  static navigationOptions = {
    title: 'Welcome',
    header: null
  };
  cumaCobaCoba(){
    Animated.timing(                            // Animate value over time
      this.state.searchOpacity,                      // The value to drive
      {
        toValue: 1,
        easing: Easing.circle                             // Animate to final value of 1
      }
    ).start(); 
    this.setState({width: width, height: height})       
  }

  
  render() {
    return (
      <ScrollView style={styles.container} onScroll={this.handleScroll}>
        
        <StatusBar
          backgroundColor="rgba(107, 47, 198, 0.0)"
          translucent={true}
          barStyle="light-content"
        />
        <Animated.View style={{
          backgroundColor:'#6A2EC7',
          width:this.state.width,
          height:this.state.height,
          zIndex:100,
          opacity: this.state.searchOpacity,
        }}></Animated.View >
        <Image style={styles.MainMenuContainer}  source={require('./Assets/Image/home.jpg')}> 
          <Text></Text>
          <Text style={styles.MainMenuTitle}>Travelokal</Text>
          <Text></Text>

        </Image>
        
        <TextInput
          placeholder="Search Now..."
          style={styles.TextInputStyle}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          onFocus={this.cumaCobaCoba.bind(this)}
          underlineColorAndroid='rgba(0,0,0,0)'
        />
        <Text>{this.state.coba}</Text>
        <Carousel
              style={styles.carouselContainer}
              ref={(carousel) => { this._carousel = carousel; }}
              sliderWidth={lebarSlider}
              itemWidth={lebarItem}
              firstItem={2}
        >
                <Image style={styles.CarouselItemStyle} source={require('./Assets/Image/cr2.jpg')}>
               </Image>

               <Image style={styles.CarouselItemStyle} source={require('./Assets/Image/cr1.jpg')}>
               </Image>

               <Image style={styles.CarouselItemStyle} source={require('./Assets/Image/cr3.jpg')}>
               </Image>

               <Image style={styles.CarouselItemStyle} source={require('./Assets/Image/cr2.jpg')}>
               </Image>

               <Image style={styles.CarouselItemStyle} source={require('./Assets/Image/cr1.jpg')}>
               </Image>
               <Image style={styles.CarouselItemStyle} source={require('./Assets/Image/cr3.jpg')}>
               </Image>
        </Carousel>
        <Text style={styles.subTitle}>Places in Bali</Text>

        <ScrollView  
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.squareGuideContainer}>
          <Image style={styles.squareGuide} source={require('./Assets/Image/sq4.jpg')}>
          </Image>

          <Image style={styles.squareGuide} source={require('./Assets/Image/sq2.jpg')}>
          </Image>

          <Image style={styles.squareGuide} source={require('./Assets/Image/sq3.jpg')}>
          </Image>

          <Image style={styles.squareGuide} source={require('./Assets/Image/sq1.jpg')}>
          </Image>
        </ScrollView>

        <Text style={styles.subTitle}>Trending Place</Text>

        <View style={styles.postListing}>
          <Image style={styles.postListingImage} source={require('./Assets/Image/list1.jpg')}></Image>
          <View style={styles.postListingBottomContainer}>
            <Text style={styles.postListingTitle}>Valka Bali Central Seminyak</Text>
            <Text style={styles.postListingPrice}>IDR399,734</Text>
          </View>
        </View>

        <View style={styles.postListing}>
          <Image style={styles.postListingImage} source={require('./Assets/Image/list2.jpg')}></Image>
          <View style={styles.postListingBottomContainer}>
            <Text style={styles.postListingTitle}>Valka Bali Central Seminyak</Text>
            <Text style={styles.postListingPrice}>IDR399,734</Text>
          </View>
        </View>

        <View style={styles.postListing}>
          <Image style={styles.postListingImage} source={require('./Assets/Image/list3.jpeg')}></Image>
          <View style={styles.postListingBottomContainer}>
            <Text style={styles.postListingTitle}>Amana Bali Villas</Text>
            <Text style={styles.postListingPrice}>IDR1,237,769</Text>
          </View>
        </View>


        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
  },
  MainMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    paddingTop:35,
    paddingBottom:15,
    paddingLeft:10,
    paddingRight:10,
    height: height*0.25,
    width: width,
    zIndex:10,

  },

  MainMenuTitle: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 20,
        zIndex:10,

  },
  TextInputStyle: {
    color:'#BDBDBD',
    fontFamily: 'Montserrat',
    fontSize: 13,
    paddingLeft:13,
    paddingRight:13,
    height:45,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'#fff',
    marginTop: -20,
    borderRadius:20,
    zIndex:10,

  },
  CarouselItemStyle: {
    width: 300,
    height: 185,
    borderRadius: 5,
        marginTop: 25,

  },
  postListing: {
    marginTop:18,
    backgroundColor: '#fff',
    marginLeft: 13,
    marginRight:13,
    borderRadius:6,

  },
  postListingImage: {
    height:154,
    width:width-26,
    borderTopLeftRadius:6,
    borderTopRightRadius:6,

  },
  postListingTitle: {
    fontFamily: 'Montserrat',
    fontWeight:'500',
    color:'#212121',
    fontSize: 15,
  },
  postListingPrice: {
    fontFamily: 'Montserrat',
    fontWeight:'500',
    color:'#424242',
    fontSize: 15,
  },
  postListingBottomContainer:{
    padding:10
  },

  subTitle: {
    fontFamily: 'Montserrat',
    fontWeight:'500',
    color:'#424242',
    fontSize: 17,
    marginTop:20,
    marginLeft: 13,
    marginRight:13,
        backgroundColor: 'rgba(255, 255, 255, 0.0)',

  },
  squareGuideContainer: {
    marginTop:20,
  },
  squareGuide: {
    height:133,
    width:133,
    marginLeft: 13,
    borderRadius:5,

  }
 
});

const travelokal = StackNavigator({
  Main: { screen: MainView },
});

AppRegistry.registerComponent('travelokal', () => travelokal);
