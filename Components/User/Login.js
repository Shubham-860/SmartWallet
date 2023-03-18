import {
    BackHandler,
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
import {useEffect, useRef, useState} from "react";
import {auth, db} from "../../firebase";
import {ALERT_TYPE, AlertNotificationRoot, Dialog} from "react-native-alert-notification";
import {onValue, ref, runTransaction} from "firebase/database";
import {useDispatch} from "react-redux";
import {setDB, setTotalBalance} from "../Redux/Actions";
import {containerBg} from "../FixColors";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const passwordIT = useRef(null);
    const [visible, setVisible] = useState(false);
    const [empty, setEmpty] = useState(false);
    const dbEmpty = (val) => {
        setEmpty(val)
    }
    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                ToastAndroid.show("Welcome", ToastAndroid.SHORT)

                // read db
                setVisible(false)
                onValue(ref(db, "users/" + user.uid + "/records/"),
                    (snapshot) => {
                        if (snapshot.exists()) {
                            const data = snapshot.val();
                            const AllRecords = Object.keys(data).map(key => ({
                                id: key,
                                ...data[key]
                            }));
                            dispatch(setDB(AllRecords));
                            // console.log("records : ", AllRecords.length);
                            dbEmpty(false)
                        } else {
                            dbEmpty(true)
                            dispatch(setDB([]));
                            console.log("Empty db")
                        }
                    })
                console.log("Data loaded from login page")
                runTransaction(ref(db, "users/" + user.uid + "/total/"),
                    (totalBalance) => {
                        if (!totalBalance) {
                            totalBalance = 0
                        }
                        dispatch(setTotalBalance(totalBalance));
                        return totalBalance
                    }).then(r => {
                    // console.log("Total added ", r)
                    setVisible(false)
                })

                navigation.navigate('Dashboard');

            }
        })
    }, [navigation])

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, []);
    const storeUserData = async () => {
        try {
            await AsyncStorage.setItem('email', email)
            await AsyncStorage.setItem('pass', pass)
        } catch (e) {
            console.log("AsyncStorage : ", e)
        }
    }
    const login = async () => {
        // console.log("login");
        if (email.length > 0 && pass.length > 0) {
            setVisible(true)
            try {
                await auth.signInWithEmailAndPassword(email, pass)
                    .then(() => {
                        storeUserData();
                    })
                const user = auth.currentUser;
                console.log('Logged in with:', user.email);
            } catch (error) {

                // alert(error.message);
                console.log(error.message)
                let a = "Firebase: The email address is badly formatted. (auth/invalid-email).";
                let b = "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).";
                let c = "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).";
                if (error.message === a) {
                    console.log("Please check your Email")
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: "Warning",
                        textBody: "Please check your Email",

                    })
                } else if (error.message === b) {
                    console.log("This email is not registered")
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: "Warning",
                        textBody: "This email is not registered",
                    })
                } else if (error.message === c) {
                    console.log("Please check your Password")
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: "Warning",
                        textBody: "Please check your Password",
                    })
                } else {
                    console.log("Something went wrong: ", error.message)
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: "Warning",
                        textBody: "Something went wrong",
                    })
                }
            }

            setVisible(false)

        } else {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: "Enter Email and password",
            })
        }
    }

    const register = () => {
        // console.log("register")
        navigation.navigate("SignUp")
    }

    return (
        <View style={[GlobalStyle.mainBody, styles.center, {paddingHorizontal: 0}]}>
            <View style={[styles.body, {alignItems: "center", borderRadius: 0}]}>
                <View style={[GlobalStyle.body, styles.center]}>
                    <Text style={[GlobalStyle.textHeading, styles.header]}>
                        LOGIN
                    </Text>
                </View>

                {/*inputs*/}

                <View>

                    {/*Email*/}
                    <View>

                        <Text style={[GlobalStyle.text, styles.text]}>
                            Email
                        </Text>

                        <TextInput
                            style={styles.TextInput}
                            placeholder="Hello@mail.com"
                            placeholderTextColor={"#bbbbbb"}
                            onChangeText={x => setEmail(x)}
                            value={email}
                            autoComplete={"email"}
                            autoFocus={true}
                            keyboardType={"email-address"}
                            textContentType={"emailAddress"}
                            maxLength={30}
                            onSubmitEditing={() => {
                                passwordIT.current.focus()
                            }}
                        />
                    </View>

                    {/*Password*/}
                    <View>

                        <Text style={[GlobalStyle.text, styles.text]}>
                            Password
                        </Text>

                        <TextInput
                            style={styles.TextInput}
                            placeholder="Your Password"
                            secureTextEntry={true}
                            placeholderTextColor={"#bbbbbb"}
                            onChangeText={x => setPass(x)}
                            value={pass}
                            textContentType={"password"}
                            autoComplete={"password"}
                            maxLength={20}
                            ref={passwordIT}
                            onSubmitEditing={login}
                        />
                    </View>
                </View>

                {/*Buttons*/}
                <KeyboardAvoidingView style={[styles.center]}>

                    <AlertNotificationRoot>
                        <TouchableOpacity onPress={login} style={styles.btn}>
                            <Text style={[GlobalStyle.text, styles.text]}>
                                Login
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={register} style={styles.btn2}>
                            <Text style={[GlobalStyle.text, styles.text2]}>
                                Want to get started ? Click create an account now!
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={()=>navigation.navigate("ForgotPassword")} style={[styles.btn2,{opacity:0.7}]}>
                            <Text style={[GlobalStyle.text, styles.text2]}>
                                Forgot password? Reset now.
                            </Text>
                        </TouchableOpacity>


                    </AlertNotificationRoot>


                </KeyboardAvoidingView>

            </View>

            {/*Loading*/}
            <View>
                <Modal transparent={true} visible={visible} animationType={"fade"}>
                    <View style={styles.modelView}>
                        <Image resizeMode={"contain"} source={require("../../assets/Images/App/Loading_animation.gif")}
                               style={styles.loading}/>
                    </View>

                </Modal>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    imgBG: {
        resizeMode: 'cover'
    },
    btn: {
        width: 300,
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
    btn2: {
        width: 280,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0)",
        borderRadius: 10,
        marginTop: 20,
        paddingLeft: 11,
        marginHorizontal: 10,
    },
    text2: {
        fontSize: 18,
    },
    TextInput: {
        borderColor: '#eeeeee',
        borderWidth: 0.7,
        width: 300,
        height: 35,
        margin: 10,
        color: "#FFFFFF",
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: "rgb(33,33,33)"
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    body: {
        width: "100%",
        flex: 1,
        marginTop: "30%",
        borderTopLeftRadius: 100,
        backgroundColor: containerBg,
        borderRadius: 20,

    },
    text: {
        paddingLeft: 10,
        fontSize: 18,
    },
    header: {
        fontSize: 50,
        marginBottom: 20,
        color: "#33d6f3"
    },
    modelView: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.65)",
    },
    loading: {
        width: 300,
        height: 300,
        borderRadius: 50

    },

});
export default Login;