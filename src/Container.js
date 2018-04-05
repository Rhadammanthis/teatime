import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Platform, TouchableWithoutFeedback } from 'react-native';
import Button from './components/Button';
import { connect } from 'react-redux';
import Home from './Home';
import Detail from './Detail'

class Container extends Component {

    render() {
        return( 
            this.props.isInHome ? <Home/> : <Detail/>
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
		height: (Platform.OS === 'ios') ? 20 : 10, //this is just to test if the platform is iOS to give it a height of 20, else, no height (Android apps have their own status bar)
		// height: 20,
		backgroundColor: "white",
	}
});

const mapStateToProps = ({ selection }) => {

    const { isInHome } = selection;

    return{
        isInHome
    };
};

export default connect(mapStateToProps,{})(Container);