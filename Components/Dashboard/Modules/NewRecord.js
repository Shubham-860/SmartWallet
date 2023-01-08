import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import {Ionicons} from "@expo/vector-icons";

const NewRecord = () => {
    return (
        <View style={GlobalStyle.mainBody}>
            <Text style={GlobalStyle.text}>
                New Record
            </Text>

        </View>
    )
}
const styles=StyleSheet.create({

});
export default NewRecord;