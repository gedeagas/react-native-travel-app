import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	Image,
} from "react-native";


export default class CardImage extends Component {
	render() {
		return (
			<Image
			    style={styles.squareGuide}
				source={this.props.source}
			/>
		);
	}
	
}


const styles = StyleSheet.create({
	
	squareGuide: {
		height: 133,
		width: 133,
		marginLeft: 13,
		borderRadius: 5
	}

});

