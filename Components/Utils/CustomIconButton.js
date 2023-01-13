import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const CustomIconButton = (props) => {
    return (
        <View>
            <TouchableOpacity
                onPress={props.onPressFunction}
                style={[{
                    height: props.size,
                    width: props.size,
                },
                    {...props.style}]
                }>
                <Ionicons name={props.name} color={props.color} size={props.size}/>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontWeight: "bold",
        fontSize: 15,
    },

});
export default CustomIconButton;