import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Image } from 'react-native';
import Guidance from '../components/guidence';

const Home = ({ onStartAR }) => {
  const [showGuidance, setShowGuidance] = useState(false);

  const handleShowGuidance = () => {
    setShowGuidance(true);
  };

  const handleBackToHome = () => {
    setShowGuidance(false);
  };

  return (
    <View style={styles.homeContainer}>
      {showGuidance ? (
        <View style={styles.container}>
          <Guidance onBack={handleBackToHome} />
        </View>
      ) : (
        <ImageBackground
          source={require('../assets/images/cover_bg.jpg')}
          style={styles.backgroundImage}
        >
          <Text style={styles.title} numberOfLines={2}>
            WELCOME TO {"\n"}THE AR ADVENTURE
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/bg.png')}
              style={[styles.image, { borderRadius: 10 }]}
              resizeMode="contain"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Guidance" onPress={handleShowGuidance} color="red" />
            <Button title="Start AR" onPress={onStartAR} />
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    marginBottom: 20,
    textAlign: 'center',
    color: 'yellow',
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default Home;
