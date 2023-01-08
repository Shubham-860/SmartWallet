import {Image, StyleSheet, Text, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import {Ionicons} from "@expo/vector-icons";

const ExpensesStructure = () => {

    const adjustBalance = () => {
        console.log("adjustBalance")
    };
    const viewRecords = () => {
        console.log("viewRecords")

    };
    return (
        <View style={styles.body}>
            <Text style={GlobalStyle.textHeading}>
                Expenses Structure
            </Text>
            <View style={{margin: 5, paddingLeft: 10}}>
                <Text style={styles.text}>
                    ₹ {"10000"}
                </Text>
                <Text style={styles.subtext}>
                    Last 30 Days
                </Text>
            </View>
            <View style={{alignItems: "center",}}>
                <Image style={styles.img} source={require("../../../assets/Images/Temp/chart.png")}/>
            </View>


            <View>
                <View style={{flexDirection: 'row', paddingLeft: 20}}>
                    <Ionicons name={'ellipse'} color={'red'} size={20}/>
                    <Text style={[GlobalStyle.text,{paddingLeft:15}]}>Food</Text>
                </View>
            </View>

            <View>
                <View style={{flexDirection: 'row', paddingLeft: 20}}>
                    <Ionicons name={'ellipse'} color={'blue'} size={20}/>
                    <Text style={[GlobalStyle.text,{paddingLeft:15}]}>Vehicle</Text>
                </View>
            </View>

            <View>
                <View style={{flexDirection: 'row', paddingLeft: 20}}>
                    <Ionicons name={'ellipse'} color={'green'} size={20}/>
                    <Text style={[GlobalStyle.text,{paddingLeft:15}]}>Financial</Text>
                </View>
            </View>

            <View>
                <View style={{flexDirection: 'row', paddingLeft: 20}}>
                    <Ionicons name={'ellipse'} color={'yellow'} size={20}/>
                    <Text style={[GlobalStyle.text,{paddingLeft:15}]}>Other</Text>
                </View>
            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        backgroundColor: '#2E2D2D',
        padding: 20,
        borderRadius: 20,
        marginVertical: 5
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
export default ExpensesStructure;