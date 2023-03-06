import {Dimensions, StyleSheet, Text, ToastAndroid, View} from "react-native";
import {useEffect, useState} from "react";
import GlobalStyle from "../../../Style/GlobalStyle";
import {auth} from "../../../../firebase";
import {ref, remove, set} from "firebase/database"
import {PieChart} from "react-native-chart-kit";
import {useSelector} from "react-redux";

const AddData = ({navigation}) => {
    const {db} = useSelector(state => state.userReducer)
    //
    // const [email, setEmail] = useState("");
    // const [pass, setPass] = useState("");
    //
    // const [list, setList] = useState([]);
    //
    // const [empty, setEmpty] = useState(false);
//     useEffect(() => {
//         onValue(ref(db, 'records/'), (snapshot) => {
//
//             if (snapshot.exists()) {
//                 const data = snapshot.val();
//                 const newPost = Object.keys(data).map(key => ({
//                     id: key,
//                     ...data[key]
//                 }));
//                 // console.log(newPost);
//                 setList(newPost)
// // dbEmpty() fun is important otherwise use state will call to dab meany times unnecessary
//                 dbEmpty(false)
//             } else {
//                 dbEmpty(true)
//                 console.log("Empty database")
//             }
//
//         })
//
//     }, []);
//
    // console.log(new Date())
    // const dbEmpty = (val) => {
    //     setEmpty(val)
    // }
    // const addData = () => {
    //
    //     // for records auto id
    //
    //     if (true) {
    //
    //         // set(push(ref(db, 'posts/')), {
    //         //     email: email,
    //         //     password: pass
    //         // })
    //         let date = new Date();
    //         set(push(ref(db, 'records/')), {
    //             money: 5654646,
    //             income: true,
    //             iconCategory: "Food & Drinks",
    //             iconIndex: 0,
    //             description: 'paw Bhaji',
    //             date: date.toISOString(),
    //             time: date.toISOString(),
    //         })
    //             .then(r => ToastAndroid.show("data added" + r, ToastAndroid.SHORT));
    //         setEmail('');
    //         setPass('');
    //     } else {
    //         ToastAndroid.show("empty input", ToastAndroid.SHORT)
    //     }
    //
    //     //  normal data add need id
    //     // {
    //     //     ToastAndroid.show("inside add btn", ToastAndroid.SHORT)
    //     //     if (email.length > 0 && pass.length > 0) {
    //     //         set(ref(db, "SmartWallet/users/" + email), {
    //     //             email: email,
    //     //             password: pass
    //     //         }).then(r => {
    //     //                 // Alert.alert("data",r+"")
    //     //                 ToastAndroid.show("data added" + r, ToastAndroid.SHORT)
    //     //             }
    //     //         );
    //     //         setEmail('');
    //     //         setPass('');
    //     //     }
    //     // }
    // }
    //

    // const deleteData = (id) => {
    //     // console.log(id)
    //     remove(ref(db, 'records/' + id))
    //         .then(r => ToastAndroid.show("deleted" + r, ToastAndroid.SHORT))
    // }
    //
    // const updateData = (id) => {
    //     set(ref(db, "posts/" + id), {
    //         email: email,
    //         password: pass
    //     }).then(r => {
    //             // Alert.alert("data",r+"")
    //             ToastAndroid.show("data updated" + r, ToastAndroid.SHORT)
    //         }
    //     );
    // }

    useEffect(() => {
    }, [auth.currentUser?.phoneNumber]);

    // {
    //     const forTotal = () => {
    //         auth.currentUser.updateProfile({
    //             displayName: auth.currentUser.displayName,
    //             photoURL: auth.currentUser.photoURL, phoneNumber: pass
    //         }).then(r => console.log("data added", r)).catch(e => console.log(e))
    //
    //         // runTransaction(ref(db, "val/id/"), (num) => {
    //         //     if (num) {
    //         //         num++
    //         //     } else {
    //         //         num = 50
    //         //     }
    //         //     return num
    //         // }).then(r => console.log("done " + r))
    //     }
    //
    //
    //     const showDate = (x) => {
    //         let date = new Date(x);
    //         return date.toDateString()
    //     }
    //     const showTime = (x) => {
    //         let date = new Date(x);
    //         return date.toLocaleTimeString("en-IN", {hour: 'numeric', minute: 'numeric', hour12: true})
    //     }
    // }

    useEffect(() => {
    }, [db]);


    // const chartConfig = {
    //     backgroundGradientFrom: '#1E2923',
    //     backgroundGradientTo: '#08130D',
    //     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
    // }
    //
    // let thisMonth = new Date().getMonth()
    // const thisYear = new Date().getFullYear()
    // let month = new Date().getMonth()
    // const months = (val) => {
    //     thisMonth = new Date().getMonth() - val
    // }
    // const colorNamea = (Category) => {
    //     switch (Category) {
    //         case 'Food & Drinks': {
    //             return ('cyan')
    //         }
    //         case 'Shopping': {
    //             return ('burlywood')
    //         }
    //         case 'Housing': {
    //             return ('blue')
    //         }
    //         case 'Transportation': {
    //             return ('darkviolet')
    //         }
    //         case 'Life & Entertainment': {
    //             return ('coral')
    //         }
    //         case 'Financial expenses': {
    //             return ('orangered')
    //         }
    //         case 'Communication, PC, SmartPhone': {
    //             return ('yellow')
    //         }
    //         case 'Investments': {
    //             return ('green')
    //         }
    //         case 'Income': {
    //             return ('snow')
    //         }
    //         case 'Others': {
    //             return ('slategray')
    //         }
    //     }
    // }
    //

    const colorName = (Category) => {
        switch (Category) {
            case 'Food & Drinks': {
                return ('aqua')
            }
            case 'Shopping': {
                return ('bisque')
            }
            case 'Housing': {
                return ('blue')
            }
            case 'Transportation': {
                return ('violet')
            }

            case 'Life & Entertainment': {
                return ('coral')
            }
            case 'Financial expenses': {
                return ('orangered')
            }
            case 'Communication, PC, SmartPhone': {
                return ('thistle')
            }
            case 'Investments': {
                return ('mediumslateblue')
            }
            case 'Income': {
                return ('springgreen')
            }
            case 'Others': {
                return ('slategray')
            }
        }
    }

    const filteredData = db.filter(item => {
        const date = new Date(item.date);
        return !item.income && date.getMonth() >= thisMonth && date.getFullYear() === thisYear;
    }).reduce((acc, item) => {
        const existing = acc.find(i => i.iconCategory === item.iconCategory);
        if (existing) {
            existing.money += Number(item.money);
        } else {
            acc.push({iconCategory: item.iconCategory, money: Number(item.money), data: item.date});
        }
        return acc;
    }, []).map(record => (
        {
            name: record.iconCategory,
            money: Number(record.money),
            color: colorName(record.iconCategory),
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        }
    ))
    const totalMoney = filteredData.reduce((sum, item) => {
        return sum + Number(item.money)
    }, 0)
    console.log("filteredData :", filteredData)
    console.log("totalMoney :", totalMoney)


    return (
        <View style={GlobalStyle.mainBody}>
            <View style={GlobalStyle.body}>
                <View>
                    <Text style={GlobalStyle.textHeading}>
                        Total Expanse : {totalMoney}
                    </Text>
                </View>
                <PieChart
                    data={filteredData}
                    width={Dimensions.get('window').width - 40}
                    height={220}
                    chartConfig={chartConfig}
                    accessor="money"
                    paddingLeft={'0'}
                    backgroundColor={"transparent"}/>

            </View>

        </View>
    )
}
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f5fcff"
//     },
//     d: {
//         margin: 5,
//         borderColor: 'white',
//         borderWidth: 1,
//         borderRadius: 10,
//         padding: 10,
//     },
//     btn: {
//         width: 300,
//         height: 40,
//         justifyContent: "center",
//         alignItems: "center",
//         alignContent: "center",
//         borderWidth: 1,
//         borderColor: "#ffffff",
//         borderRadius: 10,
//         marginTop: 20,
//         marginHorizontal: 10,
//     },
//     TextInput: {
//         borderColor: '#eeeeee',
//         borderWidth: 0.7,
//         width: 300,
//         height: 35,
//         margin: 10,
//         color: "#FFFFFF",
//         paddingLeft: 10,
//         borderRadius: 10,
//         backgroundColor: "rgba(0,0,0,0.39)"
//     },
//
//
//     text: {
//         paddingLeft: 10,
//         fontSize: 18,
//     },
//
// });
export default AddData;