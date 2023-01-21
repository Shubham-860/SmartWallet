import {FlatList, Image, LogBox, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import {Ionicons} from "@expo/vector-icons";
import Record from "./SubModules/Record";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";

const AllRecords = () => {



    const {db} = useSelector(state => state.userReducer)



    return (
        <View style={[GlobalStyle.mainBody]}>
            <View style={[GlobalStyle.body]}>

                <View>
                    <Text style={GlobalStyle.textHeading}>
                        All Records
                    </Text>
                </View>

                <View style={{marginBottom:50}}>
                    <FlatList
                        inverted={true}
                        data={db}
                        scrollsToTop={true}
                        // key={index}
                        renderItem={
                            rec => {
                                return (
                                    <TouchableOpacity>
                                        <Record
                                            iconCategory={rec.item.iconCategory}
                                            description={rec.item.description}
                                            income={rec.item.income}
                                            money={rec.item.money}
                                        />
                                    </TouchableOpacity>

                                )
                            }
                        }
                    />
                </View>
                <StatusBar/>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        backgroundColor: 'black',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
    },
    subtext: {
        color: '#8a8a8a',
        fontSize: 15,
        fontWeight: "bold",
    }, btn: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    customBtn: {
        color: '#8a8a8a',
        borderColor: '#8a8a8a',
    },
    img: {

        width: 250,
        height: 250
    }
});
export default AllRecords;