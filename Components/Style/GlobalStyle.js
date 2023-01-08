import {StyleSheet} from "react-native";

const GlobalStyle = StyleSheet.create({
    text: {
        color: 'white',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'white'
    },
    mainBody: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: 'black',
    },
    textHeading: {
        fontSize: 25,
        color: 'white',
        fontWeight: "bold"
    }
})
export default GlobalStyle;