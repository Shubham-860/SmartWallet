import {FlatList, LogBox, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import Record from "./SubModules/Record";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import AllRecords from "./AllRecords";
import {useNavigation} from "@react-navigation/native";


const LastRecordsOverview = (props) => {
    const navigation = useNavigation();
    const {db} = useSelector(state => state.userReducer)
    useEffect(() => {
        // setData(db.filter((val, ind) => ind < 5))
    }, [db]);

    // console.log(db)
    // useEffect(() => {
    //     LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    // }, [db])
    return (
        <View style={[GlobalStyle.body, {flex: 1,height:"100%",width:'100%'}]}>
            <View>
                <Text style={GlobalStyle.textHeading}>
                    Last Records Overview
                </Text>
            </View>

            <View style={{flex: 1}}>

                <FlatList

                    inverted={true}
                    data={db.slice(-5)}
                    // key={index}
                    renderItem={
                        rec => {
                            return (
                                <TouchableOpacity >
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
            <TouchableOpacity onPress={()=> navigation.navigate('All Records')}>
                <Text style={[GlobalStyle.text, {color: 'dodgerblue', fontSize: 18, paddingLeft: 5, marginTop: 5}]}>Show
                    All</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({

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
export default LastRecordsOverview;