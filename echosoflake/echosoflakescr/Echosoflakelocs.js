import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Share,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { echoslakeloclist } from '../echosoflakedt/echoslakeloclist';
import Echosoflakelayout from '../echosoflakecmp/Echosoflakelayout';
import { useStore } from '../echosoflakestrg/echosoflakect';
import WebView from 'react-native-webview';
import { echoslakehtmlloader } from '../echosoflakedt/echoslakehtmlloader';

const { height } = Dimensions.get('window');

const Echosoflakelocs = () => {
  const { savedEchoesLakeLocations, setSavedEchoesLakeLocations } = useStore();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [surpriseLocation, setSurpriseLocation] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const loadSaved = async () => {
        try {
          const stored = await AsyncStorage.getItem('savedEchoesLakeLocations');
          setSavedEchoesLakeLocations(stored ? JSON.parse(stored) : []);
        } catch (err) {
          console.error('Failed to load saved locations', err);
          setSavedEchoesLakeLocations([]);
        }
      };
      loadSaved();
    }, [setSavedEchoesLakeLocations]),
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

  const handleSurprise = () => {
    setShowSurprise(true);
    setLoading(true);
    setSurpriseLocation(null);

    setTimeout(() => {
      if (!echoslakeloclist || echoslakeloclist.length === 0) {
        setLoading(false);
        return;
      }
      const random =
        echoslakeloclist[Math.floor(Math.random() * echoslakeloclist.length)];
      setSurpriseLocation(random);
      setLoading(false);
    }, 3000);
  };

  const handleCloseSurprise = () => {
    setShowSurprise(false);
    setSurpriseLocation(null);
    setLoading(false);
  };

  return (
    <Echosoflakelayout>
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
            <Text style={styles.echoslaketitle}>Surprise Me</Text>
          </View>
        </View>

        {!showSurprise && (
          <TouchableOpacity
            style={{ width: '100%', marginTop: 17, marginBottom: 22 }}
            activeOpacity={0.7}
            onPress={handleSurprise}
          >
            <LinearGradient
              colors={['#E25088', '#D52A6C']}
              style={{
                borderRadius: 14,
              }}
            >
              <LinearGradient
                colors={['#C63D62', '#FB5B85', '#430F1E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 14,
                  padding: Platform.OS === 'ios' ? 1 : 0,
                  margin: Platform.OS === 'ios' ? 0 : 1,
                }}
              >
                <View
                  style={{
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      fontFamily: 'InknutAntiqua-SemiBold',
                    }}
                  >
                    Surprise me
                  </Text>
                </View>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {showSurprise && loading && (
          <View style={{ width: '100%', marginTop: 18 }}>
            <View
              style={{
                width: 350,
                height: 100,
                marginBottom: 25,
                marginTop: 30,
              }}
            >
              <WebView
                originWhitelist={['*']}
                source={{ html: echoslakehtmlloader }}
                style={{ backgroundColor: 'transparent' }}
                scrollEnabled={false}
              />
            </View>

            <LinearGradient
              colors={['#E25088', '#D52A6C']}
              style={{
                borderRadius: 14,
              }}
            >
              <LinearGradient
                colors={['#C63D62', '#FB5B85', '#430F1E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 14,
                  padding: Platform.OS === 'ios' ? 1 : 0,
                  margin: Platform.OS === 'ios' ? 0 : 1,
                }}
              >
                <View
                  style={{
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      fontFamily: 'InknutAntiqua-SemiBold',
                    }}
                  >
                    Loading...
                  </Text>
                </View>
              </LinearGradient>
            </LinearGradient>
          </View>
        )}

        {showSurprise && !loading && surpriseLocation && (
          <View>
            <LinearGradient
              colors={['#FB6A91', '#974157']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 14, marginBottom: 12 }}
            >
              <View style={styles.locationCard}>
                <Image
                  source={surpriseLocation.echoslakeimage}
                  style={styles.locationImage}
                  resizeMode="cover"
                />

                <View style={styles.echoslakecatcont}>
                  <Text style={styles.echoescattxt}>
                    {surpriseLocation.echoslakecategory}
                  </Text>
                </View>

                <View style={{ padding: 16 }}>
                  <Text style={styles.locationTitle}>
                    {surpriseLocation.echoslaketitle}
                  </Text>
                  <Text style={styles.echoesDesc}>
                    {surpriseLocation.echoslakedesc}
                  </Text>

                  <View style={styles.echoeslakewrap}>
                    <TouchableOpacity
                      onPress={() => shareEchoesLoc(surpriseLocation)}
                    >
                      <Image
                        source={require('../../assets/images/echoslakeshr.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => toggleEchoesSaveLake(surpriseLocation)}
                    >
                      <Image
                        source={
                          isSavedEchoesLakeCard(surpriseLocation)
                            ? require('../../assets/images/echoslakesvd.png')
                            : require('../../assets/images/echoslakesv.png')
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </LinearGradient>

            <TouchableOpacity
              style={{ width: '100%', marginTop: 6, marginBottom: 22 }}
              activeOpacity={0.7}
              onPress={handleCloseSurprise}
            >
              <LinearGradient
                colors={['#E25088', '#D52A6C']}
                style={{
                  borderRadius: 14,
                }}
              >
                <LinearGradient
                  colors={['#C63D62', '#FB5B85', '#430F1E']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 14,
                    padding: Platform.OS === 'ios' ? 1 : 0,
                    margin: Platform.OS === 'ios' ? 0 : 1,
                  }}
                >
                  <View
                    style={{
                      height: 60,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#fff',
                        fontFamily: 'InknutAntiqua-SemiBold',
                      }}
                    >
                      Close
                    </Text>
                  </View>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {!showSurprise && (
          <>
            <Text style={styles.echoessectiontxt}>Places List</Text>

            {echoslakeloclist.map((location, idx) => (
              <LinearGradient
                colors={['#FB6A91', '#974157']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ borderRadius: 14, marginBottom: 12 }}
                key={idx}
              >
                <View style={styles.locationCard}>
                  <Image
                    source={location.echoslakeimage}
                    style={styles.locationImage}
                    resizeMode="cover"
                  />

                  <View style={styles.echoslakecatcont}>
                    <Text style={styles.echoescattxt}>
                      {location.echoslakecategory}
                    </Text>
                  </View>

                  <View style={{ padding: 16 }}>
                    <Text style={styles.locationTitle}>
                      {location.echoslaketitle}
                    </Text>
                    <Text style={styles.echoesDesc}>
                      {location.echoslakedesc}
                    </Text>

                    <View style={styles.echoeslakewrap}>
                      <TouchableOpacity
                        onPress={() => shareEchoesLoc(location)}
                      >
                        <Image
                          source={require('../../assets/images/echoslakeshr.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => toggleEchoesSaveLake(location)}
                      >
                        <Image
                          source={
                            isSavedEchoesLakeCard(location)
                              ? require('../../assets/images/echoslakesvd.png')
                              : require('../../assets/images/echoslakesv.png')
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            ))}
          </>
        )}
      </View>
    </Echosoflakelayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.08,
    paddingHorizontal: 26,
    paddingBottom: 140,
  },
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
  emptyscrtxt: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'InknutAntiqua-Bold',
  },
  echoessectiontxt: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'InknutAntiqua-Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default Echosoflakelocs;
