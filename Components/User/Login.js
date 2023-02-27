import {
    BackHandler,
    KeyboardAvoidingView,
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
import {onValue, ref} from "firebase/database";
import {useDispatch} from "react-redux";
import {setDB} from "../Redux/Actions";

const Login = ({navigation}) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const [empty, setEmpty] = useState(false);
    const dbEmpty = (val) => {
        setEmpty(val)
    }
    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                ToastAndroid.show("Welcome", ToastAndroid.SHORT)
                console.log("start")

                // read db

                onValue(ref(db, "users/" + user.uid + "/records/"),
                    (snapshot) => {
                        if (snapshot.exists()) {
                            const data = snapshot.val();
                            const AllRecords = Object.keys(data).map(key => ({
                                id: key,
                                ...data[key]
                            }));
                            dispatch(setDB(AllRecords));
                            console.log("records : " , AllRecords);
                            dbEmpty(false)
                        }
                        else {
                            dbEmpty(true)
                            console.log("Empty db")
                        }
                    }
                )
                console.log("end")
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


    const login = async () => {
        // console.log("login");
        if (email.length > 0 && pass.length > 0) {
            try {
                const userCredentials = await auth.signInWithEmailAndPassword(email, pass);
                const user = userCredentials.user;
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
                    console.log("Something went wrong")
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: "Warning",
                        textBody: "Something went wrong",
                    })
                }
            }
        } else {
            Dialog.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: "Enter Email and password",
            })
        }
    }


    const register = () => {
        console.log("register")

        auth
            .createUserWithEmailAndPassword(email, pass)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
            })
            .catch((error) => alert(error.message));
    }

    return (
        <View style={[GlobalStyle.mainBody, styles.center, {paddingHorizontal: 0}]}>
            <View style={[styles.body, {alignItems: "center", borderRadius: 0}]}>
                <View style={[GlobalStyle.body, styles.center]}>
                    <Text style={[GlobalStyle.textHeading, styles.header]}>
                        LOGIN
                    </Text>
                </View>
                <View>

                    <Text style={[GlobalStyle.text, styles.text]}>
                        Email
                    </Text>

                    <TextInput
                        style={styles.TextInput}
                        placeholder="Hello@company.com"
                        placeholderTextColor={"#bbbbbb"}
                        onChangeText={x => setEmail(x)}
                        value={email}
                        autoComplete={"email"}
                        autoFocus={true}
                        keyboardType={"email-address"}
                        textContentType={"emailAddress"}
                        maxLength={30}
                    />
                </View>

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
                    />
                </View>
                <KeyboardAvoidingView style={[styles.center]}>

                    <AlertNotificationRoot>
                        <TouchableOpacity onPress={login} style={styles.btn}>
                            <Text style={[GlobalStyle.text, styles.text]}>
                                Login
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={register} style={styles.btn}>
                            <Text style={[GlobalStyle.text, styles.text]}>
                                Register
                            </Text>
                        </TouchableOpacity>

                    </AlertNotificationRoot>



                </KeyboardAvoidingView>
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
        backgroundColor: "rgba(0,0,0,0.39)"
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

        backgroundColor: 'black',
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
    }
});
export default Login;