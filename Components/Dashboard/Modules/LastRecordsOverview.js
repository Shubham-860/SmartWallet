import {Image, StyleSheet, Text, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import {Ionicons} from "@expo/vector-icons";
import Record from "./SubModules/Record";

const LastRecordsOverview=({navigation})=>{

    return (
        <View style={GlobalStyle.body}>
            <View>
                <Text style={GlobalStyle.textHeading}>
                    Last Records Overview
                </Text>
            </View>

            <Record />
            <Record />
            <Record />
            <Record />
            <Record />

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