import {Text, View,StyleSheet} from "react-native";
import GlobalStyle from "../Style/GlobalStyle";

const Logout=()=>{
    return(
        <View style={GlobalStyle.mainBody}>
            <Text style={GlobalStyle.text}>
                Logout
            </Text>
        </View>
    )
}
const styles=StyleSheet.create({

});
export default Logout;