import {Platform, StyleSheet} from "react-native";

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
        paddingHorizontal:3,
        backgroundColor: '#2E2D2D',
    },
    body: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 20,
        marginVertical: 5,

    },
    firstBody: {
        backgroundColor: 'black',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    textHeading: {
        fontSize: 24,
        color: 'white',
        fontWeight: "bold"
    }
})
export default GlobalStyle;