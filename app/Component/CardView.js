import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	
} from "react-native";

let { height, width } = Dimensions.get("window");

export default class CardView extends Component {
    render() {
		return (
            <View style={styles.postListing}>
				<Image
					style={styles.postListingImage}
					source={this.props.source}
				/>
				<View style={styles.postListingBottomContainer}>
					<Text style={styles.postListingTitle}>
							{this.props.title}
					</Text>
					<Text style={styles.postListingPrice}>{this.props.price}</Text>
				</View>
			</View>
        );
	}
}

const styles = StyleSheet.create({
	
	postListing: {
		marginTop: 18,
		backgroundColor: "#fff",
		marginLeft: 13,
		marginRight: 13,
		borderRadius: 6
	},
	postListingImage: {
		height: 154,
		width: width - 26,
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6
	},
	postListingTitle: {
		fontFamily: "Montserrat",
		fontWeight: "500",
		color: "#212121",
		fontSize: 15
	},
	postListingPrice: {
		fontFamily: "Montserrat",
		fontWeight: "500",
		color: "#424242",
		fontSize: 13
	},
	postListingBottomContainer: {
		padding: 10
	},


});
