import {Text, View, StyleSheet, ImageBackground, Image} from "react-native";
import GlobalStyle from "../Style/GlobalStyle";

const Login = () => {
    return (
        <View style={{margin: 0, padding: 0,flex:1}}>
            {/*<ImageBackground source={require("../../assets/Images/App/Login page.png")}*/}
            {/*                 style={{width:100,*/}
            {/*                     resizeMode: 'cover',*/}
            {/*                     justifyContent: 'center',}}*/}
            {/*>*/}
            <Image resizeMode={'cover'} source={require('../../assets/Images/App/Login page.png')}
                   style={{flex:1,resizeMode:'contain'}}
            />

                <View style={GlobalStyle.mainBody}>
                    <Text style={GlobalStyle.text}>
                        Login
                    </Text>
                </View>
            {/*</ImageBackground>*/}

        </View>
    )
}
const styles = StyleSheet.create({
    imgBG:{
        resizeMode:'cover'
    }
});
export default Login;