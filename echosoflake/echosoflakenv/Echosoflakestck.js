import { createStackNavigator } from '@react-navigation/stack';
import Echosoflaketbs from './Echosoflaketbs';
import Echosoflakeonbr from '../echosoflakescr/Echosoflakeonbr';

const Stack = createStackNavigator();

const Echosoflakestck = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Echosoflakeonbr" component={Echosoflakeonbr} />
      <Stack.Screen name="Echosoflaketbs" component={Echosoflaketbs} />
    </Stack.Navigator>
  );
};

export default Echosoflakestck;
