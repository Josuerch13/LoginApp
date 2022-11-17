import React, {useEffect} from 'react';
import * as RN from 'react-native';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


const uri = 'https://ak.picdn.net/shutterstock/videos/1060308725/thumb/1.jpg'
// const profilePicture = 'https://randomuser.me/api/portraits/men/34.jpg'
const profilePicture = 'https://scontent.flpb2-2.fna.fbcdn.net/v/t39.30808-6/304072477_511824584082370_2475794138563594404_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Vu_YTBxvu3IAX8Aw21n&_nc_ht=scontent.flpb2-2.fna&oh=00_AfBTPFJElKHEPN6YqJf7_ETGO3kaJZpUvlR6yKyU9QD6LQ&oe=637961DF'

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

  function LoginScreen() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleCreateAccount = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Account created!')
        const user = userCredential.user;
        console.log(user)
      })
      .catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
    }

    const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in!')
        const user = userCredential.user;
        console.log(user)
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error)
      })
    }


    return (
      <View style={styles.container}>
        {/* <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} /> */}
        {/* <View style={{width: 100, height: 100, backgroundColor: 'purple', position: 'absolute' }}></View>
        <View style={{width: 100, height: 100, backgroundColor: 'blue', top: 120, position: 'absolute', transform: [{rotate: '25deg'}] }}></View>
        <View style={{width: 100, height: 100, backgroundColor: 'red', bottom: 120 ,position: 'absolute', borderRadius: 50, transform: [{rotate: '50deg'}] }}></View> */}
        <ScrollView contentContainerStyle= {{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}> 
          <BlurView intensity={100}>
            <View style={styles.login}>
              <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
              <RN.Text style={styles.title}>Residencias UAB</RN.Text>
              <RN.Text style={styles.title2}>Iniciar Sesion</RN.Text>
              <View>
                <Text style={{fontSize: 25, fontWeight: '400', color: 'white'}}>Correo</Text>
                <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="example@uab.edu.bo" />
              </View>
              <View>
                <Text style={{fontSize: 25, fontWeight: '400', color: 'white'}}>Contraseña</Text>
                <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="Contraseña" secureTextEntry={true}/>
              </View>
              <TouchableOpacity onPress={handleSignIn} style={[styles.button, {backgroundColor: '#005EBA'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Entrar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, {backgroundColor: '#005EBA'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Registrate</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </ScrollView>
      </View>
    );
  }

  const Stack = createNativeStackNavigator();
  
  export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141417',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  login: {
    width: 350,
    height: 500,
    backgroundColor: '#141417',
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 0,
    marginTop: -100,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#262B2A',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#262B2A',
    marginBottom: 20
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#005EBA',
    borderWidth: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 9,
    color: '#fff'
},
title2: {
  fontSize: 28,
  fontWeight: 'bold',
  margin: 9,
  color: '#fff'
},

});