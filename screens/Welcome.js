import React, { useContext, useEffect , useState} from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
} from './../components/styles';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import { ActivityIndicator, StyleSheet,View,Image} from 'react-native';
import { setNestedObjectValues } from 'formik';


const Welcome = ({navigation}) => {
  
 
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  //const { name, email, photoUrl } = storedCredentials;
  const [animating, setAnimating] = useState(true);


  
  const clearLogin = () => {
    AsyncStorage.removeItem('MyCredentials')
      .then(() => {
        setStoredCredentials("MyCredentials");
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const timer =setTimeout(() => {
    
        navigation.navigate('Login');
    
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
     
       {/* <ActivityIndicator
       animating={animating}
       justifyContent='center'
       color="#FFFFFF"
       size="large"
       style={styles.actind}
       /> */}
       <Image style={styles.logo} source ={require('../assets/tick.png')}/>
    </View>

  );
};

export default Welcome;
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#194d7d'
  },
    actind:{
      alignItems:'center',
      height:500
    },
    logo: {
      marginTop:400,
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center',
      width: 50,
      height: 50,
    },
  
});