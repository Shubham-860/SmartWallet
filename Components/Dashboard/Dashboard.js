import {ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../Style/GlobalStyle";
import Account from "./Modules/Account";
import ExpensesStructure from "./Modules/ExpensesStructure";
import LastRecordsOverview from "./Modules/LastRecordsOverview";
import NewRecord from "./Modules/NewRecord";
import {Ionicons} from "@expo/vector-icons";

const Dashboard = () => {
    return (
        <ScrollView style={GlobalStyle.mainBody}>
            <Account/>
            <ExpensesStructure/>
            <LastRecordsOverview/>
            <NewRecord/>


        {/*Add Button*/}

            <TouchableOpacity style={styles.addBtn}>
                <Ionicons name={"add-sharp"} color={'white'} size={50}/>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles=StyleSheet.create({
addBtn:{
    position:'absolute',
    right:20,
    bottom:20,
    backgroundColor:'#37fae2',
    borderRadius:50,
    width:52,
    height:52,
    alignItems:"center"
}
});

export default Dashboard;