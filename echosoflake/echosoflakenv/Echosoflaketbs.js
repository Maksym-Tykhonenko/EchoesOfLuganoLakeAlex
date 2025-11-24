import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import Echosoflakefndr from '../echosoflakescr/Echosoflakefndr';
import Echosoflakelocs from '../echosoflakescr/Echosoflakelocs';
import Echosoflakem from '../echosoflakescr/Echosoflakem';
import Echosoflakefv from '../echosoflakescr/Echosoflakefv';
import Echosoflakegllr from '../echosoflakescr/Echosoflakegllr';

const Tab = createBottomTabNavigator();

const Echosoflaketbs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.echoslaketab,
        tabBarActiveTintColor: '#7DC3DA',
        tabBarInactiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Echosoflakefndr"
        component={Echosoflakefndr}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/echoslakefind.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Echosoflakelocs"
        component={Echosoflakelocs}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/echoslakeloc.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Echosoflakem"
        component={Echosoflakem}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/echoslakemap.png')}
              style={{ tintColor: color }}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Echosoflakefv"
        component={Echosoflakefv}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/echoslakefav.png')}
              style={{ tintColor: color }}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Echosoflakegllr"
        component={Echosoflakegllr}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/echoslakegall.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  echoslaketab: {
    backgroundColor: '#326B7E',
    elevation: 1,
    borderTopWidth: 1,
    borderTopColor: '#326B7E',
    paddingTop: 14,
    paddingBottom: 13,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 67,
    height: 67,
    marginHorizontal: 25,
    borderRadius: 12,
  },
});

export default Echosoflaketbs;
