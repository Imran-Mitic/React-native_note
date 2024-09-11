import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Splash = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/tof.png')} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Bienvenue sur Mitic note</Text>
        <Text style={styles.subtitle}>
          Accéder et gérer vos notes facilement sur notre plateforme !
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: height * 0.5, // L'image couvre la moitié supérieure de l'écran
    resizeMode: 'cover',  // L'image est redimensionnée pour couvrir la zone
    position: 'absolute',
    top: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.4, // Position des textes juste en dessous de l'image
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 70,
  },
  button: {
    backgroundColor: '#8CAACF',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 1 ,
    borderColor: '#4B7CB8',
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Splash;
