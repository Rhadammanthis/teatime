import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Platform, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen'

class ContainerScreen extends Component {

    render() {
        return( 
            this.props.isInHome ? <HomeScreen/> : <DetailScreen/>
        )
    }
}

const mapStateToProps = ({ home }) => {

    const { isInHome } = home;

    return{
        isInHome
    };
};

export default connect(mapStateToProps,{})(ContainerScreen);