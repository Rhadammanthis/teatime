import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, Animated, TouchableWithoutFeedback, Easing, Dimensions } from 'react-native';
import { getCompanyData, updateTranslationTargetCoordinates, selectElement, startHomeButtonAnim, goToDetail, saveElementSize, fetchCompanyData, saveSelectedElementsPosition, saveElementsPosition } from '../actions'
import { TEATIME, KOLIBRI, GANGVERK, WOW } from '../actions/types';

class CompanyComponent extends Component {

    company = null;

    componentDidMount() {
        // this.props.getCompanyData(this.props.type)
    }

    onLayout = (e) => {
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
            x: e.nativeEvent.layout.x,
            y: e.nativeEvent.layout.y
        })
        this.props.saveElementSize(e.nativeEvent.layout.width, e.nativeEvent.layout.height)

        this.props.saveElementsPosition(this.props.type, e.nativeEvent.layout.x, e.nativeEvent.layout.y, e.nativeEvent.layout.height)

    }

    onClick() {
        this.props.fetchCompanyData(this.props.type)
        this.props.selectElement(this.props.type)
        this.props.saveSelectedElementsPosition(this.props.type, this.state.x, this.state.y, this.state.width, this.state.height)
        this.props.updateTranslationTargetCoordinates(this.props.type, {teatime: this.props.teatime, wow: this.props.wow, kolibri: this.props.kolibri, gangverk: this.props.gangverk})
    }

    initAnimationFlow() {

        console.log('Preparing to animate', this.company)

        this.props.startHomeButtonAnim();

        Animated.parallel([
            Animated.timing(this.company.animTranslation.x, {
                toValue: 1,
                duration: 700,
                easing: Easing.back(),
                useNativeDriver: true,
            }),
            Animated.timing(this.company.animTranslation.y, {
                toValue: 1,
                duration: 700,
                easing: Easing.back(),
                useNativeDriver: true,
            }),
            Animated.timing(this.company.animScale, {
                toValue: 1,
                duration: 700,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start(onComplete = () => {
        });

        //Special animation for the component that was selected
        if (this.props.selection === this.props.type) {

            Animated.sequence([
                Animated.timing(
                    this.props.scale, {
                        toValue: 1.1,
                        duration: 500,
                        useNativeDriver: true,
                    }
                ),
                Animated.stagger(100, [
                    Animated.timing(
                        this.props.scale, {
                            toValue: 1.0,
                            duration: 450,
                            useNativeDriver: true,
                        }
                    )
                ])
            ]).start(onComplete = () => {
                this.props.goToDetail()
            })
        }

    }

    /**
     * There's a weird issue here. After trying the conventional optimization methods
     * and not achieving the desire effect I opted to use 'the NativeDriver. Most of the
     * anymations are working perfectly except for these right here.
     * The intention was to return every ComapnyCOmponent to their initial place by simply
     * reversing the animation but sometjing prevents it from even rendering resulting in a
     * more than anti climatic snap...
     * Removing the use of the NativeDriver altogether reduces the overall quality of the
     * animations but manages to play these below.
     * Well... wel... wel... 
     */
    
    reverseAnims(){
        Animated.parallel([
            Animated.timing(this.company.animTranslation.x, {
                toValue: 0,
                duration: 400,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(this.company.animTranslation.y, {
                toValue: 0,
                duration: 400,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(this.company.animScale, {
                toValue: 0,
                duration: 400,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start(onComplete = () => {
        });
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

            if(this.props.shouldReverse){
                this.reverseAnims()
            }

            if (this.props.coordsUpdated) {
                this.initAnimationFlow()
            }

            return (
                <Animated.View onLayout={this.onLayout} style={[styles.button, {
                    elevation: this.company.z, margin: 10,
                    transform: [{
                            translateX: this.company.animTranslation.x.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, this.company.translationTargetX]
                            })
                        }, 
                        {
                            translateY: this.company.animTranslation.y.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, this.company.translationTargetY]
                            })
                        },
                        this.props.selection !== this.props.type ?
                            {
                                scale: this.company.animScale.interpolate({
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
                            <Text style={{ fontSize: 13, marginBottom: 10, color: '#00000066' }}>
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

    const { teatime, wow, kolibri, gangverk, company, coordsUpdated, selection, scale, shouldReverse } = data;

    return {
        teatime, wow, kolibri, gangverk, company, coordsUpdated, selection, scale, shouldReverse
    };
};

export default connect(mapStateToProps, { getCompanyData, updateTranslationTargetCoordinates, selectElement, 
    startHomeButtonAnim, goToDetail, saveElementSize, fetchCompanyData, saveSelectedElementsPosition,
    saveElementsPosition })(CompanyComponent);