import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, Platform, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { companySelected, updatePosition } from './actions'
import {
	TEATIME_POSSITION,
	WOW_POSSITION,
	KOLIBRI_POSSITION,
	GANGVERK_POSSITION,
	TEATIME,
	WOW,
	KOLIBRI,
	GANGVERK
} from './actions/types'
import Button from './components/Button';


class Home extends Component {

	// spin = this.state.spinValue.interpolate({
	// 	inputRange: [0, 1],
	// 	outputRange: ['0deg', '360deg']
	// })

	componentDidMount() {

	}

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
						duration: 500
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
		// Animated.timing(this.props.anim, {
		// 	toValue: 1,
		// 	duration: 500,
		// 	easing: Easing.quad
		// }).start()
	}

	render() {

		if (this.props.startAnim)
			this.startAnimationFlow()

		return (
			<View style={styles.container}>
				<View style={styles.statusBarBackground} />
				<View style={{ flex: 1, flexDirection: 'column' }}>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<Button type={TEATIME} />
						<Button type={WOW} />
					</View>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<Button type={KOLIBRI} />
						<Button type={GANGVERK} />
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
		position: 'absolute',
		width: 150,
		height: 150,
		backgroundColor: '#00000033',
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center'
	},
	statusBarBackground: {
		height: (Platform.OS === 'ios') ? 20 : 10, //this is just to test if the platform is iOS to give it a height of 20, else, no height (Android apps have their own status bar)
		// height: 20,
		backgroundColor: "white",
	}
});

const mapStateToProps = ({ home }) => {

	const { startAnim, anim, fade } = home;

	return {
		startAnim, anim, fade
	};
};

export default connect(mapStateToProps)(Home);