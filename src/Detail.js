import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, Platform, TouchableWithoutFeedback, Dimensions, Animated, Easing } from 'react-native';
import { TEATIME, KOLIBRI, GANGVERK, WOW } from './actions/types';
import { goToHome, resetView } from './actions'
import Button from './components/Button';

class Detail extends Component {

    company = null;

    state = {
        anim: new Animated.ValueXY(),
        animInfo: new Animated.ValueXY(),
        animCloseButton: new Animated.Value(0),
        screenCenterX: 0,
        screenCenterY: 0
    }

    componentDidMount() {
        this.setState({
            screenCenterX: (Dimensions.get('window').width / 2) - (this.props.buttonWidth / 2),
            screenCenterY: (Dimensions.get('window').height / 2) - (this.props.buttonHeight * 1.5),
        }, () => {

            Animated.parallel([
                Animated.timing(this.state.anim.x, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.in(Easing.quad)
                }),
                Animated.timing(this.state.anim.y, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.in(Easing.quad)
                }),
                Animated.stagger(200, [
                    //Translation
                    Animated.timing(this.state.animInfo.x, {
                        toValue: 1,
                        duration: 700,
                        easing: Easing.in(Easing.quad)
                    }),
                    //Fade
                    Animated.timing(this.state.animInfo.y, {
                        toValue: 1,
                        duration: 700,
                        easing: Easing.in(Easing.quad)
                    }),
                ]),
            ]).start(onComplete = () => {
                console.log('Finished')
                Animated.sequence([
                    Animated.delay(1500),
                    Animated.timing(this.state.animCloseButton, {
                        toValue: 1,
                        duration: 500,
                        easing: Easing.out(Easing.quad)
                    })
                ]).start()
            });

        })
    }

    renderButton() {

        switch (this.props.selection) {
            case TEATIME:
                this.company = this.props.teatime
                break;
            case WOW:
                this.company = this.props.wow
                break;
            case KOLIBRI:
                this.company = this.props.kolibri
                break;
            case GANGVERK:
                this.company = this.props.gangverk
                break;
        }

        if (this.props.selection)
            return (
                <TouchableWithoutFeedback >
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center', flex: 1, flexDirection: 'column'
                    }}>
                        <Image style={{ flex: 1 }} source={this.company.image} resizeMode="contain" />
                        <Text style={{ fontSize: 13, marginBottom: 10, color: '#00000066', textAlign: 'center' }}>
                            {this.company.name}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            )

        return <View />
    }

    renderDetail() {
        if (this.props.fetchedFinished) {

            var active;
            this.props.fetchedData.data.results.forEach(element => {
                if (element.active === 1)
                    active = element
            });

            console.log('RGBA',this.company.rgba)

            return (
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: this.company.color, fontSize: 13, fontWeight: 'bold' }}>
                        {active.sn}
                    </Text>
                    <Text style={{ color: '#00000066', fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>
                        {active.address}
                    </Text>
                </View>
            )
        }

        return (
            <Animated.Text>
                No data fetched :(
            </Animated.Text>
        )
    }

    startExitFlow() {
        // opacity: this.state.animInfo.x
        Animated.sequence([
            Animated.timing(this.state.animCloseButton, {
                toValue: 0,
                duration: 500,
                easing: Easing.in(Easing.quad)
            }),
            Animated.timing(this.state.animInfo.x, {
                toValue: 0,
                duration: 400,
                easing: Easing.in(Easing.quad)
            }),
            Animated.parallel([
                Animated.timing(this.state.anim.x, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.in(Easing.quad)
                }),
                Animated.timing(this.state.anim.y, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.in(Easing.quad)
                }),
            ])
        ]).start(onComplete = () => {
            this.props.goToHome()
            // this.props.resetView()
        })

    }

    render() {

        var resultant = this.calculateResultant(this.state.screenCenterX, this.state.screenCenterY, this.props.centerX, this.props.centerY)

        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                <Animated.View style={[styles.button, {
                    height: this.props.buttonHeight,
                    width: this.props.buttonWidth,
                    left: this.props.centerX,
                    top: this.props.centerY,
                    transform: [{
                        translateX: this.state.anim.x.interpolate({
                            inputRange: [0, 1],
                            outputRange: [this.props.centerX, resultant.x]
                        })
                    },
                    {
                        translateY: this.state.anim.y.interpolate({
                            inputRange: [0, 1],
                            outputRange: [this.props.centerY, resultant.y]
                        })
                    }]
                }]}>
                    {this.renderButton()}
                </Animated.View>
                <Animated.View style={[styles.button, {
                    height: this.props.buttonHeight,
                    width: this.props.buttonWidth,
                    opacity: this.state.animInfo.x,
                    transform: [{
                        translateY: this.state.animInfo.y.interpolate({
                            inputRange: [0, 1],
                            outputRange: [this.state.screenCenterY, this.calculateResultant(this.state.screenCenterX, this.state.screenCenterY + 30, this.state.screenCenterX, this.state.screenCenterY).y]
                        })
                    }]
                }]}>
                    {this.renderDetail()}
                </Animated.View>
                <Animated.View style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#00000033',
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{
                        translateY: this.state.animCloseButton.interpolate({
                            inputRange: [0, 1],
                            outputRange: [Dimensions.get('window').height, 250]
                        })
                    }]
                }}>
                    <TouchableWithoutFeedback onPress={this.startExitFlow.bind(this)}>
                        <View>
                            <Text>
                                X
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </View>
        )
    }

    calculateResultant(Px, Py, Qx, Qy) {
        return { x: Px - Qx, y: Py - Qy }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: '#000',
        backgroundColor: '#FFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    statusBarBackground: {
        //height: (Platform.OS === 'ios') ? 20 : 10, //this is just to test if the platform is iOS to give it a height of 20, else, no height (Android apps have their own status bar)
        height: 20,
        backgroundColor: "white",
    }
});

const mapStateToProps = ({ data }) => {

    const { teatime, wow, kolibri, gangverk, selection, buttonWidth, buttonHeight, fetchedData, fetchedFinished, centerX, centerY } = data;

    return {
        teatime, wow, kolibri, gangverk, selection, buttonWidth, buttonHeight, fetchedData, fetchedFinished, centerX, centerY
    };
};

export default connect(mapStateToProps, { goToHome, resetView })(Detail);