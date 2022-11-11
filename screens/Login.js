import React, { useState, useContext,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Loginn } from '../store/actions';
import { Appbar } from "react-native-paper";
import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from './../components/styles';
import { View, ActivityIndicator, Alert,StyleSheet, TextInput,Text,Button} from 'react-native';
const { darkLight, brand, primary,tertiary} = Colors;

import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = ({ navigation }) => {
  const [dataTextChange,setDataTextChange]=useState();
  const [dataPasswordChange,setDataPasswordChange]=useState();
  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  const[passval,setPassval]=useState('');
  const[userval,setuserval]=useState(true);
  const[check,setCheck]=useState();
  useEffect(()=>{
  AsyncStorage.getItem('token').then(input=>{
      if(input !==null){
          try{
              var value=JSON.parse(input);
              //console.log(input)
              if(value.isLoggedin==='1'){
                  navigation.navigate('Dashboard')
              }
          }catch(error){
              console.log(error)

          }
      }
  })
})

  // const [data,setDataa]=useState({
  //   email: '',
  //   pass: '',
  //   check_textInputChange: false,
  //   secureTextEntry: true,
  //   isValidUser:true,
  //   isValidPassword:true
  // })
  const dispatch=useDispatch();
  const passValidator=()=>{
    if(pass!==''){
      setPassval("Password length should not exceed not more than 6 characters")
    }else{
      setPassval('')
    }
  }
  const userValidator=()=>{
    if(email===''){
      //userval=>!userval
      setuserval(false);
      console.log(userval)
      console.log(setuserval)
      //userval('emmpty')
    
    }else{
      // this.setState({userval:''})
    }
  }
//   const handlePasswordChange = (text) => {
//     if( text.length!==0 ) {
//         setDataa({
//             ...data,
//             pass: text,
//             isValidPassword: true
//         });
//     } else {
//         setDataa({
//             ...data,
//             pass: text,
//             isValidPassword: false
//         });
//     }
// }
//   const textInputChange = (text) => {
//     if( text.length!==0) {
//         setDataa({
//             ...data,
//             email: text,
//             check_textInputChange: true,
//             isValidUser: true
//         });
//     } else {
//         setDataa({
//             ...data,
//             email: text,
//             check_textInputChange: false,
//             isValidUser: false
//         });
//     }
// }

  
  const WrongCredentialsAlert = () =>
    Alert.alert(
      "Wrong Credentials",
      "Check your mail & password",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
 
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
 
  

  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };
  const setData=async()=>{
    if(email===''&&pass===''){
      Alert.alert('email and password required')
      return;
    }else{
      await AsyncStorage.getItem('Userdetail').then(value=>{
        if(value!==null&&email!==''&&pass!==''){
          try{
            var updatedData=JSON.parse(value)
            var userID=updatedData.find(key=>key.email===email&&key.pass===pass)
            if(userID){
              var user={
                email:userID.email,
                pass:userID.pass,
                token:userID.token,
                isLoggedin:'1'
              }
              AsyncStorage.setItem('token',JSON.stringify(user));
              Alert.alert('Login Successful')
              //dispatch(Loginn(email,pass))
              navigation.navigate('Dashboard');
              

            }
            else{
              Alert.alert('Incorrect credentials')
              navigation.navigate('Login')

            }

        }catch(error){
          console.log(error)
        }
      }else{
        alert('No data entered')
      }
      })
    }
  };


{/*

  // Persisting login
  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('MyCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage('Persisting login failed');
        console.log(error);
      });
  };
  */}

  return (
    <KeyboardAvoidingWrapper>
      <View style={{flex:1}}>
      <Appbar.Header style={styles.header}>
        {/* <Appbar.BackAction onPress={() => {navigation.navigate('Dashboard')}} /> */}
        <Appbar.Content titleStyle={{ marginRight: 150, fontSize:20, fontWeight:'bold' }} />
      </Appbar.Header>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          {/*<PageLogo resizeMode="cover" source={require('./../assets/img/Among_us.png')} />*/}
          

          
            
              <StyledFormArea>
                <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',paddingTop:200, paddingBottom:20}}>
                <TextInput
                  style={styles.inputbox}
                  
                  //label="Email Address"
                  placeholder="User Id"
                  placeholderTextColor={darkLight} 
                  //onChangeText={handleChange('email')}
                  onBlur={()=>userValidator()}
                  value={email}
                  onChangeText={(text)=>setEmail(text)}
                  keyboardType="email-address"
                  icon="mail"
                />
                {/* {userval?null:<Text style={{color:'red'}}>enter user id</Text>} */}
                
                </View>
                
                <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',paddingBottom:20}}>
                
                <TextInput
                  style={styles.inputbox}
                  label="Password"
                  //onBlur={()=>passValidator()}
                  placeholder="Password"
                  placeholderTextColor={darkLight} 
                  //onChangeText={handleChange('password')}
                  value={pass}
                  onChangeText={(text)=>setPass(text)}
                  
                  
                  secureTextEntry={hidePassword}
                  icon="lock"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                </View>
                
                

                
                  <TouchableOpacity style={styles.buttonbox} onPress={setData}>
                    <Text style={{color:'white'}}>Login</Text>
                  </TouchableOpacity>
                  
                  

                
                <ExtraView>
                  <ExtraText>Forgot Password    | </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>    Register</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            
          
        </InnerContainer>
      </StyledContainer>
      </View>
    </KeyboardAvoidingWrapper>
  );
                }

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={darkLight} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputbox:{
    flex:1,
    height:50,
    color:"white",
    paddingLeft:25,
    paddingEnd:100,
    borderColor:'#ffffff',
    width:270,
    borderWidth:1,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#102c63'
  },
  buttonbox:{
    flex:1,
    height:50,
    color:"#000000",
    paddingLeft:15,
    paddingEnd:15,
    
    borderColor:'#fff',
    width:270,
    borderWidth:1,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    backgroundColor:'#114157'
  },
  header:{
    backgroundColor:'#003f73',
  }
});
