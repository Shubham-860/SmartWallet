import {KeyboardAvoidingView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../Style/GlobalStyle";
import {useEffect, useState} from "react";
import {auth} from "../../firebase";
import {ALERT_TYPE, AlertNotificationRoot, Dialog} from "react-native-alert-notification";
import {containerBg} from "../FixColors";

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState("");

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                ToastAndroid.show("Welcome", ToastAndroid.SHORT)
                navigation.navigate('Dashboard');

            }
        })
    }, [navigation])

    const sendResetMail = () => {
        if (email.length>0){
            auth.sendPasswordResetEmail(email).then(r =>
                ToastAndroid.show("Email sent", ToastAndroid.SHORT)
            ).catch(error => {
                console.log(error.message)
                let a = "Firebase: The email address is badly formatted. (auth/invalid-email).";
                let b = "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).";
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
                } else {
                    console.log("Something went wrong: ", error.message)
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: "Warning",
                        textBody: "Something went wrong",
                    })
                }
            })
        }else {
            ToastAndroid.show("Please enter your email.",ToastAndroid.SHORT);
        }
    }

    return (
        <View style={[GlobalStyle.mainBody, styles.center, {paddingHorizontal: 0}]}>
            <View style={[styles.body, {alignItems: "center", borderRadius: 0}]}>
                <View style={[GlobalStyle.body, styles.center]}>
                    <Text style={[GlobalStyle.textHeading, styles.header]}>
                        Reset Password
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
                            onSubmitEditing={() => {
                                sendResetMail()
                            }}
                        />
                    </View>

                </View>

                {/*Buttons*/}
                <KeyboardAvoidingView style={[styles.center]}>

                    <AlertNotificationRoot>
                        <TouchableOpacity onPress={sendResetMail} style={styles.btn}>
                            <Text style={[GlobalStyle.text, styles.text]}>
                                Send email
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Login")
                            setEmail("")
                        }}
                                          style={[styles.btn2, {opacity: 1}]}>
                            <Text style={[GlobalStyle.text, styles.text2]}>
                                Ready to login? Go to login page.
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
        marginVertical: 20,
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
        borderTopRightRadius: 100,
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
        color: "#33d6f3",
        textAlign: "center",
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
export default ForgotPassword;