import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const echoeslakebgimages = [
  require('../../assets/images/echoslakeonbbg1.png'),
  require('../../assets/images/echoslakeonbbg2.png'),
  require('../../assets/images/echoslakeonbbg3.png'),
];

const Echosoflakeonbr = () => {
  const [currentOnboardIdx, setCurrentOnboardIdx] = useState(0);
  const navigation = useNavigation();
  const [showEchoesLakeLogo, setShowEchoesLakeLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEchoesLakeLogo(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ImageBackground
        source={echoeslakebgimages[currentOnboardIdx]}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.echoslakecontainer}>
            {currentOnboardIdx === 0 && (
              <View>
                <Image
                  source={require('../../assets/images/echoslakeonbbg1.1.png')}
                  style={{ top: 90 }}
                />
                {Platform.OS === 'android' && (
                  <Image
                    source={require('../../assets/images/andricon.png')}
                    style={{
                      width: 60,
                      height: 60,
                      position: 'absolute',
                      bottom: 165,
                      right: 88,
                      borderRadius: 12,
                    }}
                  />
                )}
              </View>
            )}
            {currentOnboardIdx === 1 && (
              <View>
                <Image
                  source={require('../../assets/images/echoslakeonbbg2.1.png')}
                  style={{ top: 90 }}
                />
                {Platform.OS === 'android' && (
                  <Image
                    source={require('../../assets/images/andricon.png')}
                    style={{
                      width: 80,
                      height: 85,
                      position: 'absolute',
                      bottom: 120,
                      right: 105,
                      borderRadius: 12,
                      transform: [{ rotate: '10deg' }],
                    }}
                  />
                )}
              </View>
            )}
            {currentOnboardIdx === 2 && (
              <View>
                <Image
                  source={require('../../assets/images/echoslakeonbbg3.1.png')}
                  style={{ top: 90 }}
                />
                {Platform.OS === 'android' && (
                  <Image
                    source={require('../../assets/images/andricon.png')}
                    style={{
                      width: 80,
                      height: 88,
                      position: 'absolute',
                      bottom: 80,
                      right: 80,
                      borderRadius: 12,
                      transform: [{ rotate: '10deg' }],
                    }}
                  />
                )}
              </View>
            )}
            <View style={styles.onbcontainer}>
              <Text style={styles.echoslaketitle}>
                {currentOnboardIdx === 0 && 'Discover the Calm of the Lake'}
                {currentOnboardIdx === 1 && 'Let Luck Guide You'}
                {currentOnboardIdx === 2 && 'Capture the Echoes'}
              </Text>
              <Text style={styles.echoslakesubtitle}>
                {currentOnboardIdx === 0 &&
                  'Step into the serene rhythm of Lugano. Let the city reveal its hidden corners and quiet wonders.'}
                {currentOnboardIdx === 1 &&
                  'Choose a category or simply tap I’m Feeling Lucky to uncover a random spot in the heart of Lugano.'}
                {currentOnboardIdx === 2 &&
                  'Save your favorite places, explore the interactive map, and enjoy Lugano through its photo gallery.'}
              </Text>

              <TouchableOpacity
                style={{ alignSelf: 'center' }}
                activeOpacity={0.7}
                onPress={() => {
                  if (currentOnboardIdx < 2) {
                    setCurrentOnboardIdx(currentOnboardIdx + 1);
                  } else {
                    navigation.replace('Echosoflaketbs');
                  }
                }}
              >
                <LinearGradient
                  colors={['#E25088', '#D52A6C']}
                  style={{
                    borderRadius: 14,
                    width: 268,
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
                          fontFamily: 'InknutAntiqua-Bold',
                          bottom: Platform.OS === 'ios' ? 2 : 0,
                        }}
                      >
                        {currentOnboardIdx === 0 && 'Let`s Go!'}
                        {currentOnboardIdx === 1 && 'Next'}
                        {currentOnboardIdx === 2 && 'Next'}
                      </Text>
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  onbcontainer: {
    width: '100%',
    paddingTop: 38,
    paddingBottom: 100,
    backgroundColor: '#326B7E',
    borderTopWidth: 2,
    borderColor: '#FB5B85',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderWidth: 0.2,
    borderBottomWidth: 0,
    paddingHorizontal: 44,
  },
  echoslakecontainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  echoslaketitle: {
    fontSize: 22,
    color: '#FFF',
    fontFamily: 'InknutAntiqua-Bold',
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
    lineHeight: 42,
  },
  echoslakesubtitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 5,
    marginBottom: 22,
  },
  echoslakeimage: {
    top: 60,
  },
});

export default Echosoflakeonbr;
