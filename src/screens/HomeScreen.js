import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, Platform, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { companySelected, updatePosition, saveSelectionPosition, resetView, finishReverseFlow } from '../actions'
import {
	TEATIME_POSSITION,
	WOW_POSSITION,
	KOLIBRI_POSSITION,
	GANGVERK_POSSITION,
	TEATIME,
	WOW,
	KOLIBRI,
	GANGVERK
} from '../actions/types'
import CompanyComponent from '../components/CompanyComponent';


class HomeScreen extends Component {

	startAnimationFlow() {
		Animated.sequence([
			Animated.timing(
				this.props.anim,
				{
					toValue: 1.2,
					duration: 500,
				}

			),
			Animated.stagger(100, [
				Animated.timing(
					this.props.anim,
					{
						toValue: 0.0,
						duration: 500,
					}

				),
				Animated.timing(
					this.props.fade,
					{
						toValue: 0,
						duration: 200,
					}
				)
			])
		]).start()

	}

	render() {

		if (this.props.shouldReverse) {

			//Resets the neccesary variables in Redux to start the flow anew
			this.props.resetView();

			//Updates the neceesary variables that control de reversal of animations
			this.props.finishReverseFlow()

			//Anims the 'FYRIRTÆKJASKRÁ' back
			Animated.parallel([
				Animated.timing(
					this.props.fade,
					{
						toValue: 1,
						duration: 200,
					}
				),
				Animated.timing(
					this.props.anim,
					{
						toValue: 1,
						duration: 500,
					}

				),
			]).start()
		}

		if (this.props.startAnim)
			this.startAnimationFlow()

		return (
			<View style={styles.container}>
				<View style={styles.statusBarBackground} />
				<View style={{ flex: 1, flexDirection: 'column', marginTop: 10 }}>
					<View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10 }}>
						<CompanyComponent type={TEATIME} />
						<CompanyComponent type={WOW} />
					</View>
					<View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10 }}>
						<CompanyComponent type={KOLIBRI} />
						<CompanyComponent type={GANGVERK} />
					</View>
				</View>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
					<Animated.View style={[styles.circleView, {
						transform: [{ scale: this.props.anim }], opacity: this.props.fade
					}]}>
						<Text style={{ color: '#FFFFFF' }}>
							FYRIRTÆKJASKRÁ
						</Text>
					</Animated.View>
				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	circleView: {
		width: 150,
		height: 150,
		backgroundColor: '#00000033',
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center'
	},
	statusBarBackground: {
		height: (Platform.OS === 'ios') ? 20 : 0,
		backgroundColor: "white",
	}
});

const mapStateToProps = ({ home, data }) => {

	const { startAnim, anim, fade, shouldReverse } = home;

	return {
		startAnim, anim, fade, shouldReverse
	};
};

export default connect(mapStateToProps, { saveSelectionPosition, resetView, finishReverseFlow })(HomeScreen);