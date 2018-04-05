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

	state = {
		spinValue: new Animated.Value(0),
		bX: new Animated.Value(0),
		bY: new Animated.Value(0),
		tea: {
			position: new Animated.ValueXY(0, 0),
			targetX: 0,
			targetY: 0,
			z: 10
		},
		wow: {
			position: new Animated.ValueXY(0, 0),
			targetX: 0,
			targetY: 0,
			z: 10
		},
		kol: {
			position: new Animated.ValueXY(0, 0),
			targetX: 0,
			targetY: 0,
			z: 10
		},
		gan: {
			position: new Animated.ValueXY(0, 0),
			targetX: 0,
			targetY: 0,
			z: 10
		},
		cardWidth: 0,
		cardHeight: 0
	}

	spin = this.state.spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg']
	})

	tX = this.state.bX.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -200]
		// outputRange: [this.props.companies.wow.possition.x, this.props.companies.teatime.possition.x]
	})

	componentDidMount() {

	}

	componentWillReceiveProps(np, nc) {
		// tX = this.state.bX.interpolate({
		// 	inputRange: [0, 1],
		// 	outputRange: [205, 10]
		// 	// outputRange: [this.props.companies.wow.possition.x, this.props.companies.teatime.possition.x]
		// })
	}

	animButtons(item) {

		// this.refs.button.measure((ox, oy, width, height, px, py) => {
		// 	console.log("ox: " + ox);
		// 	console.log("oy: " + oy);
		// 	console.log("width: " + width);
		// 	console.log("height: " + height);
		// 	console.log("px: " + px);
		// 	console.log("py: " + py);
		//   });

		// console.log(item)

		animationFlow = () => {
			Animated.parallel([
				Animated.timing(this.state.tea.position.x, {
					toValue: 1,
					duration: 1000,
					easing: Easing.in(Easing.quad)
				}),
				Animated.timing(this.state.tea.position.y, {
					toValue: 1,
					duration: 1000,
					easing: Easing.ease
				}),
				Animated.timing(this.state.wow.position.x, {
					toValue: 1,
					duration: 1000,
					easing: Easing.ease
				}),
				Animated.timing(this.state.wow.position.y, {
					toValue: 1,
					duration: 1000,
					easing: Easing.ease
				}),
				Animated.timing(this.state.kol.position.x, {
					toValue: 1,
					duration: 1000,
					easing: Easing.ease
				}),
				Animated.timing(this.state.kol.position.y, {
					toValue: 1,
					duration: 1000,
					easing: Easing.ease
				}),
				Animated.timing(this.state.gan.position.x, {
					toValue: 1,
					duration: 1000,
					easing: Easing.ease
				}),
				Animated.timing(this.state.gan.position.y, {
					toValue: 1,
					duration: 1000,
					easing: Easing.ease
				})
			]).start();
		}

		switch (item) {
			case 'TEATIME':
				console.log('ins')
				this.setState({
					tea: {
						position: new Animated.ValueXY(0, 0),
						targetX: 0,
						targetY: 0,
						z: 11
					},
					wow: {
						position: new Animated.ValueXY(0, 0),
						targetX: -this.state.width - 20,
						targetY: 0,
						z: 10
					},
					kol: {
						position: new Animated.ValueXY(0, 0),
						targetX: 0,
						targetY: -this.state.height - 20,
						z: 10
					},
					gan: {
						position: new Animated.ValueXY(0, 0),
						targetX: -this.state.width - 20,
						targetY: -this.state.height - 20,
						z: 10
					},
				}, () => {
					animationFlow()
				})
				break;
			case 'WOW':
				this.setState({
					tea: {
						position: new Animated.ValueXY(0, 0),
						targetX: this.state.width + 20,
						targetY: 0,
						z: 10
					},
					wow: {
						position: new Animated.ValueXY(0, 0),
						targetX: 0,
						targetY: 0,
						z: 11
					},
					kol: {
						position: new Animated.ValueXY(0, 0),
						targetX: this.state.width + 20,
						targetY: -this.state.height - 20,
						z: 10
					},
					gan: {
						position: new Animated.ValueXY(0, 0),
						targetX: 0,
						targetY: -this.state.height - 20,
						z: 10
					},
				}, () => {
					animationFlow()
				})
				break;
			case 'KOLIBRI':
				this.setState({
					tea: {
						position: new Animated.ValueXY(0, 0),
						targetX: 0,
						targetY: this.state.height + 20,
						z: 10
					},
					wow: {
						position: new Animated.ValueXY(0, 0),
						targetX: -this.state.width - 20,
						targetY: this.state.height + 20,
						z: 10
					},
					kol: {
						position: new Animated.ValueXY(0, 0),
						targetX: 0,
						targetY: 0,
						z: 11
					},
					gan: {
						position: new Animated.ValueXY(0, 0),
						targetX: -this.state.width - 20,
						targetY: 0,
						z: 10
					},
				}, () => {
					animationFlow()
				})
				break;
			case 'GANGVERK':
				this.setState({
					tea: {
						position: new Animated.ValueXY(0, 0),
						targetX: this.state.width + 20,
						targetY: this.state.height + 20,
						z: 10
					},
					wow: {
						position: new Animated.ValueXY(0, 0),
						targetX: 0,
						targetY: this.state.height + 20,
						z: 10
					},
					kol: {
						position: new Animated.ValueXY(0, 0),
						targetX: this.state.width + 20,
						targetY: 0,
						z: 10
					},
					gan: {
						position: new Animated.ValueXY(0, 0),
						targetX: 0,
						targetY: 0,
						z: 11
					},
				}, () => {
					animationFlow()
				})
				break;
		}

	}

	onLayout = (e) => {
		this.setState({
			width: e.nativeEvent.layout.width,
			height: e.nativeEvent.layout.height,
			x: e.nativeEvent.layout.x,
			y: e.nativeEvent.layout.y
		}, () => {
			console.log(this.state.width)
			console.log(this.state.height)
		})
	}

	// ref="Marker"
	// onLayout={this.measure}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.statusBarBackground} />
				<View style={{ flex: 1, flexDirection: 'column' }}>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<Animated.View onLayout={this.onLayout} style={[styles.button, {
							elevation: this.state.tea.z, margin: 10, transform: [{
								translateX: this.state.tea.position.x.interpolate({
									inputRange: [0, 1],
									outputRange: [0, this.state.tea.targetX]
								})
							}, {
								translateY: this.state.tea.position.y.interpolate({
									inputRange: [0, 1],
									outputRange: [0, this.state.tea.targetY]
								}),
							}]
						}]}>
							<TouchableWithoutFeedback onPress={this.animButtons.bind(this, 'TEATIME')}>
								<View style={{
									alignItems: 'center',
									justifyContent: 'center', flex: 1, flexDirection: 'column'
								}}>
									<Image style={{ flex: 1 }} source={require('./assets/teatime.png')} resizeMode="contain" />
									<Text style={{ fontSize: 12, marginBottom: 10, color: '#00000066' }}>
										TEATIME
									</Text>
								</View>
							</TouchableWithoutFeedback>
						</Animated.View>
						<Animated.View style={[styles.button, {
							elevation: this.state.wow.z, margin: 10, transform: [{
								translateX: this.state.wow.position.x.interpolate({
									inputRange: [0, 1],
									outputRange: [0, this.state.wow.targetX]
								})
							}, {
								translateY: this.state.wow.position.y.interpolate({
									inputRange: [0, 1],
									outputRange: [0, this.state.wow.targetY]
								}),
							}]
						}]}>
							<TouchableWithoutFeedback onPress={this.animButtons.bind(this, 'WOW')}>
								<View ref="teatime" onLayout={this.measureTeatime} style={{
									alignItems: 'center',
									justifyContent: 'center', flex: 1, flexDirection: 'column'
								}}>
									<Image style={{ flex: 1 }} source={require('./assets/wow.png')} resizeMode="contain" />
									<Text style={{ fontSize: 12, marginBottom: 10, color: '#00000066' }}>
										WOW
									</Text>
								</View>
							</TouchableWithoutFeedback>
						</Animated.View>
					</View>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<Animated.View style={[styles.button, {
							elevation: this.state.kol.z, margin: 10, transform: [{
								translateX: this.state.kol.position.x.interpolate({
									inputRange: [0, 1],
									outputRange: [0, this.state.kol.targetX]
								})
							}, {
								translateY: this.state.kol.position.y.interpolate({
									inputRange: [0, 1],
									outputRange: [0, this.state.kol.targetY]
								}),
							}]
						}]} >
							<TouchableWithoutFeedback onPress={this.animButtons.bind(this, 'KOLIBRI')}>
								<View style={{
									alignItems: 'center',
									justifyContent: 'center', flex: 1, flexDirection: 'column'
								}}>
									<Image style={{ flex: 1 }} source={require('./assets/kolibri.png')} resizeMode="contain" />
									<Text style={{ fontSize: 12, marginBottom: 10, color: '#00000066' }}>
										KOLIBRI
									</Text>
								</View>
							</TouchableWithoutFeedback>
						</Animated.View>
						<Animated.View style={[styles.button, {
							elevation: this.state.gan.z, margin: 10, transform: [{
								translateX: this.state.gan.position.x.interpolate({
									inputRange: [0, 1],
									outputRange: [0, this.state.gan.targetX]
								})
							}, {
								translateY: this.state.gan.position.y.interpolate({
									inputRange: [0, 1],
									outputRange: [0, this.state.gan.targetY]
								}),
							}]
						}]} >
							<TouchableWithoutFeedback onPress={this.animButtons.bind(this, 'GANGVERK')}>
								<View style={{
									alignItems: 'center',
									justifyContent: 'center', flex: 1, flexDirection: 'column'
								}}>
									<Image style={{ flex: 1 }} source={require('./assets/gangverk.png')} resizeMode="contain" />
									<Text style={{ fontSize: 12, marginBottom: 10, color: '#00000066' }}>
										GANGVERK
									</Text>
								</View>
							</TouchableWithoutFeedback>
						</Animated.View>
					</View>
				</View>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
					<View style={{ width: 150, height: 150, backgroundColor: '#00000033', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ color: '#FFFFFF' }}>
							FYRIRTÆKJASKRÁ
						</Text>
					</View>
					<Button COMPANY={TEATIME}/>
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
	button: {
		flex: 1,
		margin: 10,
		borderRadius: 5,
		shadowColor: '#000',
		backgroundColor: '#FFF',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 10,
	},
	statusBarBackground: {
		height: (Platform.OS === 'ios') ? 20 : 10, //this is just to test if the platform is iOS to give it a height of 20, else, no height (Android apps have their own status bar)
		// height: 20,
		backgroundColor: "white",
	}
});

const mapStateToProps = ({ selection }) => {

	const { companies } = selection;

	return {
		companies
	};
};

export default connect(mapStateToProps, { companySelected, updatePosition })(Home);