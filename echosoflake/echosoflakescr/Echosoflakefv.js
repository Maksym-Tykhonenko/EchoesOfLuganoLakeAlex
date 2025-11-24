import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
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
import Echosoflakelayout from '../echosoflakecmp/Echosoflakelayout';
import { useStore } from '../echosoflakestrg/echosoflakect';

const { height } = Dimensions.get('window');

const Echosoflakefv = () => {
  const { savedEchoesLakeLocations, setSavedEchoesLakeLocations } = useStore();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const loadSaved = async () => {
        const stored = await AsyncStorage.getItem('savedEchoesLakeLocations');
        setSavedEchoesLakeLocations(stored ? JSON.parse(stored) : []);
      };
      loadSaved();
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
            <Text style={styles.echoslaketitle}>Saved</Text>
          </View>
        </View>

        {savedEchoesLakeLocations.length === 0 && (
          <View
            style={{
              alignItems: 'center',
              marginTop: 130,
            }}
          >
            <Text style={styles.emptyscrtxt}>No saved locations yet.</Text>
          </View>
        )}

        {savedEchoesLakeLocations.map((location, idx) => (
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
                <Text style={styles.echoesDesc}>{location.echoslakedesc}</Text>

                <View style={styles.echoeslakewrap}>
                  <TouchableOpacity onPress={() => shareEchoesLoc(location)}>
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
});

export default Echosoflakefv;
