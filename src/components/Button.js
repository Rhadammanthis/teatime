import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, Animated, TouchableWithoutFeedback, Easing } from 'react-native';
import { getCompanyData, updateTargetCoordinates, setSelectedButton, startHomeButtonAnim } from '../actions'
import { TEATIME, KOLIBRI, GANGVERK, WOW } from '../actions/types';

class Button extends Component {

    company = null;

    componentDidMount() {
        this.props.getCompanyData(this.props.type)
    }

    onLayout = (e) => {
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        })
    }

    onClick() {
        this.props.setSelectedButton(this.props.type)
        this.props.updateTargetCoordinates(this.props.type, this.state.width, this.state.height)
    }

    initAnimationFlow() {

        console.log('Selected', this.props.selection)

        this.props.startHomeButtonAnim();

        Animated.parallel([
            Animated.timing(this.company.anim.x, {
                toValue: 1,
                duration: 900,
                easing: Easing.in(Easing.quad)
            }),
            Animated.timing(this.company.anim.y, {
                toValue: 1,
                duration: 900,
                easing: Easing.in(Easing.quad)
            }),
            Animated.timing(this.company.extraAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.circle)
            }),
        ]).start(() => {

        });

        Animated.sequence([
            Animated.timing(
                this.props.scale, {
                    toValue: 1.1,
                    duration: 600
                }
            ),
            Animated.stagger(100, [
                Animated.timing(
                    this.props.scale, {
                        toValue: 1.0,
                        duration: 500
                    }
                )
            ])
        ]).start()

        console.log("User Selection: ", this.props.selection)
        console.log("Component Type: ", this.props.type)

    }

    render() {

        switch (this.props.type) {
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

        if (this.company !== null) {

            if (this.props.coordsUpdated) {
                this.initAnimationFlow()
            }

            return (
                <Animated.View onLayout={this.onLayout} style={[styles.button, {
                    elevation: this.company.z, margin: 10,
                    transform: [
                        {
                            translateX: this.company.anim.x.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, this.company.finalX]
                            })
                        }, {
                            translateY: this.company.anim.y.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, this.company.finalY]
                            })
                        },
                        this.props.selection !== this.props.type ?
                            {
                                scale: this.company.extraAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0.65]
                                })
                            }
                            :
                            {
                                scale: this.props.scale
                            }
                    ]
                }]}>
                    <TouchableWithoutFeedback onPress={this.onClick.bind(this)}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center', flex: 1, flexDirection: 'column'
                        }}>
                            <Image style={{ flex: 1 }} source={this.company.image} resizeMode="contain" />
                            <Text style={{ fontSize: 12, marginBottom: 10, color: '#00000066' }}>
                                {this.company.name}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            )
        }

        return (
            <View />
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffff00'
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
});

const mapStateToProps = ({ data }) => {

    const { teatime, wow, kolibri, gangverk, company, coordsUpdated, selection, scale } = data;

    return {
        teatime, wow, kolibri, gangverk, company, coordsUpdated, selection, scale
    };
};

export default connect(mapStateToProps, { getCompanyData, updateTargetCoordinates, setSelectedButton, startHomeButtonAnim })(Button);