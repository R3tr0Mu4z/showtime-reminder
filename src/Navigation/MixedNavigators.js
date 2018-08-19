import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import SearchMovie from '../Screens/SearchMovie';
import NowPlaying from '../Screens/NowPlaying';
import MovieInfo from '../Screens/MovieInfo';

const TabNav = createBottomTabNavigator({
    Screen1: {
        screen: SearchMovie
    }, 
    Screen2: {
        screen: NowPlaying
    }
});

const StackHome = createStackNavigator({
    Screen1: {
        screen: SearchMovie
        
    },
    MovieInfo: {
        screen: MovieInfo
    }
     
},
   {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

export default Drawer = createDrawerNavigator({
   Stack: {
       screen: StackHome  
   },
   NowPlaying: {
       screen: NowPlaying
   }
});