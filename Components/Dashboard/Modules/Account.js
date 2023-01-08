import {StyleSheet, Text, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import CustomButton from "../../Utils/CustomButton";

const Account = () => {

    const adjustBalance = () => {
        console.log("adjustBalance")
    };
    const viewRecords = () => {
        console.log("viewRecords")

    };
    return (
        <View style={styles.body}>
            <Text style={GlobalStyle.textHeading}>
                Account
            </Text>
            <Text style={styles.text}>
                ₹ {"10000"}
            </Text>
            <View style={styles.btn}>
                <CustomButton
                    title={'Adjust Balance'}
                    style={styles.customBtn}
                    color={'#fdfdfd'}
                    onPressFunction={adjustBalance}
                />
                <CustomButton
                    title={'View Records'}
                    style={styles.customBtn}
                    color={'#fdfdfd'}
                    onPressFunction={viewRecords}
                />

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        backgroundColor: '#2E2D2D',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    text: {
        color: 'white',
        fontSize: 22,
        fontWeight: "bold",
    }, btn: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    customBtn: {
        color: '#8a8a8a',
        borderColor: '#8a8a8a',
    }
});
export default Account;