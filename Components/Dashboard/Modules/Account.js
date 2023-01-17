import { StyleSheet, Text, View } from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import CustomButton from "../../Utils/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { SET_TOTAL_BALANCE } from "../../Redux/Actions";



const Account = ({ navigation }) => {

    const { totalBalance } = useSelector(state => state.userReducer)
    const dispatch =useDispatch();

    const adjustBalance = () => {
        console.log("adjustBalance")
    };
    const viewRecords = () => {
        console.log("viewRecords");
        navigation.navigate('Profile')

    };
    return (
        <View style={styles.body}>
            <Text style={GlobalStyle.textHeading}>
                Balance
            </Text>
            <Text style={styles.text}>
                ₹ {totalBalance}
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
        backgroundColor: 'black',
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