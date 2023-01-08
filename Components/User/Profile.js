import {Text, View,StyleSheet} from "react-native";
import GlobalStyle from "../Style/GlobalStyle";

const Profile=()=>{
    return(
        <View style={GlobalStyle.mainBody}>
            <Text style={GlobalStyle.text}>
                Profile
            </Text>
        </View>
    )
}
const styles=StyleSheet.create({

});
export default Profile;