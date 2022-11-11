import React, {useState,useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Image,Text,FlatList, View, TextInput,Button, TouchableOpacity, Keyboard, Platform, Alert } from 'react-native';
import { Colors ,ButtonText,StyledContainer,LeftIcon,StyledInputLabel,StyledTextInput, StyledButton, InnerContainer2, StyledFormArea, PageTitle} from '../components/styles';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Octicons, Ionicons,Entypo,MaterialIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Appbar } from "react-native-paper";
import { useDispatch, useSelector } from 'react-redux';
import { addTask,updateTask} from '../src/actions/task';
import { Icon } from 'react-native-elements';
import * as Notifications from 'expo-notifications';
import moment from "moment";
Notifications.setNotificationHandler({
  handleNotification:async()=>{
    return{
      shouldShowAlert:true,
      shouldPlaySound:true,
      shouldSetBadge:true
    }
  }
});


const {primary, secondary,title, tertiary, white,darkLight}=Colors;
const EditTaskScrn=({navigation,route})=>  {
  useEffect(() => {
    let {status} = Notifications.getPermissionsAsync();
    if(status!=='granted')
    {
        status =  Notifications.requestPermissionsAsync();
    
    }
    if(status!=='granted')
    {
        return;
    }
}, []);
const triggerNotificationHandler = () => {
  var date = dateValue;
  console.log("date value")
  var newdate = date.split("/").reverse().join("-");
  var momentObj = moment(newdate + timeValue, 'YYYY-MM-DDLT');
  var d = new Date(momentObj);
  console.log(d);
  console.log('heyyyyyyyyyyy');
  var o = d.getTime();
  console.log(o);
  
  console.log(new Date().getTime())

  Notifications.scheduleNotificationAsync({
  content: {
      title: EnteredTask,
      body: dateValue ,
      sound: 'mySoundFile.wav', 
      color:"blue",

  },
  trigger: 
  {
    
      seconds: 2
      
  },
  });
};
  
    //const [checked, setChecked]=useState(false);
    // const getDetails=(type)=>{
    //   //console.log(route.params)
    //   if(route.params){
    //     switch(type){
    //       case "EnteredTask":
    //         return route.params.EnteredTask
    //       case "dateValue":
    //         return route.params.dateValue
    //       case "timeValue":
    //         return route.params.timeValue
    //       default:
    //         return null
    //     }

    //   }
    //   return ''
    // }
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('');
    const [show, setShow] = useState(false);
    const [time, setTime] = useState(new Date());
    const [taskItem,setTaskItem] = useState('');
    
    //  const [EnteredTask,setEnteredTask] = useState('');
    //  const [dateValue, setDateValue] = useState('');
    // const [timeValue, setTimeValue] = useState('');
    const[EnteredTask,setEnteredTask]=useState(route.params.task);
    
    const [dateValue, setDateValue] = useState(route.params.Date); 
    const [timeValue, setTimeValue] = useState(route.params.Time);
    
    const dispatch = useDispatch();

    //const submitTask = (task) => dispatch(addTask(task))
    const data=useSelector(state=>state);
    const tasks=data.tasks.tasks;
    // const addTaskToList=()=>{
    //   if(EnteredTask!=''){
    //     dispatch(addTask(EnteredTask));
    //     setEnteredTask('');
    //   }else{
    //     Alert.alert('Task already exists');
    //   }
    // }

    const onChangeIos = (event, selectedValue) => {
      setShow(Platform.OS !== 'ios');
      if (mode == 'date') 
          {
          const currentDate = selectedValue || new Date();
          setDate(currentDate);
          setMode('time');
          var dateText = currentDate.getDate() + "/" + (currentDate.getMonth()+1)+"/"+(1900+currentDate.getYear());
          setDateValue(dateText);
          setShow(Platform.OS === 'ios'); // to show time
          }
      else {
        {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      let am_pm,hour,minute=(selectedTime.getMinutes());
      if(selectedTime.getHours()===0) hour=12;
          else if(selectedTime.getHours()>12) hour=selectedTime.getHours()-12;
          else hour=selectedTime.getHours();
          
          if(selectedTime.getHours()>11) am_pm='PM';
          else am_pm='AM';

          let timeText = hour+":"+(
              (minute<10)?("0"+minute):minute)+" "+am_pm;
      setTimeValue(timeText);
      setTime(selectedTime);
      setShow(Platform.OS !== 'ios'); // to hide back the picker
      setMode('date'); // defaulting to date for next open
      }
    }
  };


    const onChange = (event, selectedValue) => {
            setShow(Platform.OS === 'ios');
            if(mode=='date'){
                if(event.type=="set")
                {
                    const currentDate = selectedValue || date;
                    setDate(currentDate);
                    var dateText=currentDate.getDate()+'/'+(currentDate.getMonth()+1)+'/'+(1900+currentDate.getYear());
                    setDateValue(dateText);
                }else
                {
                    return null;
                }
            }else{
                if(event.type=="set"){
                    const selectedTime=selectedValue||time;
                    let am_pm,hour,minute=(selectedTime.getMinutes());

                    if(selectedTime.getHours()===0)hour=12;
                        else if(selectedTime.getHours()>12) hour=selectedTime.getHours()-12;
                        else hour=selectedTime.getHours();
                    
                    if(selectedTime.getHours()>11) am_pm='PM';
                        else am_pm= 'AM';
                    let timeText=hour+":"+(
                         (minute<10)?("0"+minute):minute)+" "+am_pm;
                        setTime(selectedTime);
                        setTimeValue(timeText);
                    }
                    else

                    {
                        return null;
                    }
            
            };
    };
    

        const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
        };

        const showDatepicker = () => {
            showMode('date');
        };

        const showTimepicker = () => {
            showMode('time');
        };
        const alertDate=()=>{
            Alert.alert("Task is Missing");
        }
        const taskInputHandler = (enteredText) =>  {
            setEnteredTask(enteredText); 
        } 

        const addTaskHandler = () => {
          if (EnteredTask!='') {
            if (tasks.length>=1){
              // let lastId=tasks[tasks.length-1]
              // let newId=1;
          dispatch(updateTask({
            
              oldData:{
                  id:route.params.id,
                  task:route.params.task,
                  Date:route.params.Date,
                  Time:route.params.Time,
              },
            id:route.params.id,
            task:EnteredTask,
            Date:dateValue,
            Time:timeValue
          }));
        }else{
          let newId=1;
          dispatch(updateTask({
            
            oldData:{
                id:route.params.id,
                task:route.params.task,
                Date:route.params.Date,
                Time:route.params.Time,
            },
            id:newId,
          task:EnteredTask,
          Date:dateValue,
          Time:timeValue
        }));
        }
          console.log(tasks)
          // dispatch(addTask(task));
          // dispatch(addTask(Datee));
          // dispatch(addTask(Time));
          navigation.navigate('Dashboard',{taskData:taskItem}) 
          
          taskInputHandler('');
          } else {
          Alert.alert(`Already added in Todo List or todo is empty`);
          }
          };



    return(
      <View style={{flex:1}}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => {navigation.navigate('Dashboard')}} />
        <Appbar.Content titleStyle={{ marginRight: 150, fontSize:20, fontWeight:'bold' }} title="Edit Task"/>
      </Appbar.Header>
      
        
        <StyledContainer>
            
                <StatusBar style='dark'/>
                

               
                <InnerContainer2>
            
                <StyledFormArea> 
               <Text style={{fontWeight:'bold',color:'#67b5f5'}}>What is to be done?</Text>
               <View style={styles.contt}> 
                 <TextInput style={styles.inputtbox}
                 label='What is to be done?'
                  placeholder="Enter Task Here" 
                  placeholderTextColor="#8b9cb5"  
                  //value={task}
                  //onChangeText={(task)=>setTask(task)}
                  value={EnteredTask}
                  autoFocus={true}
                  
                  onChangeText={taskInputHandler}
                  placeholderTextColor ={tertiary} 
                  
                  /> 
                  <MaterialIcons style={styles.micIconstyl} onPress={taskInputHandler} name='mic' size={25} color={white}/>
                  {/*<Button onPress={()=>submitTask(task), setTask('')} title='Add Task' />*/}

                  </View>
                  <Text style={{fontWeight:'bold',color:'#67b5f5'}}> Due date</Text>
                <View style={styles.cont}> 

                 <TextInput style={styles.inputtbox}
                 label='Due date'              
                  placeholder="Date not set" 
                  placeholderTextColor={tertiary}
                  value={dateValue}
                  icon='calendar' 
                  onFocus={showDatepicker}
                  
                  
                  
                  
                />
                <Octicons style={styles.micIconstyl} onPress={showDatepicker} name='calendar' size={25} color={white}/>
                  
                  
                  
                
                </View>
                
                  
                 
                {(dateValue!=='') && (
                  
                <View style={styles.cont}>
                  {/* <Text style={{fontWeight:'bold',color:'#67b5f5'}}> Due Time</Text>  */}
                    <TextInput style={styles.inputtbox}
                        placeholder='Time not set'
                        
                        backgroundColor='#003f73'
                        placeholderTextColor ={tertiary} 
                        onFocus={(date!=='')?showTimepicker:alertDate}
                        value={timeValue}
                        icon='clock'
                    />
                  <Octicons style={styles.clkIconstyl} onPress={(date!=='')?showTimepicker:alertDate} name='clock' size={25} color={white}/>
                </View>
                    
            
            )}
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={(mode==='Date')?date:time}
                    //value={(mode!=='date')?time:date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={(Platform.OS==='ios')?onChangeIos:onChange}
                    />
                   
                   
                )}
                <TouchableOpacity onPress={triggerNotificationHandler}>
                {/* <TouchableOpacity> */}
                  <View >
                    <Text style={{fontWeight:'bold',color:'#67b5f5',textDecorationLine:'underline'}}>Notifications</Text>
                    <Text style={{fontSize:14,color:'white'}}>Day summar on the same day at 8:00am.</Text>
                    <Text style={{fontSize:14,color:'white'}}>Individual notification on time</Text>
                  </View>
                  
                </TouchableOpacity>
                {/* <Button title='Notification' onPress={triggerNotificationHandler}/> */}
                  
                
                
                
        
                </StyledFormArea>
                
        
            
            
                </InnerContainer2>
               
                <View style={styles.addWrapper} >
                   <TouchableOpacity onPress={addTaskHandler}>
                    <View >
                        <Octicons name="check" size={30} color='#1d56b3' />
                    </View>        
                </TouchableOpacity>
                </View>

            </StyledContainer>
            </View>
        
          ) ;
        
        } 
     
        


