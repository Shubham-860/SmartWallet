import {StyleSheet} from "react-native";
import {bg, containerBg,} from "../FixColors";

const GlobalStyle = StyleSheet.create({
    text: {
        color: 'white',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'white',
        color: "white",

    },
    mainBody: {
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 3,
        backgroundColor: bg,
    },
    body: {
        backgroundColor: containerBg,
        padding: 20,
        borderRadius: 20,
        marginVertical: 5,

    },
    firstBody: {
        backgroundColor: containerBg,
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    textHeading: {
        fontSize: 24,
        color: 'white',
        // color: '#33d6f3',
        fontWeight: "bold"
    }
})
export default GlobalStyle;