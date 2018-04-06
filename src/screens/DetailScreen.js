import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, Platform, TouchableWithoutFeedback, Dimensions, Animated, Easing } from 'react-native';
import { TEATIME, KOLIBRI, GANGVERK, WOW } from '../actions/types';
import { goToHome, resetView } from '../actions'

class DetailScreen extends Component {

    company = null;

    state = {
        animImageTranslation: new Animated.ValueXY(),
        animInfoBox: new Animated.ValueXY(),
        animCloseButton: new Animated.Value(0),
        screenCenterX: 0,
        screenCenterY: 0
    }

    componentDidMount() {
        this.setState({
            screenCenterX: (Dimensions.get('window').width / 2) - (this.props.elementWidth / 2),
            screenCenterY: (Dimensions.get('window').height / 2) - (this.props.elementHeight * 1.5),
        }, () => {

            Animated.parallel([
                Animated.timing(this.state.animImageTranslation.x, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.back()
                }),
                Animated.timing(this.state.animImageTranslation.y, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.back()
                }),
                Animated.stagger(200, [
                    //Translation
                    Animated.timing(this.state.animInfoBox.x, {
                        toValue: 1,
                        duration: 700,
                        easing: Easing.in(Easing.quad)
                    }),
                    //Fade
                    Animated.timing(this.state.animInfoBox.y, {
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

            //Looksup an elemnt that has all the necessary information
            var active;
            this.props.fetchedData.data.results.forEach(element => {
                if (element.active === 1)
                    active = element
            });
            return (
                <View style={ styles.textLayout }>
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

    //Retracks anims and bavigates back
    startExitFlow() {
        
        //Plays animations in reverse
        Animated.sequence([
            Animated.timing(this.state.animCloseButton, {
                toValue: 0,
                duration: 500,
                easing: Easing.in(Easing.quad)
            }),
            Animated.timing(this.state.animInfoBox.x, {
                toValue: 0,
                duration: 300,
                easing: Easing.in(Easing.quad)
            }),
            Animated.parallel([
                Animated.timing(this.state.animImageTranslation.x, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.in(Easing.quad)
                }),
                Animated.timing(this.state.animImageTranslation.y, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.in(Easing.quad)
                }),
            ])
        ]).start(onComplete = () => {

            //Notifies parent component that we're going back to main view
            this.props.goToHome()
        })

    }

    render() {

        var resultant = this.calculateResultant(this.state.screenCenterX, this.state.screenCenterY, this.props.selectedElemntPositionX, this.props.selectedElemntPositionY)

        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                <Animated.View style={[styles.button, {
                    height: this.props.elementHeight,
                    width: this.props.elementWidth,
                    left: this.props.selectedElemntPositionX,
                    top: this.props.selectedElemntPositionY,
                    transform: [{
                        translateX: this.state.animImageTranslation.x.interpolate({
                            inputRange: [0, 1],
                            outputRange: [this.props.selectedElemntPositionX, resultant.x]
                        })
                    },
                    {
                        translateY: this.state.animImageTranslation.y.interpolate({
                            inputRange: [0, 1],
                            outputRange: [this.props.selectedElemntPositionY, resultant.y]
                        })
                    }]
                }]}>
                    {this.renderButton()}
                </Animated.View>
                <Animated.View style={[styles.button, {
                    height: this.props.elementHeight,
                    width: this.props.elementWidth,
                    opacity: this.state.animInfoBox.x,
                    transform: [{
                        translateY: this.state.animInfoBox.y.interpolate({
                            inputRange: [0, 1],
                            outputRange: [this.state.screenCenterY, this.calculateResultant(this.state.screenCenterX, this.state.screenCenterY + 30, this.state.screenCenterX, this.state.screenCenterY).y]
                        })
                    }]
                }]}>
                    {this.renderDetail()}
                </Animated.View>
                <Animated.View style={[styles.cloaseButton, {
                    transform: [{
                        translateY: this.state.animCloseButton.interpolate({
                            inputRange: [0, 1],
                            outputRange: [Dimensions.get('window').height, 250]
                        })
                    }]
                }]}>
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

    //Calculates the vector to compose a lenar translatioin between two point
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
    cloaseButton: {
        width: 50,
        height: 50,
        backgroundColor: '#00000033',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLayout:{ flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center' }
});

const mapStateToProps = ({ data }) => {

    const { teatime, wow, kolibri, gangverk, selection, elementWidth, elementHeight, fetchedData, fetchedFinished, selectedElemntPositionX, selectedElemntPositionY } = data;

    return {
        teatime, wow, kolibri, gangverk, selection, elementWidth, elementHeight, fetchedData, fetchedFinished, selectedElemntPositionX, selectedElemntPositionY
    };
};

export default connect(mapStateToProps, { goToHome, resetView })(DetailScreen);