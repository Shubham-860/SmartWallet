import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import Record from "./SubModules/Record";
import {useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {auth} from "../../../firebase";

const AllRecords = ({navigation}) => {


    const {db} = useSelector(state => state.userReducer)
    const flatListRef = useRef(null);

    console.log("db.length :",db.length)
    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (!user) {
                navigation.navigate('Login');
            }
        });
    }, []);

    return (
        <View style={[GlobalStyle.mainBody, {paddingBottom: 30}]}>
            <View style={[GlobalStyle.body, {paddingBottom: 35}]}>

                <View>
                    <Text style={GlobalStyle.textHeading}>
                        All Records
                    </Text>
                </View>

                <View>
                    <FlatList
                        ref={flatListRef}

                        data={db.reduce((acc, val) => [val, ...acc], [])}
                        // key={index}
                        renderItem={
                            rec => {
                                // {console.log(rec.item.id)}
                                // {console.log(rec.item.date)}
                                return (
                                    <TouchableOpacity onPress={() => {
                                        // console.log("pressed");
                                        navigation.navigate("EditRecord", {id: rec.item.id})
                                    }}>
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
export default AllRecords;