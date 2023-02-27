import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import CustomButton from "../../Utils/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from "react";
import {ref, runTransaction} from "firebase/database";
import {auth, db} from "../../../firebase";
import {setTotalBalance} from "../../Redux/Actions";


const Account = () => {
    const navigation = useNavigation();

    const {totalBalance} = useSelector(state => state.userReducer)
    const [visible, setVisible] = useState(false);
    const [money, setMoney] = useState('');
    const dispatch = useDispatch();

    let user = auth.currentUser;

    // use Effects
    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (!user) {
                navigation.navigate('Login');
            }
            // console.log('user : ',user)
        });
    }, [auth]);


    const adjustBalance = () => {
        setVisible(true)
        console.log("adjustBalance")
    };
    const cansel = () => {
        setVisible(false)
    }
    const insert = async () => {
        runTransaction(ref(db, "users/" + user.uid + "/total/"),
            (balance) => {
                balance = Number(money)
                dispatch(setTotalBalance(balance));
                console.log("updated ", balance)
                console.log("total ", money, "type :",typeof(balance))
                return balance
            }
        ).then(r => console.log("Total Balance updated ", r))
        console.log(money)
        setVisible(false)
        setMoney('')
    }
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

            <View style={styles.btn}>
                <CustomButton
                    title={'Change Balance'}
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

            {/*change Total value*/}
            <View>
                <Modal transparent={true} visible={visible}>
                    <View style={[styles.center, styles.mBg]}>
                        <View style={[GlobalStyle.body, styles.body, styles.mBody]}>

                            <View style={styles.center}>

                                <View style={[styles.mElement]}>
                                    <Text style={styles.mHeading}>
                                        Set Balance
                                    </Text>
                                </View>

                                <View style={[styles.mElement]}>
                                    <TextInput
                                        style={[styles.textInput]}
                                        placeholder={"How much amount do you have"}
                                        placeholderTextColor={'#8a8a8a'}
                                        value={money}
                                        onChangeText={x => setMoney(x)}
                                        keyboardType={"numeric"}
                                        autoFocus={true}
                                        onSubmitEditing={insert}
                                    />
                                </View>

                                <View style={[styles.center, styles.mBtn, styles.mElement]}>
                                    <TouchableOpacity onPress={cansel}>
                                        <Text style={styles.mBrnText}>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={insert}>
                                        <Text style={styles.mBrnText}>INSERT</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>
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
    },
    btn: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    customBtn: {
        color: '#8a8a8a',
        borderColor: '#8a8a8a',
    },
    textInput: {
        color: "#ffffff",
        borderBottomWidth: 1,
        borderBottomColor: '#8a8a8a',
        margin: 0,
        padding: 0,
    },
    center: {
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    mBg: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1
    },
    mBody: {
        height: 200,
        width: "90%",
        borderColor: '#8a8a8a',
        borderWidth: 0.5,
    },
    mBtn: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: '100%',
    },
    mHeading: {
        fontSize: 30,
        fontWeight: "bold",
        paddingRight: 45,
        color: "#ffffff",
        marginBottom: -10
    },
    mBrnText: {
        fontSize: 20,
        color: "#ffffff",
        marginTop: 20
    },
    mElement: {
        marginVertical: 8
    }
});
export default Account;