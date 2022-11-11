import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { searchStyle } from "./search.style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
//import { setTaskID, setTasks } from '../../redux/actions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search({ navigation }) {
  const data = useSelector((state) => state);
  const tasks = data.tasks.tasks;
  //const { tasks } = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const [filteredData, setfilteredData] = useState([]);
  const [search, setsearch] = useState("");

  // const logOut = async () => {
  //     const input = await AsyncStorage.getItem('UserData');
  //     if (input) {
  //         var enter = {
  //             isLoggedin: '0'
  //         }
  //         AsyncStorage.setItem('UserData', JSON.stringify(enter));
  //     }
  //     console.log(input)
  //     navigation.navigate('Login')
  // }

  const searchFilter = (text) => {
    if (text) {
      const newData = tasks.filter((item) => {
        const itemData = item.task ? item.task : "";
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      console.log("hi:" + JSON.stringify(newData));
      setfilteredData(newData);
      setsearch(text);
    } else {
      setfilteredData([]);
      setsearch(text);
    }
  };

  // useEffect(() => {
  //     getTasks();
  // }, [])

  // const getTasks = () => {
  //     AsyncStorage.getItem('Tasks')
  //         .then(tasks => {
  //             const parsedTasks = JSON.parse(tasks);
  //             if (parsedTasks && typeof parsedTasks === 'object') {
  //                 //dispatch(setTasks(parsedTasks));
  //             }
  //         })
  //         .catch(err => console.log(err))
  // }
  const deleteThisTask = (item) => {
    const taskIndex = tasks.indexOf(item);
    if (taskIndex > -1) {
      dispatch(deleteTask(item));
      console.log(item);
    } else {
      // if (taskIndex > -1){
      // dispatch(deleteTask(item));
      Alert.alert("Value not addded todolist");
    }
  };
  // const deleteTask = (id) => {
  //     const filteredTasks = tasks.filter(task => task.ID !== id);
  //     AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
  //         .then(() => {
  //             //dispatch(setTasks(filteredTasks));
  //             Alert.alert('Success!', 'Task deleted successfully')
  //         })
  //         .catch(err => console.log(err))
  // }

  return (
    <View style={searchStyle.body}>
      <View style={{ backgroundColor: "rgb(10,130,200)" }}></View>

      <SafeAreaView style={searchStyle.bar}>
        <FontAwesome5
          name="chevron-left"
          size={30}
          color={"#fff"}
          onPress={() => navigation.navigate("Dashboard")}
          style={searchStyle.backIcon}
        />

        <FontAwesome5
          name="search"
          size={20}
          color={"#fff"}
          style={searchStyle.searchIcon}
        />

        <View style={searchStyle.searchWrapperStyle}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={"white"}
            style={searchStyle.searchInputStyle}
            value={search}
            onChangeText={(text) => {
              searchFilter(text);
            }}
          />
        </View>
      </SafeAreaView>

      <View style={{ paddingBottom: 30 }}>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={searchStyle.list}
              onPress={() => navigation.navigate("EditTaskScrn", item)}
            >
              <View style={searchStyle.item_row}>
                <TouchableOpacity
                  style={searchStyle.delete}
                  onLongPress={() => {
                    deleteThisTask(item);
                  }}
                >
                  <FontAwesome5
                    name="square"
                    size={25}
                    color={"#fff"}
                    style={{ paddingBottom: 25 }}
                  />
                </TouchableOpacity>

                <View style={searchStyle.item_body}>
                  <Text
                    style={[
                      //globalStyle.CustomFontHW,
                      searchStyle.title,
                    ]}
                    numberOfLines={1}
                  >
                    {item.task}
                  </Text>
                  <Text
                    style={[
                      //globalStyle.CustomFontHW,
                      searchStyle.subTitle,
                    ]}
                    numberOfLines={1}
                  >
                    {item.Date}
                    <Text> </Text>
                    {item.Time}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