const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatepicker, ...props }) => {
    return (
      <View>
        <LeftIcon>
          <Octicons name={icon} size={30} color={white} />
          
        </LeftIcon>
        
        <StyledInputLabel>{label}</StyledInputLabel>
        {!isDate && <StyledTextInput {...props} />}
        {isDate && (
          <TouchableOpacity onPress={showDatepicker}>
            <StyledTextInput {...props} />
          </TouchableOpacity>
        )}
      </View>
    );
        };


const styles = StyleSheet.create({
    buttonText:{
        color:'#ffffff',
        fontSize:18,
        fontWeight:'bold',
        width:'30%',
    },
    contt:{
      justifyContent:'center',paddingBottom:50
    },
    cont:{
      justifyContent:'center',
      paddingBottom:-70,
      height:50
    },
    
    buttons:{
        padding:10,
        backgroundColor:'#6D28D9',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        marginVertical:5,
        height:60,
        width:'80%'

    },
    inputbox:{
      backgroundColor: '#194d7d',
      padding: 5,
      paddingLeft: 25,
      paddingRight: 55,
      borderRadius: 5,
      fontSize: 16,
      height: 50,
      maxWidth:200,
      justifyContent:'flex-start',
      alignContent:'flex-start',
      alignItems:'flex-start',
      marginVertical: 3,
      marginBottom: 10,
      color:'#ffffff'
    },
    inputtbox:{
      backgroundColor: '#003f73',
      padding: 1,
      paddingLeft: 25,
      paddingRight: 55,
      borderRadius: 5,
      fontSize: 16,
      borderBottomWidth:1,
      borderBottomColor:'#098ae3',
      height: 50,
      maxWidth:440,
      justifyContent:'flex-start',
      alignContent:'flex-start',
      alignItems:'flex-start',
      marginVertical: 3,
      marginBottom: 10,
      color:'#ffffff'
    },
    iconstyl:{
      right:60,
      //left: 15,
      top: 8,
      position: 'absolute',

    },
    clkIconstyl:{
      right:-35,
      //left: 15,
      top: 6,
      paddingVertical:15,
      position: 'absolute',

    },
    micIconstyl:{
      right:-35,
      //left: 15,
      top: 24,
      position: 'absolute',

    },
    

    
    ImageIconStyle: {
      padding: 23,
      margin: 2,
      height: 10,
      width: 30,
      margin:1,

    
   },
    container: {
      flex: 1,

      backgroundColor: '#2471A3',
    },
    tasksWrapper: {
      paddingTop: 10,
      paddingHorizontal: 60,
      paddingEnd:50,
      paddingVertical:60,
      paddingLeft:300,
      flexDirection:'row',
      alignContent:'flex-end'
    },
    text_header: {
        justifyContent:'center',
        alignContent:'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10,
        
    },
    sectionTitle: {
      flex:1,
      justifyContent:'center',
      
      color:'#ffff',
      fontSize: 30,
      fontWeight: 'bold',
      top:110,
      paddingBottom:80,
      
      alignItems:'center',
      alignContent:'center',

      padding: 1,
    },
    header:{
      backgroundColor:'#1261A0',
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
      alignItems: 'center'
    },
 
    footer: {
        flex: 40,
        backgroundColor: '#2471A3',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom:10,
        paddingTop:10,
        paddingHorizontal: 10,
        
    },
    addWrapper: {
      width: 60,
      height: 60,
      top:-10,
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
    mainBody: { 
        flex: 1, 
        justifyContent: 'flex-start', 
        alignContent: 'center', 
      }, 
      container: { 
        flex: 1, 
        backgroundColor: '#E8EAED', 
      }, 
      input: 
      {
        flex: 1, 
        color: '#000000', 
        paddingLeft: 10, 
        paddingRight: 10, 
        borderWidth: 1, 
        borderRadius: 10, 
        borderColor: '#FFFFFF', 
        backgroundColor:'#002082', 
      }, 
      SectionStyle: { 
        flexDirection: 'row', 
        height: 40, 
        marginTop: 20, 
        marginLeft: 50, 
        marginRight: 50, 
        margin: 10, 
        justifyContent: 'flex-start', 
      },  
        inputt: { 
          margin: 10, 
          paddingVertical: 6, 
          borderBottomWidth: 1, 
          borderBottomColor: 'grey', 
        }, 
    
        TextStyle:{ 
    
          fontWeight: 'bold', 
        }, 
  });
 // const mapStateToProps =(state)=>{
    
   // return{
     // tasks:state.taskReducer.taskList
  //   }
  // }
  // const mapDispatchToProps=(dispatch)=>{
  //   console.log(taskList)
  //   return{
  //     add:(key)=>dispatch(addTask(key))
  //   }
  // }
  {/*
  const mapStateToProps = state => state;
  const mapDispatchToProps = dispatch => ({
    updatetasks: taskList => dispatch({
        type: types.ADD_TASK, payload: {
        taskList
    }})
});
  */}
  
//const connectComponent = connect(mapStateToProps, mapDispatchToProps);

 
  export default EditTaskScrn;