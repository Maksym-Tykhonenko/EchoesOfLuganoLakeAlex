import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import Echosoflakelayout from '../echosoflakecmp/Echosoflakelayout';
import { echoslakeloclist } from '../echosoflakedt/echoslakeloclist';
import LinearGradient from 'react-native-linear-gradient';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Echosoflakegllr = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const imageRef = useRef(null);
  const navigation = useNavigation();

  const shareEchoesLakeImage = async () => {
    try {
      const tmpUri = await captureRef(imageRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
      });

      let fileUri = tmpUri.startsWith('file://') ? tmpUri : 'file://' + tmpUri;
      const pathToCheck = fileUri.replace('file://', '');
      const exists = await RNFS.exists(pathToCheck);
      if (!exists) return;

      await Share.open({
        url: fileUri,
        type: 'image/png',
        failOnCancel: false,
      });
    } catch (error) {
      if (!error?.message?.includes('User did not share')) {
        console.error('error', error);
      }
    }
  };

  return (
    <Echosoflakelayout>
      <ScrollView contentContainerStyle={styles.container}>
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
            <Text style={styles.echoslaketitle}>Photogallery</Text>
          </View>
        </View>

        {selectedImage ? (
          <View style={styles.selectedImageContainer}>
            <View ref={imageRef} collapsable={false}>
              <Image
                source={selectedImage.echoslakeimage}
                style={styles.selectedImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.echoeslakewrap}>
              <TouchableOpacity onPress={() => setSelectedImage(null)}>
                <Image
                  source={require('../../assets/images/echoslakeback.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: 170 }}
                activeOpacity={0.7}
                onPress={() => shareEchoesLakeImage()}
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
                        Share
                      </Text>
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          echoslakeloclist.map(location => (
            <TouchableOpacity
              key={location.echoslaketitle}
              activeOpacity={0.8}
              style={{ marginBottom: 12, paddingHorizontal: 26 }}
              onPress={() => setSelectedImage(location)}
            >
              <Image
                source={location.echoslakeimage}
                style={styles.locationImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </Echosoflakelayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.08,
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
    paddingHorizontal: 26,
  },
  locationImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  selectedImageContainer: {
    marginTop: 10,
  },
  selectedImage: {
    width: '100%',
    height: 420,
  },
  echoeslakewrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginTop: 16,
  },
});

export default Echosoflakegllr;
