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
import {useEffect, useState} from "react";
import {auth, db} from "../../firebase";
import {ALERT_TYPE, AlertNotificationRoot, Dialog} from "react-native-alert-notification";
import {useDispatch} from "react-redux";
import {containerBg} from "../FixColors";
import {ref, runTransaction} from "firebase/database";

const SignUp = ({navigation}) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [cPass, setCPass] = useState('');
    const [userName, setUserName] = useState('');

    const [warning, setWarning] = useState(false);
    const [visible, setVisible] = useState(false);
    const [empty, setEmpty] = useState(false);
    const dbEmpty = (val) => {
        setEmpty(val)
    }


    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                ToastAndroid.show("Welcome", ToastAndroid.SHORT)
                //
                // // Set total
                // runTransaction(ref(db, "users/" + user.uid + "/total/"),
                //     (totalBalance) => {
                //         if (!totalBalance) {
                //             totalBalance = 0
                //         }
                //         dispatch(setTotalBalance(totalBalance));
                //         return totalBalance
                //     }).then(r => console.log("Total added ", r))

                navigation.navigate('Dashboard');

            }
        })
    }, [navigation, auth])


    useEffect(() => {
        if (pass === cPass) {
            setWarning(false)
        } else {
            setWarning(true)
        }
    }, [pass, cPass]);


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

    const register = async () => {

        if (pass === cPass) {
            setWarning(false)

            if (email.length > 0 && userName.length > 0 && pass.length > 0 && cPass.length > 0) {
                setVisible(true)
                await auth
                    .createUserWithEmailAndPassword(email, pass)
                    .then((userCredentials) => {
                        const user = userCredentials.user;
                        user.updateProfile({displayName: userName}).then(() => console.log(user.displayName))
                        console.log('Registered with:', user.email, user.displayName);

                        runTransaction(ref(db, "users/" + user.uid + "/username/"), () => {
                            return userName
                        }).then(r => console.log("username added ", r))

                        runTransaction(ref(db, "users/" + user.uid + "/Email/"), () => {
                            return email
                        }).then(r => console.log("email added ", r))


                    })
                    .catch((error) => {

                        // alert(error.message);
                        console.log(error.message)
                        let a = "Firebase: The email address is badly formatted. (auth/invalid-email).";
                        let b = "Firebase: The email address is already in use by another account. (auth/email-already-in-use).";
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
                                textBody: "This email is already registered",
                            })
                        } else {
                            alert(error.message)
                            console.log(error)
                        }

                    });

                setVisible(false)
            } else {
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: "Input fields are empty",
                })
            }
        } else {
            setWarning(true)
        }
    }

    return (
        <View style={[GlobalStyle.mainBody, styles.center, {paddingHorizontal: 0}]}>

            <View style={[styles.body]}>

                {/*Heading*/}
                <View style={[GlobalStyle.body, styles.center]}>
                    <Text style={[GlobalStyle.textHeading, styles.header]}>
                        SIGNUP
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
                            keyboardType={"email-address"}
                            textContentType={"emailAddress"}
                            maxLength={30}
                        />
                    </View>

                    {/*Username*/}
                    <View>

                        <Text style={[GlobalStyle.text, styles.text]}>
                            User Name
                        </Text>

                        <TextInput
                            style={styles.TextInput}
                            placeholder="User Name"
                            placeholderTextColor={"#bbbbbb"}
                            onChangeText={x => setUserName(x)}
                            value={userName}
                            maxLength={30}
                        />
                    </View>

                    {/*Password*/}
                    <View>

                        <Text style={[GlobalStyle.text, styles.text]}>
                            Password
                        </Text>

                        <TextInput
                            style={[styles.TextInput, warning ? styles.warningStyle : {}]}
                            placeholder="Your Password"
                            secureTextEntry={true}
                            placeholderTextColor={"#bbbbbb"}
                            onChangeText={x => setPass(x)}
                            value={pass}
                            textContentType={"password"}
                            autoComplete={"password"}
                            maxLength={20}
                        />
                    </View>

                    {/*Confirm Password*/}
                    <View>

                        <Text style={[GlobalStyle.text, styles.text]}>
                            Confirm Password
                        </Text>

                        <TextInput
                            style={[styles.TextInput, warning ? styles.warningStyle : {}]}
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            placeholderTextColor={"#bbbbbb"}
                            onChangeText={x => setCPass(x)}
                            value={cPass}
                            textContentType={"password"}
                            autoComplete={"password"}
                            maxLength={20}
                        />


                        {warning ? <View>
                            <Text style={[styles.text, {color: "red", fontSize: 16, paddingLeft: 10}]}>
                                Password Didn't Match
                            </Text>
                        </View> : <View><Text></Text></View>}
                    </View>

                </View>

                {/*Buttons*/}

                <KeyboardAvoidingView style={[styles.center]}>

                    <AlertNotificationRoot>
                        <TouchableOpacity onPress={register} style={styles.btn}>
                            <Text style={[GlobalStyle.text, styles.text]}>
                                SIGNUP
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={[GlobalStyle.text, styles.text2]}>Already a member? Login now.</Text>
                        </TouchableOpacity>
                    </AlertNotificationRoot>


                </KeyboardAvoidingView>


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
        alignItems: "center"
    },
    body: {
        width: "100%",
        height: 670,
        paddingTop: 5,
        marginBottom: 100,
        borderBottomLeftRadius: 100,
        backgroundColor: containerBg,
        alignItems: "center",
        borderRadius: 0
    },
    text: {
        paddingLeft: 10,
        fontSize: 18,
    },
    text2: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
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

    }, warningStyle: {
        borderColor: 'red'
    }


});
export default SignUp;