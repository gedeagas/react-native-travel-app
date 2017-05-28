import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	Image,
    Animated,
    Dimensions,
    View,
    Text
} from "react-native";

let { height, width } = Dimensions.get("window");

export default class SideMenu extends Component {
    constructor(props) {
		super(props);
    }

    
	render() {
		return (
			<Animated.View
					style={{
						backgroundColor: "#FFF",
						width: width*0.75,
                        position:'absolute',
                        top:0,
                        left:  this.props.menuWidth,
						height: this.props.height,
						zIndex: 100,
						
					}}
			>
                <View>
                    <View>
                        <Image
						style={[styles.imageHeader]}
						source={require("../Assets/Image/sideheader.jpg")}
					    >

                            <View style={styles.imageOverlay}/>

                        </Image>
                    </View>

                    <View>
                        <View style={{flexDirection: "row", justifyContent:"center"}}>
                            <Image
                            style={[styles.profilePict]}
                            source={require("../Assets/Image/profile.jpg")}
                            />
                        </View>

                        <Text style={styles.nameStyle}>Agastya Darma Laksana</Text>
                        <Text style={styles.bioStyle}>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae</Text>


                    </View>
                   

                </View>



			</Animated.View>
		);
	}
	
}


const styles = StyleSheet.create({
	
    profilePict: {
        width:90,
        height:90,
        marginTop:-45,
        borderRadius:45,
        borderWidth:2,
        borderColor:"#FFF"
        
    },
    nameStyle: {
        fontFamily: "Montserrat-Medium",
        marginTop:5,
		fontSize: 14,
        textAlign:'center',
    },

    bioStyle: {
        fontFamily: "Montserrat-Regular",
        marginTop:5,
        marginLeft:10,
        marginRight:10,
		fontSize: 10,
        color:"#757575",
        textAlign:'center',
    },
    imageHeader: {
        height: height * 0.25,
        width: width*0.75,
        zIndex:900,
        
    },

    imageOverlay: {
        height: height * 0.25,
        width: width*0.75,
        backgroundColor:"rgba(33, 33, 33, 0.5)",
        zIndex:901,
    },
  
	squareGuide: {
		height: 133,
		width: 133,
		marginLeft: 13,
		borderRadius: 5
	}

});