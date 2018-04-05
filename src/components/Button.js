import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { getCompanyData } from '../actions'

class Button extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        console.log('New props', nextProps.company)
        return true
    }

    componentDidMount() {
    
        this.props.getCompanyData(this.props.COMPANY)
    }

    render() {

        if(this.props.company !== null)
        return (
            <Animated.View onLayout={this.onLayout} style={[styles.button, {
                elevation: this.props.company.z, margin: 10, transform: [{
                    translateX: this.props.company.anim.x.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, this.props.company.finalX]
                    })
                }, {
                    translateY: this.props.company.anim.y.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, this.props.company.finalY]
                    }),
                }]
            }]}>
                <TouchableWithoutFeedback>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center', flex: 1, flexDirection: 'column'
                    }}>
                        <Image style={{ flex: 1 }} source={this.props.company.image} resizeMode="contain" />
                        <Text style={{ fontSize: 12, marginBottom: 10, color: '#00000066' }}>
                            {this.props.company.name}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        )
        
        return(
            <View/>
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

    const { company } = data;

    return {
        company
    };
};

export default connect(mapStateToProps, { getCompanyData })(Button);