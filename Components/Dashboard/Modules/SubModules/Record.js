import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const Record = (props) => {

    const [income, setIncome] = useState(() => { if (props.income) { return true } else { return false } });


    const [iconName, setIconName] = useState('cube-outline')
    const [iconColorBG, setIconColorBG] = useState('white')

    useEffect(() => {
        switch (props.iconCategory) {
            case 'Food & Drinks':
            {
                setIconName('fast-food-outline');
                setIconColorBG('aqua')
                break;
            }
            case 'Shopping':
            {
                setIconName('cart-outline');
                setIconColorBG('bisque')
                break;
            }
            case 'Housing':
            {
                setIconName('home-outline');
                setIconColorBG('blue')
                break;
            }
            case 'Transportation':
            {
                setIconName('car-sport-outline');
                setIconColorBG('violet')
                break;
            }

            case 'Life & Entertainment':
            {
                setIconName('videocam-outline');
                setIconColorBG('coral')
                break;
            }
            case 'Financial expenses':
            {
                setIconName('wallet-outline');
                setIconColorBG('orangered')
                break;
            }
            case 'Communication, PC, SmartPhone':
            {
                setIconName('wifi-outline');
                setIconColorBG('thistle')
                break;
            }
            case 'Investments':
            {
                setIconName('logo-bitcoin');
                setIconColorBG('mediumslateblue')
                break;
            }
            case 'Income':
            {
                setIconName('cash-outline');
                setIconColorBG('springgreen')
                break;
            }
            case 'Others':
            {
                setIconName('cube-outline');
                setIconColorBG('slategray')
                break;
            }

            default: {
                break;
            }
        }
    }, [])


    // const setIcon = () => {
    //     switch (props.iconCategory) {
    //         case 'Food & Drinks':
    //             {
    //                 setIconName('fast-food-outline');
    //                 setIconColorBG('aqua')
    //                 break;
    //             }
    //         case 'Shopping':
    //             {
    //                 setIconName('cart-outline');
    //                 setIconColorBG('bisque')
    //                 break;
    //             }
    //         case 'Housing':
    //             {
    //                 setIconName('fast-food-outline');
    //                 setIconColorBG('blue')
    //                 break;
    //             }
    //         case 'Transportation':
    //             {
    //                 setIconName('fast-food-outline');
    //                 setIconColorBG('violet')
    //                 break;
    //             }
    //         case 'Vehicle':
    //             {
    //                 setIconName('fast-food-outline');
    //                 setIconColorBG('chartreuse')
    //                 break;
    //             }
    //         case 'Life & Entertainment':
    //             {
    //                 setIconName('fast-food-outline');
    //                 setIconColorBG('coral')
    //                 break;
    //             }
    //         case 'Financial expenses':
    //             {
    //                 setIconName('fast-food-outline');
    //                 setIconColorBG('orangered')
    //                 break;
    //             }
    //         case 'Communication, PC, SmartPhone':
    //             {
    //                 setIconName('fast-food-outline');
    //                 setIconColorBG('thistle')
    //                 break;
    //             }
    //         case 'Investments':
    //             {
    //                 setIconName('fast-food-outline');
    //                 setIconColorBG('mediumslateblue')
    //                 break;
    //             }
    //         case 'Income':
    //             {
    //                 setIconName('fast-food-outline');
    //                 setIconColorBG('springgreen')
    //                 break;
    //             }
    //         case 'Others':
    //             {
    //                 setIconName('fast-food-outline');
    //                 setIconColorBG('slategray')
    //                 break;
    //             }

    //         default: {
    //             break;
    //         }
    //     }
    // }

    return (
        <View style={styles.body}>
            <View style={styles.btn}>
                <View style={{ justifyContent: "space-between", flex: 1, flexDirection: 'row' }}>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        {/*Icon*/}
                        <View style={[styles.iconView, { backgroundColor: iconColorBG }]}>
                            <Ionicons name={iconName} color={'black'} size={35} />
                        </View>

                        {/*heading left*/}
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={styles.text}>
                                {props.iconCategory}
                            </Text>
                            <Text style={styles.subtext}>
                                {props.description}
                            </Text>
                        </View>
                    </View>

                    {/*Heading right*/}
                    <View>
                        <Text style={[styles.text, income ? styles.inc : styles.exp]}>
                            {income ? '' : '-'} ₹ {props.money}
                        </Text>
                    </View>
                </View>


            </View>
        </View>
    )
    // return (
    //     <View style={styles.body}>
    //         <Pressable style={styles.btn}>
    //             <View style={{ justifyContent: "space-between", flex: 1, flexDirection: 'row' }}>

    //                 <View style={{ flex: 1, flexDirection: 'row' }}>
    //                     {/*Icon*/}
    //                     <View style={styles.iconView}>
    //                         <Ionicons name={'fast-food-outline'} color={'black'} size={40} />
    //                     </View>

    //                     {/*heading left*/}
    //                     <View style={{ paddingLeft: 10 }}>
    //                         <Text style={styles.text}>
    //                             {'Food'}
    //                         </Text>
    //                         <Text style={styles.subtext}>
    //                             {'Tea'}
    //                         </Text>
    //                     </View>
    //                 </View>

    //                 {/*Heading right*/}
    //                 <View>
    //                     <Text style={[styles.text, money ? styles.inc : styles.exp]}>
    //                         {money ? '' : '-'} ₹ {'100'}
    //                     </Text>
    //                 </View>
    //             </View>


    //         </Pressable>
    //     </View>
    // )
}
const styles = StyleSheet.create({
    body: {
        backgroundColor: 'black',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#8a8a8a'

    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
    },
    subtext: {
        color: '#8a8a8a',
        fontSize: 15,
        fontWeight: "bold",
    },
    btn: {
        marginTop: 15,
        flexDirection: "row",
    },
    iconView: {
        borderRadius: 50,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inc: {
        color: 'green'
    },
    exp: {
        color: 'red'
    }


});
export default Record;