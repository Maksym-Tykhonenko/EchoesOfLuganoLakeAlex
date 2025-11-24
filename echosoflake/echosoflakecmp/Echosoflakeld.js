import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { echoslakehtmlloader } from '../echosoflakedt/echoslakehtmlloader';

const Echosoflakeld = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#134353' }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: echoslakehtmlloader }}
        style={{ backgroundColor: 'transparent' }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default Echosoflakeld;
