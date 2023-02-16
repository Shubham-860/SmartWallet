import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView, BackHandler
} from "react-native";
import GlobalStyle from "../Style/GlobalStyle";
import {useEffect, useState} from "react";
import {auth} from "../../firebase";

const Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Dashboard');
            }
        })
        return unsubscribe
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
        console.log("login");
        try {
            const userCredentials = await auth.signInWithEmailAndPassword(email, pass);
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
        } catch (error) {
            alert(error.message);
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
        <View style={[GlobalStyle.mainBody, styles.center,{paddingHorizontal: 0}]}>
            <View style={[styles.body,{alignItems: "center",borderRadius:0}]}>
                <View style={[GlobalStyle.body, styles.center]}>
                    <Text style={[GlobalStyle.textHeading,styles.header]}>
                        LOGIN
                    </Text>
                </View>
                <View>

                    <Text style={[GlobalStyle.text,styles.text]}>
                        Email
                    </Text>

                    <TextInput
                        style={styles.TextInput}
                        placeholder="Hello@company.com"
                        placeholderTextColor={"#bbbbbb"}
                        onChangeText={x => setEmail(x)}
                        value={email}
                    />
                </View>

                <View>

                    <Text style={[GlobalStyle.text,styles.text]}>
                        Password
                    </Text>

                    <TextInput
                        style={styles.TextInput}
                        placeholder="Your Password"
                        secureTextEntry
                        placeholderTextColor={"#bbbbbb"}
                        onChangeText={x => setPass(x)}
                        value={pass}
                    />
                </View>
                <KeyboardAvoidingView style={[styles.center]}>

                    <TouchableOpacity   onPress={login} style={styles.btn} >
                        <Text style={[GlobalStyle.text]}>
                            Login
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={register} style={styles.btn}>
                        <Text style={[GlobalStyle.text]}>
                            Register
                        </Text>
                    </TouchableOpacity>
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
        height:35,
        margin: 10,
        color: "#FFFFFF",
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor:"rgba(0,0,0,0.39)"
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    body: {
        width: "100%",
        flex:1,
        marginTop:"30%",
        borderTopLeftRadius:100,

        backgroundColor: 'black',
        borderRadius: 20,

    },
    text:{
        paddingLeft:10,
        fontSize:18,
        paddingTop:5
    },
    header:{
        fontSize:50,
        marginBottom:20,
        color:"#33d6f3"
    }
});
export default Login;