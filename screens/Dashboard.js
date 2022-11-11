import React , {useCallback, useEffect, useState} from "react";
import { Colors ,ButtonText,StyledContainer,LeftIcon,StyledInputLabel,StyledTextInput, StyledButton, InnerContainer, StyledFormArea, PageTitle} from '../components/styles';
import {View,StyleSheet,Text,Pressable, ScrollView,FlatList,Button, TouchableOpacity,TextInput, KeyboardAvoidingView, Alert} from 'react-native' ;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Octicons, Fontisto, Ionicons,MaterialIcons } from '@expo/vector-icons';
import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from "react-redux";
import LinearGradient from 'react-native-linear-gradient'; 
//import moment from "moment";
import CheckBox from 'react-native-check-box'
import { Appbar } from "react-native-paper";
import { addTask, deleteTask, updateTask } from "../src/actions/task";
import * as types from '../src/actions/types';
import { Logoutt } from "../store/actions";
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

import moment from "moment";
import { SpeedDial } from "react-native-elements";
const Dashboard = ({navigation})=>{

  const {primary, secondary,title, tertiary, darkLight,red}=Colors;
    const [TaskItem,setTaskItem]=useState([]);
    const[date,setDate]=useState('');
    const [time,setTime]=useState('');
    const [taskItems, setTaskItems] = useState([]);
    const [checked, setChecked] = useState(false);
    const [filteredData,setFilteredData]=useState([]);
    const [masterData,setMasteredData]=useState([]);
    // useEffect(()=>{
    //   fetchPosts();
    //   return()=>{

    //   }
    // },[])
    // const fetchPosts=()=>{
    //   const apiURL='https://jsonplaceholder.typicode.com/posts';
    //   fetch(apiURL)
    //   .then((response)=>response.json())
    //   .then((responseJson)=>{
    //     setFilteredData(responseJson);
    //     setMasteredData(responseJson);
    //   }).catch((error)=>{
    //     console.error(error);
    //   })
    // }
    // const searchFilter  =(text)=>{
    //   if(text){
    //     const newData=masterData.filter((item)=>{
    //       const itemData=item.task?item.task.toUpperCase():''.toUpperCase();
    //       const textData=text.toUpperCase();
    //       return itemData.indexOf(textData)>-1;
    //     });
    //     setFilteredData(newData);
    //     setsearch(text );
    //   }else{
    //     setFilteredData(masterData);
    //     setsearch(text);

    //   }
      
    // }
    function MyCheckbox() {
      const [checked, onChange] = useState(false);
    function onCheckmarkPress() {
        onChange(!checked);
      }
    
      return (
        <Pressable
          style={[styles.checkboxBase, checked && styles.checkboxChecked]}
          onPress={onCheckmarkPress}>
          {checked && <MaterialIcons name="check" size={30} color="black" />}
        </Pressable>
      );
    }

    
  
    const weekArray=[];
    const otherWeekArray=[];
    const todayArrray=[];
    const newArray=[];
    const dispatch = useDispatch();
    
    //const deleteCurrent = (key) => dispatch(deleteTask(key))
    const data=useSelector(state=>state);
    const tasks=data.tasks.tasks;
    tasks.sort(function(a,b){
      return a.id - b.id;
    });
    // let sortedItem=tasks.sort((a,b)=>new Date(...a.Date.split('/').reverse())-new Date(...b.Date.split('/').reverse()));
    // console.log(sortedItem);
    var todayDate = new Date();
    console.log(todayDate);
    //var currDate = moment(tasks.Date).format('DD') ;
    
    var today=moment(todayDate).format('DD/MM/YYYY')
    const day=moment(todayDate).format('dddd')
    const Datee=moment(todayDate).format('DD')
    const Month=moment(todayDate).format('MM')
    moment.locale();
    var a = moment(todayDate).startOf('week').format('DD/MM/YYYY');
    var b = moment(todayDate).endOf('week').format('DD/MM/YYYY');
    //var b= a+5;
    console.log(Datee);
    console.log(day);
    console.log(today);
    var timee=moment(todayDate).format('h:mm A')
    console.log(timee);
    var cFDate = moment(todayDate).startOf('week').format('DD');
    var c= parseInt(cFDate)-24;
    var dLDate = moment(todayDate).endOf('week').format('DD');
    var d= parseInt(Datee)-parseInt(dLDate)+7;
    console.log(a);
    console.log(b);
    console.log(c);
  
    // var cur_month=todayDate.getMonth()+1;
    // var cur_day=todayDate.getDate();
    // var cur_year=todayDate.getFullYear();
    
    tasks.filter(function(item){
      var TaskDate=item.Date;

  
      console.log(item.Date);
      var spl=item.Date.split('/');
      console.log(spl[0]);
      console.log(spl[1]);
     //var TDate=TaskDate.getDate();
    //  var TDate = moment(TaskDate).format('DD') ;
    //   var TMon = moment(TaskDate).format('MM') ;
      var TNMon=parseInt(spl[1])+1;
      //var TYear = moment(TaskDate).format('YYYY') ;
      var nxtMonth= moment(todayDate).add(1,'M').format('MM');
      //var TaskNxtMonth= moment(TkDate).add(1,'M').format('MM');
   console.log(TNMon);

      
      if(spl[0]==Datee&&spl[1]==Month){
        newArray.push(item)
        todayArrray.push(item)
      }
      
      else if((spl[0]>=cFDate||spl[0]>=d)&&(spl[0]<=dLDate || spl[0]<=d )&& (spl[1]==Month||spl[1]==nxtMonth)){
        console.log("this week");
        newArray.push(item)
        weekArray.push(item)
      }
      else{
        newArray.push(item)
        otherWeekArray.push(item)
      }
      // if (moment(currDate).format('DD')==Datee){
      //   console.log('its because of only date');
      // }
      weekArray.sort(function(a,b){
        a=a.Date.toString().split('/');
        b=b.Date.toString().split('/');
        return a[2]-b[2]||a[1]-b[1]||a[0]-b[0];

      });
      otherWeekArray.sort(function(a,b){
        a=a.Date.toString().split('/');
        b=b.Date.toString().split('/');
        return a[2]-b[2]||a[1]-b[1]||a[0]-b[0];

      });
      todayArrray.sort(function(a,b){
        a=a.Date.toString().split('/');
        b=b.Date.toString().split('/');
        return a[2]-b[2]||a[1]-b[1]||a[0]-b[0];

      });
    })
  
    
    
    const Logout=async()=>{
      const input = await AsyncStorage.getItem('token');
        if (input) {
            var enter = {
                isLoggedin: '0'
            }
            AsyncStorage.setItem('UserData', JSON.stringify(enter));
        }
        console.log(input)
        navigation.navigate('Login')
    }

      //console.log('hi')
    //   dispatch(Logoutt);
    //   navigation.navigate('Login');
    // }
    const deleteThisTask=(item)=>{
      const taskIndex= tasks.indexOf(item);
      if (taskIndex > -1){
        dispatch(deleteTask(item));
        console.log(item)
      }else{
        // if (taskIndex > -1){
        // dispatch(deleteTask(item));
        Alert.alert('Value not addded todolist')
        
      }
    }
    const editThisTask=(item)=>{
      dispatch(updateTask);
      navigation.navigate('TaskCreator');
      

    }
     const chum=new Date();
//      Notifications.setNotificationHandler({
//       handleNotification:async()=>{
//         return{
//           shouldShowAlert:true,
//           shouldPlaySound:true,
//           shouldSetBadge:true
//         }
//       }
//     });
    
//      const fun = async() => {
//       var datee = new Date(tasks.Date);
//       datee.setSeconds(0);
//       datee.setMilliseconds(0);
//       console.log(datee);
//       var curr = new Date();
//       curr.setMilliseconds(0);
      
//       if(timee===tasks.Time)
//       {
//         console.log('hi');
//         trigNot()
//       }
//   }
// useEffect(()=>{
  
//       //Permissions.getAsync(Permissions.NOTIFICATIONS)
//       if(tasks.Date!==Datee)
//       {
//         let {status} = Notifications.getPermissionsAsync();
//         if(status!=='granted')
//         {
//           status =  Notifications.requestPermissionsAsync();
//           //return Permissions.askAsync(Permissions.NOTIFICATIONS);
//         }
//         if(status!=='granted')
//         {
//           return;
//         }
//         const subscription = Notifications.addNotificationReceivedListener(notification=>{
//               console.log(notification);
//             });
//             return()=>{
//               subscription.remove();
//             };
//       }
    
// },[])
   

//     const trigNot =async() => {
//       console.log('triggereddddddd');
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: "TODO-LIST",
//           body: item.tasks.task,
//           sound: 'custom',
//           categoryIdentifier: "reminder",
//         },
//         trigger: {
//           seconds: 1,
//         },
//       });
//   };
//   const componentDidMount=()=>{
//     interval = setInterval(()=>{fun},1000);
//   }
//   useEffect(()=>{
//     const mount=setTimeout(() => {
//       fun()
      
//     }, 1000); 
//   },[])
    

    //const tasks = useSelector(state =>state.taskReducer.taskList)
  
    // const handleAddTask = () => {
    //     console.log(task);
        
    //     Keyboard.dismiss();
    //     setTaskItems([...taskItems, task])
    //     setTask(null);
    // }
    // const completeTask = (index) => {
    //   let itemsCopy = [...taskItems];
    //   itemsCopy.splice(index, 1);
    //   setTaskItems(itemsCopy)
    //}
   
    
      
      const taskList=()=>{
        
    //     var first = todayDate.getDate()-todayDate.getDay();
    // var last =first +6;
    // var firstday=new Date(todayDate.setDate(first)).toLocaleDateString('en-GB');
    // var lastday=new Date(todayDate.setDate(last)).toLocaleDateString('en-GB');
    // var curr=todayDate.toLocaleDateString('en-GB');
    // //var parts=tasks[2].Date.split('/');
    // var month=parts[1];
    // var today=parts[0];
    // var currParts=curr.split('/');
    // if(tasks[2].Date>=firstday&&tasks[2].Date<=lastday&&month===currParts[1]){
    //   console.log("this week");
    // }
   
    // //console.log(currParts[1]);
    // if(month===currParts[1]){
    //   console.log('this month');
    // }
    // if(today===currParts[0]&&month===currParts[1]){
    //   console.log('today');
    // }
        
      return(
        <View style={{flex: 1}}>
           {
            (todayArrray=='')?null:<Text style={{color:'#67b5f5',fontSize:18,fontWeight: 'bold'}}>Today</Text>
          }
          <View style={{paddingTop:2,paddingBottom:15}}>
          
          <FlatList 
            data={todayArrray}
            keyExtractor={(item, index) => index.toString()}
            // ListHeaderComponent={tasks.Date}
            renderItem={({item})=>(
             
              
              <View style={styles.list}>
              
                {/* <Octicons style={styles.iconstyl} onPress={()=>deleteThisTask(item)} name='trashcan' size={30} color={red}/>   */}
                    <View style={{ justifyContent:'center', marginEnd : 10,paddingEnd:1,height:55}}>
                    <MyCheckbox/>
                    {/* <CheckBox
                style={{ padding: 1,top:10}}
                onClick={()=>{
                  setChecked(!checked)
                  console.log(true);
                }}
                checkBoxColor='white'
                // {setChecked ? deleteThisTask(item):null}
              /> */}
                      <TouchableOpacity  onPress={()=>navigation.navigate('EditTaskScrn',item)} onLongPress={()=>deleteThisTask(item)} >
                      <Text style={{fontSize:20,paddingLeft:30,top:-15,color:'white'}}>{item.task}</Text>
                      <Text style={{fontSize:16,fontWeight: 'bold',top:-15,paddingLeft:30,color:'#67b5f5'}}>{item.Date}    {item.Time}</Text>
                      </TouchableOpacity>
                    </View>
               </View>
              
              
              )}
            />
            </View>
          
          {
            (weekArray=='')?null:<Text style={{color:'#67b5f5',fontSize:18,fontWeight: 'bold'}}>This Week</Text>
          }
          <View style={{paddingTop:2,paddingBottom:15}}>
          
          <FlatList 
            data={weekArray}
            keyExtractor={(item, index) => index.toString()}
            // ListHeaderComponent={tasks.Date}
            renderItem={({item})=>(
             
              
              <View style={styles.list}>
              
                {/* <Octicons style={styles.iconstyl} onPress={()=>deleteThisTask(item)} name='trashcan' size={30} color={red}/>   */}
                    <View style={{ justifyContent:'center', marginEnd : 10,paddingEnd:1,height:55}}>
                    <MyCheckbox/>
                    {/* <CheckBox
                style={{ padding: 1,top:10}}
                onClick={()=>{
                  setChecked(!checked)
                  console.log(true);
                }}
                checkBoxColor='white'
                // {setChecked ? deleteThisTask(item):null}
              /> */}
                      <TouchableOpacity  onPress={()=>navigation.navigate('EditTaskScrn',item)} onLongPress={()=>deleteThisTask(item)} >
                      <Text style={{fontSize:20,paddingLeft:30,top:-15,color:'white'}}>{item.task}</Text>
                      <Text style={{fontSize:16,fontWeight: 'bold',top:-15,paddingLeft:30,color:'#67b5f5'}}>{item.Date}    {item.Time}</Text>
                      </TouchableOpacity>
                    </View>
               </View>
              
              
              )}
            />
            </View>
            {
            (otherWeekArray=='')?null:<Text style={{color:'#67b5f5',fontSize:18,fontWeight: 'bold'}}>Others</Text>
          }
          <View style={{paddingTop:2}}>
          
          <FlatList 
            data={otherWeekArray}
            keyExtractor={(item, index) => index.toString()}
            // ListHeaderComponent={tasks.Date}
            renderItem={({item})=>(
             
              
              <View style={styles.list}>
                {/* <Octicons style={styles.iconstyl} onPress={()=>deleteThisTask(item)} name='trashcan' size={30} color={red}/>   */}
                <View style={{ justifyContent:'center', marginEnd : 10,paddingEnd:1,height:55}}>
                  <MyCheckbox/>
                    {/* <CheckBox
                style={{ padding: 1,top:10}}
                onClick={()=>{
                  setChecked(!checked)
                  console.log(true);
                }}
                checkBoxColor='white'
                // {setChecked ? deleteThisTask(item):null}
              /> */}
                      <TouchableOpacity  onPress={()=>navigation.navigate('EditTaskScrn',item)} onLongPress={()=>deleteThisTask(item)} >
                      <Text style={{fontSize:20,paddingLeft:30,top:-15,color:'white'}}>{item.task}</Text>
                      <Text style={{fontSize:16,fontWeight: 'bold',top:-15,paddingLeft:30,color:'#67b5f5'}}>{item.Date}    {item.Time}</Text>
                      </TouchableOpacity>
                    </View>
               </View>
              
              
              )}
            />
            </View>
            
        </View>

      );
          }
    return(
      <View style={{flex:1}}>
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="check" color="rgb(10,130,200)" style={styles.head} size={20}  onPress={Logout} />
          <Appbar.Content titleStyle={{ fontSize:20, fontWeight:'bold' }} title="All Lists" />
          <Appbar.Action icon="magnify" onPress={()=>{navigation.navigate('Search',tasks)}} />
          <Appbar.Action icon='dots-vertical' onPress={() => {}} />
        </Appbar.Header>
      
      <StyledContainer>
        
      <InnerContainer>
          <StatusBar style='dark'/>
          {/* <PageTitle>Your Dashboard</PageTitle> */}
         {/* <StyledFormArea>  */}
           <View style={styles.listbox}>
           {taskList()}
           </View>
           
          


  
          {/* </StyledFormArea> */}
          
      </InnerContainer>
           <TouchableOpacity onPress={()=>navigation.navigate('TaskCreator')}>
              <View style={styles.addWrapper}>
                  <Octicons name="plus" size={30} color='#1d56b3' />
              </View>
             </TouchableOpacity>
      </StyledContainer>
      </View>
  
    ) 
  
  
}




