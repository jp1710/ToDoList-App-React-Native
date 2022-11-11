import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import Dashboard from './screens/Dashboard';
import TaskCreator from './screens/TaskCreator';
import EditTaskScrn from './screens/EditTaskScrn';
import { Colors} from './components/styles';
import { Provider,useDispatch,useSelector } from 'react-redux';
import reduxStore from './store/reduxStore';
import { Init } from './store/actions';
import { Logoutt} from './store/actions'
import RootStack from './navigators/RootStack';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react';
import { Octicons, Ionicons,Entypo } from '@expo/vector-icons';
import Search from './screens/Search';
const { darkLight, brand, primary, tertiary, secondary } = Colors;

const Stack = createStackNavigator();

const Mystack=()=>{
  
  return(
  <Stack.Navigator initialRouteName="Dashboard"
   options={{
  //   headerStyle: {
  //     marginTop:0,
  //     backgroundColor: '#2696c9',
      
  //   },
  //   headerTintColor: 'white',
    headerTransparent: true,headerLeft:null
    
  //   headerLeftContainerStyle: {
  //   paddingLeft: 10,
  //       },
   }}
  >
    {/* <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} title='Register' /> */}
    <Stack.Screen name="Dashboard" component={Dashboard} title='Home' options={{headerTransparent:true,headerTitle:''}}/>
    <Stack.Screen name="TaskCreator" component={TaskCreator}options={{headerTransparent:true,headerTitle:'',headerLeft:null}} />
    <Stack.Screen name="EditTaskScrn" component={EditTaskScrn}options={{headerTransparent:true,headerTitle:'',headerLeft:null,}} />
    <Stack.Screen name="Login" component={Login} title='Login'options={{headerTransparent:true,headerLeft:null,headerShown:false,headerStyle:{backgroundColor:'white'}}}/>
    <Stack.Screen name="Signup" component={Signup} title='Register'options={{headerTransparent:true,headerTitle:'',headerLeft:null}}/>
    <Stack.Screen name="Welcome" component={Welcome} options={{headerTransparent:true}} />
    <Stack.Screen name="Search" component={Search} options={{headerTransparent:true,headerTitle:'',headerLeft:null}} />
  </Stack.Navigator>
  )
}
const AuthStack=(navigation)=>{
  const dispatch=useDispatch();
  const Logout=()=>{
    dispatch(Logoutt);
    navigation.navigate('Login');
  }
  return(
    
          <Stack.Navigator
            initialRouteName="Welcome"
            
          >
            
            <Stack.Screen name="Welcome" component={Welcome} options={{headerTransparent:true,headerTitle:'',headerLeft:null}} />

                <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
                
              
                <Stack.Screen name="Signup" component={Signup} title='Register' options={{
                //   headerStyle: {
                //   backgroundColor: '#2696c9',
                // },
                // headerTintColor: 'white',
                headerTransparent:true,
                headerTitle:'',headerLeft:null
                // headerLeftContainerStyle: {
                //   paddingLeft: 20,
                // },
                }}  />
                <Stack.Screen name="Dashboard" component={Dashboard} title='Home'options={{
                //   headerStyle: {
                //   backgroundColor: '#2696c9',
                // },
                // headerTintColor: 'white',
                headerTransparent:true,
                headerTitle:'',headerLeft:null
                // headerRight:()=><Octicons name='light-bulb' onPress={()=>Logout} size={20} color='white'/>,
                // headerLeftContainerStyle: {
                //   paddingLeft: 20,
                // },
                }} />
                <Stack.Screen name="TaskCreator" component={TaskCreator} title='New Task'options={{
                //   headerStyle: {
                //   backgroundColor: '#2696c9',
                // },
                // headerTintColor: 'white',
                headerTransparent:true,
                headerTitle:'',headerLeft:null
                // headerLeftContainerStyle: {
                //   paddingLeft: 20,
                // },
                }}/>
                <Stack.Screen name="EditTaskScrn" component={EditTaskScrn} title='New Task'options={{
                //   headerStyle: {
                //   backgroundColor: '#2696c9',
                // },
                // headerTintColor: 'white',
                headerTransparent:true,
                headerTitle:'',headerLeft:null
                // headerLeftContainerStyle: {
                //   paddingLeft: 20,
                // },
                }} />
                <Stack.Screen name="Search" component={Search} options={{headerTransparent:true,headerTitle:'',headerLeft:null}} />
            
          </Stack.Navigator>
        
    
  )
}
const RootNavigation=()=>{
  const token = useSelector(state=>state.AuthReducer.authToken);
  console.log(token);
  const dispatch=useDispatch();
  const init=()=>{
    dispatch(Init());
  }
  useEffect(async()=>{
    init()
     
  },[])
  
 return(
 <NavigationContainer>{
   
  // AsyncStorage.getItem('isAuth').then((value) =>{

  //   console.log(value)
    
  //   // navigation.replace(
    
  //   value === null ? <AuthStack/>:<Mystack/>
    
  //  })
    
      token===null? <AuthStack/>:<Mystack/>

    }
    </NavigationContainer>
 );
}
const App=()=> {
  const {store,persistor}=reduxStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation/>
      </PersistGate>

    </Provider>
    
    
  )
}
export default App;

