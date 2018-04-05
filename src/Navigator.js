import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Detail from './Detail'

const Navigator = StackNavigator(
    {
        Home: { screen: Home },
        Detail: { screen: Detail },
    },
    {
        initialRouteName: 'Home',
    }
);

export default Navigator;