const styles = StyleSheet.create({
  head:{
    backgroundColor:'white'

  },
  checkboxBase: {
    width: 24,
    height: 24,
    top:10,
    padding:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    // backgroundColor: '#1261A0',
    backgroundColor:'white'
    
  },
    container: {
      flex: 1,
      backgroundColor: '#2471A3',
    },
    mainBody: { 
      flex: 1, 
      justifyContent: 'center', 
      alignContent: 'center', 
      padding:2 
    }, 
    list: {
      padding:10,
      backgroundColor:'#1261A0',
      borderColor:'rgba(85, 168, 224, 1)',
      borderWidth:0.5,
      width:340,
      marginVertical:10,
      borderRadius:20,
    },
    tasksWrapper: {
      paddingTop: 90,
      paddingHorizontal: 20,
    },
    text_header: {
        justifyContent:'center',
        alignContent:'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10,
        paddingTop:0,
        paddingBottom:0
    },
    listContainer: {
      backgroundColor: '#ffffff',
      padding: 160
    },
    listText: {
      fontSize: 30
    },
    sectionTitle: {
      flex:1,
      justifyContent:'center',
      
      color:'#ffff',
      
            fontSize: 30,
      fontWeight: 'bold',
      top:110,
      alignItems:'flex-start',
      alignContent:'flex-end',
      paddingVertical:1,
      paddingStart:1,
      paddingRight:1,
      padding: 0.1,
    },
    iconstyl:{
      right:10,
      //left: 15,
      top: 12,
      position: 'absolute',

    },
    header: {
        // minWidth:50,
        // borderRadius:30,
        // flex: 1,
        // alignContent:'center',
        // alignItems:'center',
        backgroundColor:'#1261A0',
    //     justifyContent: 'center',
    //     flexDirection:'row',
    //     paddingHorizontal: 20,
    //     paddingBottom: 150
    },
    items: {
      marginTop: 30,
    },
    writeTaskWrapper: {
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex:1
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      fontWeight:'400',
      color:'#fff',
      backgroundColor: '#6D28D9',
      borderRadius: 60,
      fontWeight:'bold',
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom:10,
        paddingTop:10,
        paddingHorizontal: 10,
        
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        borderColor: '#1F618D',
        flexDirection:'row',
        alignSelf:'flex-end'
    },
    addText: {
      fontSize:25,
      position:'absolute',
    
      
      color:'#fff',
      fontWeight:'bold'
    },
  });
  // const mapStateToProps =(state)=>{
  //   return{
  //     tasks:state.taskReducer.taskList
  //   }
  // }
  // const mapDispatchToProps=(dispatch)=>{
  //   return{
  //     delete:(key)=>dispatch(deleteTask(key))
  //   }
  // }
  //const mapStateToProps = state => state;
  //const mapDispatchToProps = dispatch => ({
   // updatetasks: taskList => dispatch({
     //   type: types.ADD_TASK, payload: {
       // taskList
    //}})
//});
// const connectComponent = connect(mapStateToProps, mapDispatchToProps);

//   export default connectComponent(Dashboard);
  export default Dashboard;