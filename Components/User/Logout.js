import {Text, View, StyleSheet, Image, BackHandler} from "react-native";
import GlobalStyle from "../Style/GlobalStyle";
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import {auth} from "../../firebase";

const Logout = ({navigation}) => {

    useEffect(() => {
            auth
                .signOut()
                .then(() => {
                    navigation.navigate('Login');
                })
                .catch((error) => alert(error.message));
            navigation.navigate('Login');

    }, [navigation]);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (!user) {
                navigation.navigate('Login');
            }
        });

        return unsubscribe;
    }, [navigation]);

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




    auth
        .signOut()
        .then(() => {
            navigation.navigate('Login');
        })
        .catch((error) => alert(error.message));
    navigation.navigate('Login');
    return (
        <View style={[GlobalStyle.mainBody, styles.center]}>
            <Image resizeMode={"contain"} source={require("../../assets/Images/App/loading.gif")}
                   style={styles.loading}/>
        </View>
    )
}
const styles = StyleSheet.create({
    loading: {
        height: "40%",
        width: "40%",
    },
    center: {
        backgroundColor:"black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});
export default Logout;