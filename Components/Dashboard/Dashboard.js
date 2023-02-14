import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../Style/GlobalStyle";
import Account from "./Modules/Account";
import ExpensesStructure from "./Modules/ExpensesStructure";
import LastRecordsOverview from "./Modules/LastRecordsOverview";
import {Ionicons} from "@expo/vector-icons";
import Exp_Inc from "./Modules/Exp_Inc";
import {useSelector} from "react-redux";
import {useEffect} from "react";

const Dashboard = ({navigation}) => {
    const {db} = useSelector(state => state.userReducer)
    useEffect(() => {

    }, [db]);

    return (
        <View style={[GlobalStyle.mainBody,]}>
            <ScrollView>
                <Account/>
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