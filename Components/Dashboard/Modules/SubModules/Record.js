import {Pressable, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useState} from "react";

const Record = () => {

    const [money, setMoney] = useState(false);

    return (
        <View style={styles.body}>
            <Pressable style={styles.btn}>
                <View style={{justifyContent: "space-between",flex:1,flexDirection:'row'}}>

                    <View style={{flex:1,flexDirection:'row'}}>
                        {/*Icon*/}
                        <View style={styles.iconView}>
                            <Ionicons name={'fast-food-outline'} color={'black'} size={40}/>
                        </View>

                        {/*heading left*/}
                        <View style={{paddingLeft:10}}>
                            <Text style={styles.text}>
                                {'Food'}
                            </Text>
                            <Text style={styles.subtext}>
                                {'Tea'}
                            </Text>
                        </View>
                    </View>

                    {/*Heading right*/}
                    <View>
                        <Text style={[styles.text,money? styles.inc : styles.out]}>
                            {money?'':'-'} ₹ {'100'}
                        </Text>
                    </View>
                </View>


            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        backgroundColor: 'black',
        paddingBottom: 10,
        borderBottomWidth:1,
        borderBottomColor:'#8a8a8a'

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
    }, iconView: {
        backgroundColor: "orange",
        borderRadius: 50,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inc:{
        color:'green'
    },
    out:{
        color:'red'
    }


});
export default Record;