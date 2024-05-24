import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Platform, Alert, Button, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Sound from 'react-native-sound';

const muteIconImage = require('../assets/images/mute.png');
const unMuteIconImage = require('../assets/images/unmute.png');
const backgroundAudio = require('../assets/sound/roar.mp3');
const webApp = require('../../android/app/src/main/assets/index.html');

const ARScene = ({ goBack }) => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [muteIcon, setMuteIcon] = useState(muteIconImage);
  const [backgroundSound, setBackgroundSound] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [shouldPlaySound, setShouldPlaySound] = useState(false); // State to control sound playback

const toggleMute = () => {
  console.log('Toggling mute');
  const newMuted = !muted;
  console.log('New muted state:', newMuted);
  setMuted(newMuted);
  const newIcon = newMuted ? muteIconImage : unMuteIconImage;
  console.log('New icon:', newIcon);
  setMuteIcon(newIcon);

  if (backgroundSound) {
    if (newMuted) {
      console.log('Pausing background sound');
      backgroundSound.pause();
    } else {
      console.log('Resuming background sound');
      backgroundSound.play();
    }
  } else {
    console.log('Background sound is not loaded');
  }
};

  const requestCameraPermission = async () => {
    try {
      const cameraGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);

      console.log("Camera permission granted: ", cameraGranted);

      if (!cameraGranted) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
          setPermissionsGranted(true);
        } else {
          console.log('Camera permission denied');
          Alert.alert('Permissions required', 'Camera permission is required to use this feature.');
        }
      } else {
        setPermissionsGranted(true);
      }
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', 'An error occurred while requesting permissions.');
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    } else {
      setPermissionsGranted(true);
    }
  }, []);

  useEffect(() => {
    const sound = new Sound(backgroundAudio, (error) => {
      if (error) {
        console.log('Error loading sound:', error);
        return;
      }
      sound.setNumberOfLoops(-1);
      setBackgroundSound(sound);
      if (!muted && shouldPlaySound) {
        sound.play();
      }
    });
    return () => {
      if (sound) {
        sound.stop();
        sound.release();
      }
    };
  }, [shouldPlaySound]); // Listen for changes in shouldPlaySound

  const handleLoadEnd = () => {
    setLoading(false); // Set loading to false when WebView has finished loading
    setTimeout(() => {
      setShouldPlaySound(true); // Set shouldPlaySound to true after 10 seconds
    }, 10000);
  };

  if (!permissionsGranted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Requesting permissions...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={webApp}
        style={{ flex: 1 }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        javaScriptEnabledAndroid={true}
        mediaPlaybackRequiresUserAction={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView HTTP error: ', nativeEvent);
        }}
        onLoadProgress={({ nativeEvent }) => {
          console.log(`WebView loading: ${nativeEvent.progress * 100}%`);
        }}
        onLoadEnd={handleLoadEnd} // Call handleLoadEnd when WebView has finished loading
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      <View style={{ position: 'absolute', bottom: 30, left: 25 }}>
        <Button color = 'red' title="Back" onPress={() => {
            Alert.alert(
              'Confirmation',
              'Are you sure you want to go back?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                { text: 'OK', onPress: goBack },
              ],
              { cancelable: false }
            );
          }} />

      </View>
      <View style={{ position: 'absolute', top: 20, right: 20 }}>
        <TouchableOpacity onPress={toggleMute}>
          <Image source={muted ? muteIconImage : unMuteIconImage} style={{ width: 60, height: 60 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});

export default ARScene;
