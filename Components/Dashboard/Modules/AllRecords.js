import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import Record from "./SubModules/Record";
import {useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {auth} from "../../../firebase";

const AllRecords = ({navigation}) => {


    const {db} = useSelector(state => state.userReducer)
    const flatListRef = useRef(null);

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (!user) {
                // navigation.navigate('Login');
            }
        });
    }, []);

    useEffect(() => {
        handleRefresh();
    }, [db]);

    const handleRefresh = () => {
        // flatListRef.current.scrollToOffset({offset: 100 * db.length, animated: true});
    };


    return (
        <View style={[GlobalStyle.mainBody]}>
            <View style={[GlobalStyle.body]}>

                <View>
                    <Text style={GlobalStyle.textHeading}>
                        All Records
                    </Text>
                </View>

                <View style={{marginBottom: 50}}>
                    <FlatList
                        ref={flatListRef}
                        inverted
                        data={db}
                        // key={index}
                        renderItem={
                            rec => {
                                // {console.log(rec.item.id)}
                                // {console.log(rec.item.date)}
                                return (
                                    <TouchableOpacity onPress={()=>console.log("pressed")}>
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