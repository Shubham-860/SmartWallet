import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const CustomButton = (props) => {
    return (
        <View>
            <TouchableOpacity
                onPress={props.onPressFunction}
                style={[styles.btn, {...props.style}]
                }>
                <Text style={[styles.text,{color:props.color}]}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontWeight: "bold",
        fontSize: 15,
    },
    btn: {
        borderWidth: 1,
        padding: 3,
        paddingHorizontal: 15,
        borderRadius: 15,
        borderColor: 'white'
    }
});
export default CustomButton;