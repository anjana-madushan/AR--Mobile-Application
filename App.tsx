import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import Home from './src/components/home';
import ARScene from './src/components/arScene';

const App = () => {
  const [showAR, setShowAR] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const handleStartAR = () => {
    setShowAR(true);
  };

  const handleGoBack = () => {
    setShowAR(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
          <Text style={styles.loadingText}>Jurassic AR</Text>
        </View>
      ) : (
        <>
          {showAR ? (
            <ARScene goBack={handleGoBack} />
          ) : (
            <Home onStartAR={handleStartAR} />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: 'white',
    fontSize:40,
    fontWeight: 'bold',
    color:'yellow'
  },
});

export default App;
