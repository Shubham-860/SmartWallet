import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../Style/GlobalStyle";
import Account from "./Modules/Account";
import ExpensesStructure from "./Modules/ExpensesStructure";
import LastRecordsOverview from "./Modules/LastRecordsOverview";
import {Ionicons} from "@expo/vector-icons";
import Exp_Inc from "./Modules/Exp_Inc";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {auth} from "../../firebase";

const Dashboard = ({navigation}) => {


    const {db} = useSelector(state => state.userReducer)
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        navigation.navigate('Dashboard');
        console.log("reloaded 'Dashboard'")
    }, [db, auth, navigation]);

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (!user) {
                navigation.navigate('Login');
            }
        });
    }, [navigation, auth]);

    let mail;
    try {
        mail = user.email
    } catch (e) {
        navigation.navigate('Login');
    }

    return (
        <View style={[GlobalStyle.mainBody,]}>
            <ScrollView>
                <Account/>
                <Text style={GlobalStyle.text}>
                    Email: {mail}
                </Text>
                <ExpensesStructure/>
                <LastRecordsOverview/>
            </ScrollView>
            {/*Add Button*/}
            <TouchableOpacity onPress={() => navigation.navigate('Exp_Inc')} style={styles.addBtn}>
                <Ionicons name={"add-sharp"} color={'white'} size={50}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    addBtn: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#37fae2',
        borderRadius: 50,
        width: 52,
        height: 52,
        alignItems: "center"
    }
});

export default Dashboard;