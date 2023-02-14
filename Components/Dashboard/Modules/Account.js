import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import CustomButton from "../../Utils/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { SET_TOTAL_BALANCE } from "../../Redux/Actions";
import { useNavigation } from '@react-navigation/native';



const Account = () =>  {
    const navigation = useNavigation();

    const { totalBalance } = useSelector(state => state.userReducer)

    const adjustBalance = () => {
        console.log("adjustBalance")
    };
    let viewRecords = () => {
        console.log("viewRecords");
        navigation.navigate("All Records");

    };
    return (
        <View style={styles.body}>
            <Text style={GlobalStyle.textHeading}>
                Balance
            </Text>
            <Text style={styles.text}>
                ₹ {totalBalance}
            </Text>
            {/*<TouchableOpacity  onPress={() => navigation.navigate('Exp_Inc')}>*/}
            {/*    <Text style={GlobalStyle.textHeading}>*/}
            {/*        button*/}
            {/*    </Text>*/}
            {/*</TouchableOpacity>*/}
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