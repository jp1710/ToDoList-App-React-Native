import React from "react";
import { StyleSheet, View } from "react-native";

export const searchStyle = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#104E8B'
    },

    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        elevation: 5,
        marginBottom: 65,
        marginRight: 8,

    },

    item_row: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    item_body: {
        flex: 1
    },

    list: {
        marginHorizontal: 10,
        marginVertical: 0,
        paddingHorizontal: 10,
        backgroundColor: '#1261A0',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
        paddingBottom: 5,
        paddingTop: 5,
        borderRadius: 25,
        marginTop: 15
    },

    title: {
        color: '#ffffff',
        fontSize: 20,
        margin: 5,
    },

    subTitle: {
        color: '#87CEEB',
        fontSize: 16,
        margin: 5,
    },

    delete: {
        justifyContent: 'center',
        width: 50,
        height: 70,
        alignItems: 'center',

    },
    bottomBar: {
        width: '100%',
        fontSize: 20,
        backgroundColor: 'rgb(10,130,200)',
        borderColor: "white",
        borderBottomWidth: 1.5,
        paddingTop: 10
    },
    bottomItems: {
        flexDirection: 'row',
    },
    view: {
        backgroundColor: 'rgb(10,130,200)'
    },
    header: {
        backgroundColor: 'rgb(10,130,200)',
    },
    head: {
        backgroundColor: '#fff',
    },
    heading: {
        paddingTop: 20,
        paddingLeft: 15,
        fontSize: 18,
        color: '#87CEEB',
        fontWeight: 'bold'
    },
    heading1: {
        paddingLeft: 15,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        paddingTop: 10,
        //paddingBottom:10

    },
    list1: {
        marginHorizontal: 10,
        marginVertical: 0,
        paddingHorizontal: 10,
        backgroundColor: '#1261A0',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
        paddingBottom: 5,
        paddingTop: 5,
        borderRadius: 25,
        marginTop: 15
    },
    searchWrapperStyle: {
        backgroundColor: "rgb(10,130,200)",
        flexDirection: "row",
        justifyContent: "space-between",
        //padding: 10,
        
    },
    searchInputStyle: {
        flex: 1,
        fontSize: 16,
        //paddingVertical: 8,
        color: "#FFF",
        fontSize:20,
        backgroundColor:'rgb(10,130,200)',
    },
    bar: {
       flexDirection:'row',
       alignItems: 'center',
       backgroundColor: "rgb(10,130,200)",
       //marginTop:40
    },
    backIcon: {
        backgroundColor: "rgb(10,130,200)",
        paddingLeft:20,
    },
    searchIcon: {
        backgroundColor: "rgb(10,130,200)",
        paddingLeft:20,
        paddingRight:10,
    },
})