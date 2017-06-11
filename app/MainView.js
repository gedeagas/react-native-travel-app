import React, { Component } from "react";
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
	ScrollView,
	TouchableOpacity
} from "react-native";
//Import From Node Modules
import { StackNavigator } from "react-navigation";

//Import Component
import Carousel from "./Component/Carousel";
import CardView from "./Component/CardView"
import CarouselPicture from "./Component/CarouselPicture";
import CardImage from "./Component/CardImage";
import SideMenu from "./Component/SideMenu";


let { height, width } = Dimensions.get("window");
let lebarSlider = width;
let lebarItem = 300;

export default class MainView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			searchOpacity: new Animated.Value(0),
			menuWidth: new Animated.Value(-width),
			width: 0,
			height: 0
		};
	}

	static navigationOptions = {
		title: "Welcome",
		header: null
	};
	cumaCobaCoba() {
		Animated.timing(
			// Animate value ov
			this.state.searchOpacity, // The value to drive
			{
				toValue: 1,
				easing: Easing.circle // Animate to final value of 1
			}
		).start();
		this.setState({ width: width, height: height });
	}

	burgerMenuTrigger() {
		Animated.timing(
			// Animate value over time
			this.state.menuWidth, // The value to drive
			{	
				toValue: 0,
				easing: Easing.bounce // Animate to final value of 1
			}
		).start();

	}

	render() {
		return (
			<View style={{backgroundColor: "rgba(255, 255, 255, 0.0)"}}>
				<Animated.View
					style={{
						backgroundColor: "#6A2EC7",
						width: this.state.width,
						height: this.state.height,
						zIndex: 100,
						position:'absolute',
						opacity: this.state.searchOpacity
					}}
				/>				


				<ScrollView style={styles.container} onScroll={this.handleScroll} bounces={false}>
					<StatusBar
						backgroundColor="rgba(107, 47, 198, 0.0)"
						translucent={true}
						barStyle="light-content"
					/>
									<SideMenu menuWidth={this.state.menuWidth} height={height}/>

					<Image
						style={styles.MainMenuContainer}
						source={require("./Assets/Image/home.jpg")}
					>
						

						<View>
							<Text style={styles.MainMenuTitle}>Travelokal</Text>
						</View>

					</Image>

					<TextInput
						placeholder="Search Now..a.a."
						style={styles.TextInputStyle}
						onChangeText={text => this.setState({ text })}
						value={this.state.text}
						onFocus={this.cumaCobaCoba.bind(this)}
						underlineColorAndroid="rgba(0,0,0,0)"
					/>
					<Text>{this.state.coba}</Text>
					<Carousel
						style={styles.carouselContainer}
						ref={carousel => {
							this._carousel = carousel;
						}}
						sliderWidth={lebarSlider}
						itemWidth={lebarItem}
						firstItem={2}
					>
						<CarouselPicture source={require("./Assets/Image/cr1.jpg")}/>
						<CarouselPicture source={require("./Assets/Image/cr2.jpg")}/>
						<CarouselPicture source={require("./Assets/Image/cr3.jpg")}/>
						<CarouselPicture source={require("./Assets/Image/cr1.jpg")}/>
						<CarouselPicture source={require("./Assets/Image/cr2.jpg")}/>
						<CarouselPicture source={require("./Assets/Image/cr3.jpg")}/>
						<CarouselPicture source={require("./Assets/Image/cr1.jpg")}/>

						
					</Carousel>
					<Text style={styles.subTitle}>Places in Bali</Text>

					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						style={styles.squareGuideContainer}
					>
						<CardImage source={require("./Assets/Image/sq4.jpg")}/>
						<CardImage source={require("./Assets/Image/sq2.jpg")}/>
						<CardImage source={require("./Assets/Image/sq3.jpg")}/>
						<CardImage source={require("./Assets/Image/sq1.jpg")}/>

					</ScrollView>

					<Text style={styles.subTitle}>Trending Place</Text>

					<CardView 
					title={"Seminyak Beach Club"}
					price={"399,500"}
					source={require("./Assets/Image/list1.jpg")}
					/>

					<CardView 
					title={"Valka Bali Central Seminyak"}
					price={"399,500"}
					source={require("./Assets/Image/list2.jpg")}
					/>

					<CardView 
					title={"Amana Bali Villas"}
					price={"IDR1,237,769"}
					source={require("./Assets/Image/list3.jpeg")}
					/>
					

				</ScrollView>
			</View>
				
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#F6F6F6"
	},
	MainMenuContainer: {
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "rgba(255, 255, 255, 0.0)",
		paddingTop: 35,
		paddingBottom: 15,
		paddingLeft: 10,
		paddingRight: 10,
		height: height * 0.25,
		width: width,
		zIndex: 10
	},

	MainMenuTitle: {
		color: "#fff",
		fontFamily: "Montserrat",
		fontWeight: "400",
		fontSize: 20,
		zIndex: 10,
		textAlign:'left',

	},
	TextInputStyle: {
		color: "#BDBDBD",
		fontFamily: "Montserrat",
		fontSize: 13,
		paddingLeft: 13,
		paddingRight: 13,
		height: 45,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: "#fff",
		marginTop: -20,
		borderRadius: 20,
		zIndex: 10
	},
	

	subTitle: {
		fontFamily: "Montserrat",
		fontWeight: "500",
		color: "#424242",
		fontSize: 17,
		marginTop: 20,
		marginLeft: 13,
		marginRight: 13,
		backgroundColor: "rgba(255, 255, 255, 0.0)"
	},
	squareGuideContainer: {
		marginTop: 20
	},
	
});

const travelokal = StackNavigator({
	Main: { screen: MainView }
});

AppRegistry.registerComponent("travelokal", () => travelokal);
