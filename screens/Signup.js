import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Appbar } from "react-native-paper";
// formik
import { Formik } from 'formik';

import {
  StyledContainer,
  PageTitle,
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
  SubTitle,
  Colors,
} from './../components/styles';
import { View, TouchableOpacity, ActivityIndicator, Platform,Button,TextInput,Text,StyleSheet} from 'react-native';

const { darkLight, brand, primary,tertiary,title } = Colors;

import { Octicons, Ionicons,AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  const[name,setName]=useState('');
  const[phone,setPhone]=useState('');
  const[address,setAddress]=useState('');
  const[pin,setPin]=useState('');
  const[passval,setPassval]=useState(true);
  const[userval]=useState(true);
  const [setuserval]=useState(false);
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const passValidator=()=>{
    if(pass===''){
      setPassval(true);
      //console.log(setuserval)
      console.log(setPassval)
    }else{
      setPassval(true);
    }
  }
  const [passwordValidError, setPasswordValidError] = useState('');

  const [phoneValidError, setPhoneValidError] = useState('');
  const [pinValidError, setPinValidError] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  
  const handleValidEmail = val => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (val.length === 0) {
      setEmailValidError('* email address must be enter');
      } else if (reg.test(val) === false) {
      setEmailValidError('* enter valid email address i.e  abc@gmail.com');
      } else if (reg.test(val) === true) {
      setEmailValidError('');
      }
  };


  const handleValidPassword = val => {
      let reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      if (val.length === 0) {
      setPasswordValidError('* password must be enter');
      } else if (reg.test(val) === false) {
      setPasswordValidError('* enter valid password');
      } else if (reg.test(val) === true) {
      setPasswordValidError('');
      }
  };

  const handleValidNumber = val => {
      let reg = /^[0]?[789]\d{9}$/;
      if (val.length === 0) {
      setPhoneValidError('* phone number must be enter');
      } else if (reg.test(val) === false) {
      setPhoneValidError('* enter valid number');
      } else if (reg.test(val) === true) {
      setPhoneValidError('');
      }
  };


  const handleValidPin = val => {
      let reg = /^[1-9][0-9]{5}$/;
      if (val.length === 0) {
      setPinValidError('* pincode must be enter');
      } else if (reg.test(val) === false) {
      setPinValidError('* enter valid pincode');
      } else if (reg.test(val) === true) {
      setPinValidError('');
      }
  };
  const signup=()=>{
    const arrayData=[];
    const userdetails={
      email:email,
      pass:pass,
      name:name,
      phone:phone,
      pin:pin,
      address:address,
      
  
    }
    
  
  
    arrayData.push(userdetails);
    try{
       AsyncStorage.getItem('Userdetail').then(value=>{
        if(value!==null){
          const dat=JSON.parse(value);
          dat.push(userdetails);
          AsyncStorage.setItem('Userdetail',JSON.stringify(dat)).then(
            ()=>{
              navigation.navigate('Login');
  
            }
          );
        }else{
          AsyncStorage.setItem('Userdetail',JSON.stringify(arrayData)).then(()=>{
          navigation.navigate('Login');
        
         });
        }
      });
              
    }catch(error){
              console.log(error);
          }
        }

  
  


  return (
    <KeyboardAvoidingWrapper>
      <View style={{flex:1}}>
      <Appbar.Header style={styles.header}>
         <Appbar.BackAction onPress={() => {navigation.navigate('Login')}} /> 
        <Appbar.Content titleStyle={{ marginRight: 150, fontSize:20, fontWeight:'bold',paddingRight:50}} title="Login"/>
      </Appbar.Header>
      <StyledContainer>
        <StatusBar style="light" />
        <InnerContainer>
          {/* <PageTitle>Register Here</PageTitle>
          <SubTitle>Account Signup</SubTitle> */}

         
           
              <StyledFormArea>
              <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',paddingTop:100, paddingBottom:20}}>
                <TextInput
                  style={styles.inputbox}
                  label="Full Name"
                  placeholder="User ID"
                  placeholderTextColor={darkLight} 
                  onChangeText={(text)=>setName(text)}
                  value={name}
                  icon="person"
                />
                </View>
                <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',paddingBottom:20}}>
                <TextInput
                  style={styles.inputbox}
                  label="Password"
                  placeholder="Password"
                  placeholderTextColor={darkLight} 
                  //onChangeText={(text)=>setPass(text)}
                  onChangeText={value => {setPass(value);handleValidPassword(value);}}
                  value={pass}
                  //onBlur={()=>passValidator()}
                  secureTextEntry={hidePassword}
                  icon="lock"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                {passwordValidError ? <Text style={{color:"red"}}>{passwordValidError}</Text> : null}
                {/* {setPassval?null:<Text style={{color:'red'}}>Password should be more than 6 characters</Text>} */}
                </View>
                <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',paddingBottom:20}}>
                <TextInput
                  style={styles.inputbox}
                  label="Email ID"
                  placeholder="Email id"
                  placeholderTextColor={darkLight} 
                  value={email}
                  //onChangeText={(text)=>setEmail(text)}
                  onChangeText={value => {setEmail(value);handleValidEmail(value); }}
                  keyboardType="email-address"
                  icon="mail"
                />
                {emailValidError ? <Text style={{color:"red"}}>{emailValidError}</Text> : null}
                </View>
                <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',paddingBottom:20}}>
                <TextInput
                  style={styles.inputbox}
                  label="Phone number"
                  placeholder="Phone no"
                  placeholderTextColor={darkLight} 
                  //onChangeText={(text)=>setPhone(text)}  
                  onChangeText={value => {setPhone(value);handleValidNumber(value);}}               
                  value={phone}   
                  maxLength={10}              
                  icon="device-mobile"
                  keyboardType="phone-pad"
                  
                />
                 {phoneValidError ? <Text style={{color:"red"}}>{phoneValidError}</Text> : null}
                </View>
                <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',paddingBottom:20}}>
                <TextInput
                  style={styles.inputbox}
                  label="Address"
                  placeholder="Address"
                  placeholderTextColor={darkLight} 
                  onChangeText={(text)=>setAddress(text)}
                  value={address}
                  
                  icon="home"
                />
                </View>
                
                <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',paddingBottom:20}}>
               <TextInput
                  style={styles.inputbox}
                  label="PIN Code"
                  placeholder=" pin code"
                  placeholderTextColor={darkLight}
                  //onChangeText={(text)=>setPin(text)}
                  onChangeText={value => {setPin(value);handleValidPin(value); }}
                  keyboardType="phone-pad"
                  value={pin}
                  maxLength={6}
                  icon="calendar"
                /> 
                {pinValidError ? <Text style={{color:"red"}}>{pinValidError}</Text> : null}
                </View>              
               
                 <TouchableOpacity style={styles.buttonbox} onPress={signup}>
                    <Text style={{color:'white'}}>Register</Text>
                  </TouchableOpacity>

                
                
                

                  {/* <StyledButton onPress={signup}>
                    <ButtonText>Signup</ButtonText>
                  </StyledButton> */}

                  

                

                
                {/* <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Login')}>
                    <TextLinkContent>Login</TextLinkContent>
                  </TextLink>
                </ExtraView> */}
              </StyledFormArea>
            
          
        </InnerContainer>
      </StyledContainer>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword,phno, isDate,address, showDatePicker, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={darkLight} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      

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

export default Signup;
const styles = StyleSheet.create({
  inputbox:{
    flex:1,
    height:50,
    color:"white",
    paddingLeft:105,
    paddingRight:75,
    paddingEnd:10,
    borderColor:'#fff',
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
    borderColor:'#9CA3AF',
    width:270,
    borderWidth:1,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    backgroundColor:'#114157'
  },header:{
    backgroundColor:'#1261A0',
  }
});

