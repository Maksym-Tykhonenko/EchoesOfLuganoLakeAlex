import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { echoslakeloclist } from '../echosoflakedt/echoslakeloclist';
import { useStore } from '../echosoflakestrg/echosoflakect';
import MapView, { Marker } from 'react-native-maps';
import { echolakemapdarktheme } from '../echosoflakedt/echolakemapdarktheme';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Share,
  Platform,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';

const Echosoflakem = () => {
  const { savedEchoesLakeLocations, setSavedEchoesLakeLocations } = useStore();
  const navigation = useNavigation();
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [isVisibleCard, setIsVisibleCard] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadSaved = async () => {
        const stored = await AsyncStorage.getItem('savedEchoesLakeLocations');
        setSavedEchoesLakeLocations(stored ? JSON.parse(stored) : []);
      };
      loadSaved();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  const isSavedEchoesLakeCard = loc =>
    savedEchoesLakeLocations.some(
      item => item.echoslaketitle === loc.echoslaketitle,
    );

  const toggleEchoesSaveLake = async location => {
    try {
      const updated = isSavedEchoesLakeCard(location)
        ? savedEchoesLakeLocations.filter(
            item => item.echoslaketitle !== location.echoslaketitle,
          )
        : [...savedEchoesLakeLocations, location];

      setSavedEchoesLakeLocations(updated);
      await AsyncStorage.setItem(
        'savedEchoesLakeLocations',
        JSON.stringify(updated),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const shareEchoesLoc = async location => {
    try {
      await Share.share({
        message: `${location.echoslaketitle}\n\n${location.echoslakedesc}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.echoesheadwrap}>
          <TouchableOpacity
            style={styles.echoslakehomebtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Echosoflakefndr')}
          >
            {Platform.OS === 'ios' ? (
              <Image
                source={require('../../assets/images/echoslakelogo.png')}
              />
            ) : (
              <Image
                source={require('../../assets/images/andrdiamonf.png')}
                style={{
                  width: 80,
                  height: 80,
                  top: 4,
                }}
              />
            )}
          </TouchableOpacity>
          <View style={styles.echoslakeheader}>
            <Text style={styles.echoslaketitle}>Lugano Map</Text>
          </View>
        </View>

        <MapView
          style={{ width: '100%', height: '100%' }}
          userInterfaceStyle="dark"
          provider={Platform.OS === 'ios' ? 'google' : undefined}
          customMapStyle={echolakemapdarktheme}
          initialRegion={{
            latitude: 46.0036,
            longitude: 8.9511,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {echoslakeloclist.map((location, idx) => (
            <Marker
              onPress={() => {
                if (
                  selectedMarker &&
                  selectedMarker.echoslaketitle === location.echoslaketitle
                ) {
                  setIsVisibleCard(false);
                  setSelectedMarker(null);
                } else {
                  setSelectedMarker(location);
                  setIsVisibleCard(true);
                }
              }}
              key={idx}
              coordinate={{
                latitude: location.echoslakelatitude,
                longitude: location.echoslakelongitude,
              }}
            >
              {Platform.OS === 'ios' ? (
                <Image
                  source={require('../../assets/images/echoslakemarker.png')}
                />
              ) : null}
            </Marker>
          ))}
        </MapView>

        {isVisibleCard && selectedMarker && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setIsVisibleCard(false);
              setSelectedMarker(null);
            }}
            style={{
              position: 'absolute',
              top: 170,
              left: 20,
              right: 20,
            }}
          >
            <LinearGradient
              colors={['#FB6A91', '#974157']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 14,
                marginBottom: 12,
              }}
            >
              <View style={styles.locationCard}>
                <Image
                  source={selectedMarker.echoslakeimage}
                  style={styles.locationImage}
                  resizeMode="cover"
                />

                <View style={styles.echoslakecatcont}>
                  <Text style={styles.echoescattxt}>
                    {selectedMarker.echoslakecategory}
                  </Text>
                </View>

                <View style={{ padding: 16 }}>
                  <Text style={styles.locationTitle}>
                    {selectedMarker.echoslaketitle}
                  </Text>
                  <Text style={styles.echoesDesc}>
                    {selectedMarker.echoslakedesc}
                  </Text>

                  <View style={styles.echoeslakewrap}>
                    <TouchableOpacity
                      onPress={() => shareEchoesLoc(selectedMarker)}
                    >
                      <Image
                        source={require('../../assets/images/echoslakeshr.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => toggleEchoesSaveLake(selectedMarker)}
                    >
                      <Image
                        source={
                          isSavedEchoesLakeCard(selectedMarker)
                            ? require('../../assets/images/echoslakesvd.png')
                            : require('../../assets/images/echoslakesv.png')
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  echoslaketitle: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'InknutAntiqua-Bold',
    textAlign: 'center',
  },
  echoslakeheader: {
    height: 70,
    backgroundColor: '#326B7E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  echoslakehomebtn: {
    height: 70,
    width: 70,
    backgroundColor: '#326B7E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  echoesheadwrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 20,
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    paddingHorizontal: 26,
    zIndex: 10,
  },
  locationCard: {
    backgroundColor: '#326B7E',
    borderRadius: 14,
    margin: 3,
  },
  locationImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  locationTitle: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'InknutAntiqua-Bold',
    lineHeight: 27,
    marginTop: 8,
  },
  echoesDesc: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
    marginTop: 6,
    lineHeight: 20,
  },
  echoeslakewrap: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  echoescattxt: {
    color: '#fff',
    fontFamily: 'InknutAntiqua-SemiBold',
    fontSize: 13,
  },
  echoslakecatcont: {
    height: 44,
    backgroundColor: '#326B7E',
    position: 'absolute',
    top: 16,
    left: 16,
    borderRadius: 14,
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FB6A91',
  },
});

export default Echosoflakem;
