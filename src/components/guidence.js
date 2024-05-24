import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Guidance = ({ onBack }) => {

const handleOpenLink = () => {
    Linking.openURL('Your Website URL');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AR Guidance</Text>
      <Text style={styles.text1}>Follow The Steps!!!</Text>
      <Text style={styles.text}>1. Visit
      our <Text style={styles.linkText} onPress={handleOpenLink}>website</Text> to get markers. </Text>
      <Text style={styles.text}>2. These markers trigger AR content and make your experience unforgettable.</Text>
      <Text style={styles.text}>3. Then, tap 'Start AR' to immerse yourself in a world of dinosaurs.</Text>
      <Button title="Back to Home" onPress={onBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  text: {
    fontSize: 26,
    color:'white',
    textAlign: 'left',
    padding:10
  },
  text1: {
    fontSize: 46,
    marginTop: 5,
    color:'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
    linkText: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
});

export default Guidance;
