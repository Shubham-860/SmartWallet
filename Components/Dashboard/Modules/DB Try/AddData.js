import {
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import {useEffect, useState} from "react";
import GlobalStyle from "../../../Style/GlobalStyle";
import {auth, db} from "../../../../firebase";
import {onValue, push, ref, remove, runTransaction, set} from "firebase/database"
import {Ionicons} from "@expo/vector-icons";
import {ALERT_TYPE, AlertNotificationRoot, Dialog} from "react-native-alert-notification";

const AddData = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const [list, setList] = useState([]);

    const [empty, setEmpty] = useState(false);
    useEffect(() => {
        onValue(ref(db, 'records/'), (snapshot) => {

            if (snapshot.exists()) {
                const data = snapshot.val();
                const newPost = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // console.log(newPost);
                setList(newPost)
// dbEmpty() fun is important otherwise use state will call to dab meany times unnecessary
                dbEmpty(false)
            } else {
                dbEmpty(true)
                console.log("Empty database")
            }

        })

    }, []);

    // console.log(new Date())
    const dbEmpty = (val) => {
        setEmpty(val)
    }
    const addData = () => {

        // for records auto id

        if (true) {

            // set(push(ref(db, 'posts/')), {
            //     email: email,
            //     password: pass
            // })
            let date = new Date();
            set(push(ref(db, 'records/')), {
                money: 5654646,
                income: true,
                iconCategory: "Food & Drinks",
                iconIndex: 0,
                description: 'paw Bhaji',
                date: date.toISOString(),
                time: date.toISOString(),
            })
                .then(r => ToastAndroid.show("data added" + r, ToastAndroid.SHORT));
            setEmail('');
            setPass('');
        } else {
            ToastAndroid.show("empty input", ToastAndroid.SHORT)
        }

        //  normal data add need id
        // {
        //     ToastAndroid.show("inside add btn", ToastAndroid.SHORT)
        //     if (email.length > 0 && pass.length > 0) {
        //         set(ref(db, "SmartWallet/users/" + email), {
        //             email: email,
        //             password: pass
        //         }).then(r => {
        //                 // Alert.alert("data",r+"")
        //                 ToastAndroid.show("data added" + r, ToastAndroid.SHORT)
        //             }
        //         );
        //         setEmail('');
        //         setPass('');
        //     }
        // }
    }


    const deleteData = (id) => {
        // console.log(id)
        remove(ref(db, 'records/' + id))
            .then(r => ToastAndroid.show("deleted" + r, ToastAndroid.SHORT))
    }

    const updateData = (id) => {
        set(ref(db, "posts/" + id), {
            email: email,
            password: pass
        }).then(r => {
                // Alert.alert("data",r+"")
                ToastAndroid.show("data updated" + r, ToastAndroid.SHORT)
            }
        );
    }


    const forTotal = () => {
        runTransaction(ref(db, "val/id/"), (num) => {
            if (num) {
                num++
            } else {
                num = 50
            }
            return num
        }).then(r => console.log("done " + r))
    }


    const showDate = (x) => {
        let date = new Date(x);
        return date.toDateString()
    }
    const showTime = (x) => {
        let date = new Date(x);
        return date.toLocaleTimeString("en-IN", {hour: 'numeric', minute: 'numeric', hour12: true})
    }

    return (
        <ScrollView style={[GlobalStyle.mainBody, styles.center, {paddingHorizontal: 0}]}>
            <View style={[styles.body, {alignItems: "center", borderRadius: 0}]}>
                <View style={[GlobalStyle.body, styles.center]}>
                    <Text style={[GlobalStyle.textHeading, styles.header]}>
                        Database
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
                    />
                </View>
                <KeyboardAvoidingView style={[styles.center]}>

                    <TouchableOpacity onPress={forTotal} style={styles.btn}>
                        <Text style={[GlobalStyle.text, styles.text]}>
                            Add Data
                        </Text>
                    </TouchableOpacity>


                    <AlertNotificationRoot>

                        <TouchableOpacity onPress={() => Dialog.show({
                            type: ALERT_TYPE.DANGER,
                            title: "Warning",
                            textBody: "This is a warning",
                            button: 'close'
                        })} style={styles.btn}>
                            <Text style={[GlobalStyle.text, styles.text]}>
                                Alert
                            </Text>
                        </TouchableOpacity>
                    </AlertNotificationRoot>


                </KeyboardAvoidingView>

                <View style={[{alignItems: 'center'}]}>
                    <Text style={GlobalStyle.textHeading}>
                        database data
                    </Text>

                    <Text style={GlobalStyle.textHeading}>
                        {auth.currentUser?.email}
                    </Text>

                    {empty ? (
                        <Text style={GlobalStyle.text}>
                            No values in Database
                        </Text>
                    ) : (

                        <FlatList
                            data={list} renderItem={(x) => {
                            return (
                                <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                                    <TouchableOpacity onPress={() => updateData(x.item.id)} style={styles.d}>
                                        <Text style={GlobalStyle.text}>
                                            {x.item.email}
                                        </Text>
                                        <Text style={GlobalStyle.text}>
                                            {x.item.password}
                                        </Text>
                                        <Text style={GlobalStyle.text}>
                                            {x.item.id}
                                        </Text>

                                        {/*{*/}
                                        {/*    money: 55555,*/}
                                        {/*    income: true,*/}
                                        {/*    iconCategory: "Food & Drinks",*/}
                                        {/*    iconIndex: 0,*/}
                                        {/*    description: 'paw Bhaji',*/}
                                        {/*    date: new Date(),*/}
                                        {/*    time: new Date(),}*/}

                                        <Text style={GlobalStyle.text}>
                                            money: {x.item.money}
                                        </Text>

                                        <Text style={GlobalStyle.text}>
                                            income: {x.item.income}
                                        </Text>

                                        <Text style={GlobalStyle.text}>
                                            iconCategory: {x.item.iconCategory}
                                        </Text>

                                        <Text style={GlobalStyle.text}>
                                            iconIndex: {x.item.iconIndex}
                                        </Text>

                                        <Text style={GlobalStyle.text}>
                                            description: {x.item.description}
                                        </Text>

                                        <Text style={GlobalStyle.text}>
                                            date: {showDate(x.item.date)}
                                        </Text>

                                        <Text style={GlobalStyle.text}>
                                            time: {showTime(x.item.time)}
                                        </Text>


                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => deleteData(x.item.id)}>
                                        <Ionicons name={'trash-outline'} size={60} color={"orange"}/>
                                    </TouchableOpacity>

                                </View>
                            )
                        }}/>
                    )

                    }

                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    d: {
        margin: 5,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
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


    text: {
        paddingLeft: 10,
        fontSize: 18,
    },

});
export default AddData;