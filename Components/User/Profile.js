import {
    Image,
    KeyboardAvoidingView,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import GlobalStyle from "../Style/GlobalStyle";
import {auth} from "../../firebase";
import {useEffect, useState} from "react";
import {ALERT_TYPE, AlertNotificationRoot, Dialog} from "react-native-alert-notification";
import {containerBg, liteGray} from "../FixColors";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {setDB, setTotalBalance} from "../Redux/Actions";

const Profile = ({navigation}) => {

    const [pass, setPass] = useState("");
    const [user, setUser] = useState(auth.currentUser);
    const [userName, setUserName] = useState('');
    const [visible, setVisible] = useState(false);
    const [usernameUpdateModalVisible, setUsernameUpdateModalVisible] = useState(false);
    const [passwordUpdateModalVisible, setPasswordUpdateModalVisible] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (!user) {
                navigation.navigate('Login');
            } else {
                setUser(user)
            }
        });
    }, [navigation, auth, user]);
    const usernameModal = () => {
        setUsernameUpdateModalVisible(!usernameUpdateModalVisible)
        setUserName('')
    }
    const passwordModal = () => {
        setPasswordUpdateModalVisible(!passwordUpdateModalVisible)
        setPass('')
    }
    const updateUsername = async () => {
        setVisible(true)
        await user.updateProfile({displayName: userName}).then(r => {
            ToastAndroid.show("Username Updated to :" + userName, ToastAndroid.SHORT);
            console.log("Username updated to :", userName);
            setUserName("")
            usernameModal()
            setVisible(false)
        }).catch(error => {
            setVisible(false)
            console.log(error)
            alert(error.message)
            usernameModal()
        })
        setVisible(false)
    }
    const updatePassword = async () => {
        if (pass.length > 5) {
            setVisible(true)
            await user.updatePassword(pass)
                .then(r => {
                        console.log("password updated", r)
                        ToastAndroid.show("Password Updated", ToastAndroid.LONG)
                        passwordModal()
                        setVisible(false)
                    }
                )
                .catch((error) => {
                    let a = "Firebase: This operation is sensitive and requires recent authentication. Log in again before retrying this request. (auth/requires-recent-login)."
                    if (error.message === a) {
                        Dialog.show({
                            type: ALERT_TYPE.WARNING,
                            title: "Warning",
                            textBody: "Sorry, it looks like you need to log in again before completing this action. This is a security measure to protect your account. Please log in again and try your request again.",
                        })
                    } else {
                        setVisible(false)
                        console.log(error)
                        alert(error.message)
                    }
                    setVisible(false)
                    passwordModal()
                });
            setVisible(false)
        } else {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: "Oops! Looks like your input is too short. Please enter at least 6 characters.",

            })
        }
    }
    const verifyEmail = () => {
        user.sendEmailVerification().then(() => {
            ToastAndroid.show("Verification link send", ToastAndroid.SHORT)
        }).catch(r => console.log("mail error ", r))
    }
    const logout = async () => {
        await auth
            .signOut()
            .then(() => {
                ToastAndroid.show("Logged out", ToastAndroid.SHORT)
                dispatch(setDB([]));
                dispatch(setTotalBalance(0));
                navigation.navigate('Login');
            })
            .catch((error) => alert(error.message));
        navigation.navigate('Login');
    }


    return (
        <View style={[GlobalStyle.mainBody, styles.center, {paddingHorizontal: 0}]}>

            <View style={[styles.body]}>
                <View style={[GlobalStyle.body, styles.center]}>
                    <Text style={[GlobalStyle.textHeading, styles.header]}>
                        PROFILE
                    </Text>
                </View>

                <View>


                    {/*Email*/}
                    <View style={[styles.userInfoBox]}>
                        <View>

                            <Text style={[GlobalStyle.text, styles.text]}>
                                Email
                            </Text>

                            <View>
                                <Text style={[GlobalStyle.text, styles.userText]}>
                                    {user.email}
                                </Text>
                            </View>
                        </View>

                    </View>


                    {/*Username*/}
                    <View style={[styles.userInfoBox]}>
                        <View>

                            <Text style={[GlobalStyle.text, styles.text]}>
                                User Name
                            </Text>

                            <View>
                                <Text style={[GlobalStyle.text, styles.userText]}>
                                    {user.displayName}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={usernameModal}>
                            <Ionicons name={"chevron-forward-sharp"} size={45} color={liteGray}/>
                        </TouchableOpacity>
                    </View>


                    {/*Password*/}
                    <View style={[styles.userInfoBox]}>
                        <View>

                            <Text style={[GlobalStyle.text, styles.text]}>
                                Update Password
                            </Text>

                        </View>
                        <TouchableOpacity onPress={passwordModal}>
                            <Ionicons name={"chevron-forward-sharp"} size={45} color={liteGray}/>
                        </TouchableOpacity>
                    </View>


                </View>

                {/*Button*/}

                <KeyboardAvoidingView style={[styles.center]}>

                    <AlertNotificationRoot>
                        <TouchableOpacity onPress={logout} style={[styles.btn, {width: 300}]}>
                            <Text style={[GlobalStyle.text, styles.text]}>
                                Logout
                            </Text>
                        </TouchableOpacity>

                        {user.emailVerified ? null :
                            <TouchableOpacity onPress={verifyEmail} style={{marginTop: 30, alignItems: 'center'}}>
                                <Text style={[GlobalStyle.text, styles.text]}>
                                    Click to verify Email
                                </Text>
                            </TouchableOpacity>
                        }
                    </AlertNotificationRoot>


                </KeyboardAvoidingView>


                <AlertNotificationRoot>

                    {/*username Update Modal */}
                    <View>
                        <Modal transparent={true} visible={usernameUpdateModalVisible} animationType={"fade"}>
                            <View style={styles.modelView}>
                                <View style={styles.modelBody}>

                                    <Text style={[GlobalStyle.textHeading, styles.modelHeading]}>
                                        Update username
                                    </Text>
                                    <TextInput

                                        style={styles.TextInput}
                                        placeholder="New Username"
                                        placeholderTextColor={"#bbbbbb"}
                                        onChangeText={x => setUserName(x)}
                                        value={userName}
                                        maxLength={16}
                                    />

                                    <View style={{flexDirection: 'row'}}>

                                        <TouchableOpacity onPress={usernameModal} style={styles.btn}>
                                            <Text style={[GlobalStyle.text, styles.text]}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={updateUsername} style={styles.btn}>
                                            <Text style={[GlobalStyle.text, styles.text]}>
                                                Update
                                            </Text>
                                        </TouchableOpacity>


                                    </View>
                                </View>
                            </View>

                        </Modal>
                    </View>


                    {/*Password Update Modal */}

                    <View>
                        <Modal transparent={true} visible={passwordUpdateModalVisible} animationType={"fade"}>
                            <View style={styles.modelView}>
                                <View style={styles.modelBody}>

                                    <Text style={[GlobalStyle.textHeading, styles.modelHeading]}>
                                        Update Password
                                    </Text>
                                    <TextInput
                                        style={styles.TextInput}
                                        placeholder="New Password"
                                        placeholderTextColor={"#bbbbbb"}
                                        onChangeText={x => setPass(x)}
                                        value={pass}
                                        secureTextEntry={true}
                                        maxLength={16}
                                    />

                                    <View style={{flexDirection: 'row'}}>

                                        <TouchableOpacity onPress={passwordModal} style={styles.btn}>
                                            <Text style={[GlobalStyle.text, styles.text]}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={updatePassword} style={styles.btn}>
                                            <Text style={[GlobalStyle.text, styles.text]}>
                                                Update
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </Modal>

                    </View>

                    {/*Loading*/}

                    <View>
                        <Modal transparent={true} visible={visible} animationType={"fade"}>
                            <View style={styles.modelView}>
                                <Image resizeMode={"contain"}
                                       source={require("../../assets/Images/App/Loading_animation.gif")}
                                       style={styles.loading}/>
                            </View>

                        </Modal>
                    </View>

                </AlertNotificationRoot>


            </View>

        </View>
    )

}
const styles = StyleSheet.create({
    btn: {
        width: 150,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: 10,
        marginTop: 20,
        marginHorizontal: 10,
    },
    TextInput: {
        borderColor: liteGray,
        borderBottomWidth: 1,
        width: 300,
        height: 35,
        margin: 10,
        color: "#FFFFFF",
        paddingLeft: 10,
        marginTop: 30,
        backgroundColor: containerBg

    },
    center: {
        alignItems: "center"
    },
    body: {
        width: "100%",
        height: 670,
        paddingTop: 5,
        flex: 1,
        marginBottom: 200,
        borderBottomRightRadius: 100,
        backgroundColor: containerBg,
        alignItems: "center",
        borderRadius: 0
    },
    text: {
        paddingHorizontal: 10,
        fontSize: 18,
    },
    userText: {
        paddingLeft: 15,
        fontSize: 15,
        marginVertical: 10,
        minWidth: 270
    },
    header: {
        fontSize: 50,
        marginBottom: 20,
        color: "#33d6f3"
    },
    loading: {
        width: 300,
        height: 300,
        borderRadius: 50
    },
    warningStyle: {
        borderColor: 'red'
    },
    userInfoBox: {
        padding: 0,
        margin: 0,
        borderColor: liteGray,
        borderBottomWidth: 1,
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    modelView: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.65)",
    },
    modelBody: {
        height: 250,
        backgroundColor: containerBg,
        borderRadius: 25,
        padding: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    modelHeading: {
        textTransform: "uppercase",
        paddingLeft: 10,
        color: "white",
        fontSize: 24,
        fontWeight: "bold"
    }


});
export default Profile;