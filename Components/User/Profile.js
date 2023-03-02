import {StyleSheet, Text, TextInput, ToastAndroid, View} from "react-native";
import GlobalStyle from "../Style/GlobalStyle";
import CustomButton from "../Utils/CustomButton";
import {auth} from "../../firebase";
import {useState} from "react";

const Profile = ({navigation}) => {

    const logout = async () => {
        await auth
            .signOut()
            .then(() => {
                navigation.navigate('Login');
                ToastAndroid.show("Logged out",ToastAndroid.SHORT)
            })
            .catch((error) => alert(error.message));
        navigation.navigate('Login');
    }
    const update = () => {
        auth.currentUser.updatePassword(pass)
            .then(r => {
                    console.log("password updated", r)
                    ToastAndroid.show("Password Updated", ToastAndroid.LONG)
                }
            )
            .catch((error) => alert(error.message));
    }

    const [pass, setPass] = useState("");
    return (<View style={GlobalStyle.mainBody}>
        <View style={GlobalStyle.body}>

            {/*mail*/}
            <View style={styles.body}>
                <Text style={GlobalStyle.text}>Email : {auth.currentUser.email}</Text>
            </View>
            {/*username*/}
            <View style={styles.body}>
                <Text style={GlobalStyle.text}>Username : {auth.currentUser?.displayName}</Text>
            </View>
            {/*pass*/}
            <View style={[styles.center]}>
                <View style={styles.body}>
                    <Text style={[GlobalStyle.text,]}>Password : </Text>

                </View>
                <View style={styles.body}>
                    <TextInput
                        value={pass}
                        // secureTextEntry={true}
                        onChangeText={x => setPass(x)}
                        style={[GlobalStyle.textInput, {width: 300, paddingLeft: 5}]}/>

                </View>

            </View>


            <View style={styles.body}>
                <CustomButton
                    title={"Update Password"} color={"white"}
                    onPressFunction={update} style={styles.btn}
                />
            </View>
            <View style={styles.body}>
                <CustomButton
                    title={"logout"} color={"white"}
                    onPressFunction={logout} style={styles.btn}
                />
            </View>
        </View>
    </View>)
}
const styles = StyleSheet.create({
    btn: {
        justifyContent: "center", alignItems: "center", height: 40, margin: 20
    },
    center: {
        justifyContent: "center",
        // alignItems:"center"
    },
    body: {
        margin: 10
    }
});
export default Profile;