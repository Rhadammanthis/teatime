import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Container from './src/Container'

export default class App extends React.Component {
	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		
		return(
			<Provider store={store}>
                <Container/>
            </Provider>
		);
	}
}
