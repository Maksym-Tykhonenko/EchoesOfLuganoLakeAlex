import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Echosoflakelayout from '../echosoflakecmp/Echosoflakelayout';
import {
  echoslakecategories,
  echoslakeloclist,
} from '../echosoflakedt/echoslakeloclist';
import WebView from 'react-native-webview';
import { echoslakehtmlloader } from '../echosoflakedt/echoslakehtmlloader';
import { useStore } from '../echosoflakestrg/echosoflakect';

const { height } = Dimensions.get('window');

const Echosoflakefndr = () => {
  const [selectedEchoesLakeCategory, setSelectedEchoesLakeCategory] =
    useState(null);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [randomLocation, setRandomLocation] = useState(null);
  const { savedEchoesLakeLocations, setSavedEchoesLakeLocations } = useStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadSaved = async () => {
        const stored = await AsyncStorage.getItem('savedEchoesLakeLocations');
        const parsed = stored ? JSON.parse(stored) : [];
        setSavedEchoesLakeLocations(parsed);
        setIsLoaded(true);
      };
      loadSaved();
    }, []),
  );

  const isSavedEchoesLakeCard = loc =>
    savedEchoesLakeLocations.some(
      item => item.echoslaketitle === loc.echoslaketitle,
    );

  const toggleEchoesSaveLake = async location => {
    let updated;
    setSavedEchoesLakeLocations(prev => {
      if (prev.some(item => item.echoslaketitle === location.echoslaketitle)) {
        updated = prev.filter(
          item => item.echoslaketitle !== location.echoslaketitle,
        );
      } else {
        updated = [...prev, location];
      }
      return updated;
    });
    await AsyncStorage.setItem(
      'savedEchoesLakeLocations',
      JSON.stringify(updated),
    );
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

  const handleExploreEchoesLake = () => {
    if (!selectedEchoesLakeCategory) return;

    setIsLoadingCategory(true);
    setRandomLocation(null);

    setTimeout(() => {
      const filtered = echoslakeloclist.filter(
        loc =>
          loc.echoslakecategory ===
          selectedEchoesLakeCategory.echoslakecategory,
      );
      const randomItem = filtered[Math.floor(Math.random() * filtered.length)];
      setRandomLocation(randomItem);
      setIsLoadingCategory(false);
    }, 3000);
  };

  return (
    <Echosoflakelayout>
      <View style={styles.container}>
        <View style={styles.echoesheadwrap}>
          <View style={styles.echoslakehomebtn}>
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
          </View>
          <View style={styles.echoslakeheader}>
            <Text style={styles.echoslaketitle}>
              {randomLocation
                ? selectedEchoesLakeCategory?.echoslakecategory
                : 'Finder'}
            </Text>
          </View>
        </View>

        {!isLoadingCategory && !randomLocation && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            {echoslakecategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedEchoesLakeCategory(category)}
                style={{
                  marginBottom: 20,
                  width: '48%',
                  height: 160,
                  borderWidth:
                    selectedEchoesLakeCategory?.echoslakecategory ===
                    category.echoslakecategory
                      ? 3
                      : 1,
                  borderRadius: 12,
                  borderColor:
                    selectedEchoesLakeCategory?.echoslakecategory ===
                    category.echoslakecategory
                      ? '#E25088'
                      : '#868686',
                }}
              >
                <Image
                  source={category.echoslakeimage}
                  style={[styles.echoslakecatimage]}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['rgba(15,15,15,0)', 'rgba(15,15,15,1)']}
                  style={styles.echoslakegradshadow}
                />
                <Text style={styles.echoslakecattitle}>
                  {category.echoslakecategory}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {isLoadingCategory && selectedEchoesLakeCategory && (
          <View style={{ alignItems: 'center', marginTop: 80 }}>
            <View style={{ width: 350, height: 100 }}>
              <WebView
                originWhitelist={['*']}
                source={{ html: echoslakehtmlloader }}
                style={{ backgroundColor: 'transparent' }}
                scrollEnabled={false}
              />
            </View>

            <View
              activeOpacity={0.7}
              style={{
                width: '100%',
                height: 160,
                borderWidth: 3,
                marginTop: 28,
                borderRadius: 12,
                borderColor: '#E25088',
              }}
            >
              <Image
                source={selectedEchoesLakeCategory.echoslakeimage}
                style={[styles.echoslakecatimage]}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(15,15,15,0)', 'rgba(15,15,15,1)']}
                style={styles.echoslakegradshadow}
              />
              <Text style={styles.echoslakecattitle}>
                {selectedEchoesLakeCategory.echoslakecategory}
              </Text>
            </View>

            <View style={{ width: '100%', marginTop: 18 }}>
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
          </View>
        )}

        {!isLoadingCategory && randomLocation && (
          <>
            <LinearGradient
              colors={['#FB6A91', '#974157']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 14 }}
            >
              <View style={styles.locationCard}>
                <Image
                  source={randomLocation.echoslakeimage}
                  style={styles.locationImage}
                  resizeMode="cover"
                />

                <View style={{ padding: 16 }}>
                  <Text style={styles.locationTitle}>
                    {randomLocation.echoslaketitle}
                  </Text>
                  <Text style={styles.echoesDesc}>
                    {randomLocation.echoslakedesc}
                  </Text>

                  <View style={styles.echoeslakewrap}>
                    <TouchableOpacity
                      onPress={() => shareEchoesLoc(randomLocation)}
                    >
                      <Image
                        source={require('../../assets/images/echoslakeshr.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => toggleEchoesSaveLake(randomLocation)}
                    >
                      <Image
                        source={
                          isLoaded && isSavedEchoesLakeCard(randomLocation)
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
              activeOpacity={0.7}
              style={{ width: '100%', marginTop: 18 }}
              onPress={() => {
                setRandomLocation(null);
                setSelectedEchoesLakeCategory(null);
              }}
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
                      Search again
                    </Text>
                  </View>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}

        {!isLoadingCategory && !randomLocation && (
          <TouchableOpacity
            style={{ width: '100%' }}
            activeOpacity={0.7}
            onPress={handleExploreEchoesLake}
          >
            <LinearGradient
              colors={
                selectedEchoesLakeCategory
                  ? ['#E25088', '#D52A6C']
                  : ['#473e41ff', '#433e40ff']
              }
              style={{
                borderRadius: 14,
              }}
            >
              <LinearGradient
                colors={
                  selectedEchoesLakeCategory
                    ? ['#C63D62', '#FB5B85', '#430F1E']
                    : ['#433e40ff', '#473e41ff', '#302a2eff']
                }
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
                    opacity: selectedEchoesLakeCategory ? 1 : 0.4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      fontFamily: 'InknutAntiqua-SemiBold',
                    }}
                  >
                    Explore
                  </Text>
                </View>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
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
  echoslakecatimage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  echoslakecattitle: {
    fontSize: 13,
    color: '#FFF',
    fontFamily: 'InknutAntiqua-SemiBold',
    position: 'absolute',
    bottom: 10,
    left: 20,
    width: '70%',
    lineHeight: 22,
  },
  echoslakegradshadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
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
  cardBtnText: {
    color: '#fff',
    fontFamily: 'InknutAntiqua-SemiBold',
  },
  echoeslakewrap: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
});

export default Echosoflakefndr;
