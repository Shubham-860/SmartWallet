import {Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../Style/GlobalStyle";
import Account from "./Modules/Account";
import LastRecordsOverview from "./Modules/LastRecordsOverview";
import {Ionicons} from "@expo/vector-icons";
import Exp_Inc from "./Modules/Exp_Inc";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {auth} from "../../firebase";
import Statistics from "./Modules/Statistics";
import {containerBg} from "../FixColors";

const Dashboard = ({navigation}) => {

    let mail;
    const {db} = useSelector(state => state.userReducer)
    const [empty, setEmpty] = useState(false);


    useEffect(() => {
        navigation.navigate('Dashboard');
        console.log("reloaded 'Dashboard'")
    }, [navigation]);

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (!user) {
                navigation.navigate('Login');
            } else {
                mail = user.email;
                setEmpty(() => db.length === 0)
            }
        });

    }, [navigation, db, auth]);

    return (
        <View style={[GlobalStyle.mainBody,]}>

            <ScrollView>
                <Account/>
                {/*<Text style={GlobalStyle.text}>*/}
                {/*    Email: {mail}*/}
                {/*</Text>*/}
                <Statistics onlyExp={true}/>
                <TouchableOpacity onPress={() => navigation.navigate("Statistics")}>
                </TouchableOpacity>
                <LastRecordsOverview/>
            </ScrollView>

            {/*Add Button*/}
            <TouchableOpacity onPress={() => navigation.navigate('Exp_Inc')} style={styles.addBtn}>
                <Ionicons name={"add-sharp"} color={'white'} size={50}/>
            </TouchableOpacity>

            <View>
                <Modal transparent={true} visible={empty} animationType={"fade"}>
                    <View style={styles.modelView}>
                        <View style={styles.modelBody}>

                            <Text style={[GlobalStyle.textHeading, styles.modelHeading]}>
                                No records found.
                            </Text>

                            <Text style={[GlobalStyle.textHeading, styles.modelHeading]}>
                                Click here to create your
                            </Text>

                            <Text style={[GlobalStyle.textHeading, styles.modelHeading]}>
                                first Record
                            </Text>

                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setEmpty(false)
                        navigation.navigate('Exp_Inc')
                    }} style={styles.addBtn}>
                        <Ionicons name={"add-sharp"} color={'white'} size={50}/>
                    </TouchableOpacity>

                </Modal>

            </View>


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
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        padding: 0,
        margin: 0
    },
    modelView: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.65)",
    },
    modelBody: {
        height: 150,
        backgroundColor: containerBg,
        borderRadius: 25,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "100%"
    },
    modelHeading: {
        textTransform: "uppercase",
        paddingLeft: 10,
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default Dashboard;