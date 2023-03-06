import {Platform, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import CustomIconButton from "../../Utils/CustomIconButton";
import {Picker} from "@react-native-picker/picker";
import {useEffect, useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch} from "react-redux";
import {setTotalBalance} from "../../Redux/Actions";
import {push, ref, runTransaction, set} from "firebase/database";
import {auth, db} from "../../../firebase";
import {containerBg, liteGray, text} from "../../FixColors";

const Exp_Inc = ({navigation}) => { // const navigation = useNavigation();

    // console.log(user.uid)

    // States

    const dispatch = useDispatch();

    // Income / Expense
    const [income, setIncome] = useState(false)
    // picker
    const [selectedCategory, setSelectedCategory] = useState('Food & Drinks');
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
    // desc
    const [desc, setDesc] = useState('');
    // money
    const [money, setMoney] = useState('100');
    // date time
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    console.log(selectedTime)

    // For this page only
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [ampm, setAmPm] = useState('');

    let user = auth.currentUser;

    // use Effects
    // useEffect(() => {
    //     return auth.onAuthStateChanged(user => {
    //         if (!user) {
    //             navigation.navigate('Login');
    //         }
    //         // console.log('user : ',user)
    //     });
    // }, [auth]);

    useEffect(() => {
        navigation.navigate('Exp_Inc');
        console.log("reloaded 'Exp_Inc'")
    }, [db,navigation]);
    useEffect(() => {
        setSelectedTime(new Date());
        setSelectedDate(new Date());
    }, []);
    useEffect(() => {
        setHours(selectedTime.getHours() % 12 || 12);
        setMinutes(selectedTime.getMinutes());
        setAmPm(selectedTime.getHours() >= 12 ? 'PM' : 'AM');
    }, [selectedTime]);

    const toggleDatePicker = () => {
        setIsDatePickerVisible(!isDatePickerVisible);
    };

    const toggleTimePicker = () => {
        setIsTimePickerVisible(!isTimePickerVisible);
    };

    const close = () => {
        console.log("close");
        navigation.navigate("Dashboard");
    }

    const addRecord = () => {
        console.log("add")

        set(push(ref(db, "users/" + user.uid + "/records/")), {
            money: money,
            income: income,
            iconCategory: selectedCategory,
            iconIndex: selectedCategoryIndex,
            description: desc,
            date: selectedDate.toISOString(),
            time: selectedTime.toISOString(),
        }).then(r => {
                console.log("Record added " + r);
                ToastAndroid.show("Record added", ToastAndroid.SHORT)
            }
        )

        runTransaction(ref(db, "users/" + user.uid + "/total/"),
            (totalBalance) => {
                if (totalBalance) {
                    if (income) {
                        totalBalance = Number(totalBalance + (Number(money)))
                    } else {
                        totalBalance = Number(totalBalance - (Number(money)))
                    }
                } else {
                    income?
                        totalBalance = (Number(money)):
                        totalBalance = -(Number(money))
                }
                dispatch(setTotalBalance(totalBalance));
                return totalBalance
            }).then(r => console.log("Total added " + r))

        navigation.navigate('Dashboard');
    }

    return (<>
            {/*Header & add close Buttons*/}

            <View style={[styles.heading, Platform.OS === 'android' && styles.androidMargin]}>

                <CustomIconButton name={'close-sharp'} color={'white'} size={35} onPressFunction={close}/>

                <Text style={[GlobalStyle.textHeading]}> Add Record </Text>

                <CustomIconButton name={'checkmark-sharp'} color={'white'} size={35} onPressFunction={addRecord}/>

            </View>

            <View style={[GlobalStyle.mainBody]}>
                <View style={[GlobalStyle.firstBody, {flex: 1, padding: 10}]}>


                    {/*moneyNumber*/}
                    <View style={styles.moneyNumberView}>
                        <Text style={[styles.moneyNumber, {fontWeight: '400'}]}>₹{income ? ' +' : ' -'}</Text>
                        <TextInput
                            clearTextOnFocus={true}
                            value={money}
                            keyboardType={"numeric"}
                            style={styles.moneyNumber}
                            onChangeText={x => setMoney(x)}
                        >
                        </TextInput>
                    </View>

                    {/*info*/}

                    {/*Income / Expense*/}

                    <View style={[styles.category]}>
                        <View style={styles.col}>
                            <Pressable
                                onPress={() => setIncome(true)}
                                style={[styles.box, income && styles.selected]}>
                                <Text
                                    style={[styles.text, income && styles.selectedText]}>Income
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => setIncome(false)}
                                       style={[styles.box, income || styles.selected]}>
                                <Text
                                    style={[styles.text, income || styles.selectedText]}>Expense
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    {/*category*/}

                    <View style={styles.category}>
                        <Text style={[GlobalStyle.textHeading, styles.textHeading]}>
                            Category
                        </Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={selectedCategory}
                            mode={'dropdown'}
                            dropdownIconColor={'white'}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedCategory(itemValue)
                                setSelectedCategoryIndex(itemIndex)
                                console.log(selectedCategory)
                                // console.log(selectedCategoryIndex)
                            }
                            }>
                            <Picker.Item style={styles.pickerItem} label="Food & Drinks" value="Food & Drinks"/>
                            <Picker.Item style={styles.pickerItem} label="Shopping" value="Shopping"/>
                            <Picker.Item style={styles.pickerItem} label="Housing" value="Housing"/>
                            <Picker.Item style={styles.pickerItem} label="Transportation, Vehicle"
                                         value="Transportation"/>
                            <Picker.Item style={styles.pickerItem} label="Life & Entertainment"
                                         value="Life & Entertainment"/>
                            <Picker.Item style={styles.pickerItem} label="Financial expenses"
                                         value="Financial expenses"/>
                            <Picker.Item style={styles.pickerItem} label="Communication, PC, SmartPhone"
                                         value="Communication, PC, SmartPhone"/>
                            <Picker.Item style={styles.pickerItem} label="Investments" value="Investments"/>
                            <Picker.Item style={styles.pickerItem} label="Income" value="Income"/>
                            <Picker.Item style={styles.pickerItem} label="Others" value="Others"/>
                        </Picker>

                    </View>

                    {/*Description*/}

                    <View style={styles.category}>
                        <Text style={[GlobalStyle.textHeading, styles.textHeading]}>
                            Description
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            value={desc}
                            onChangeText={val => setDesc(val)}
                            placeholder={'Description'}
                            placeholderTextColor={'#8a8a8a'}
                            maxLength={50}

                        />
                    </View>

                    {/*date*/}

                    <View style={[styles.category]}>
                        <Text style={[GlobalStyle.textHeading, styles.textHeading]}>
                            Date
                        </Text>
                        <TouchableOpacity style={[{justifyContent: 'center'}, styles.touchableOpacity]}
                                          onPress={toggleDatePicker}>
                            {isDatePickerVisible && (
                                <DateTimePicker
                                    value={selectedDate}
                                    mode="date"
                                    display="default"
                                    timeZoneOffsetInMinutes={330}
                                    timeZoneOffsetInSeconds={19800}
                                    onChange={(event, date) => {

                                        if (date === undefined) {
                                            console.log("user cancelled")
                                        } else {
                                            setSelectedDate(date);
                                            toggleDatePicker();
                                        }
                                    }}
                                />
                            )}
                            <Text style={[GlobalStyle.textHeading, styles.textHeading, {width: "100%"}]}>
                                {selectedDate.toDateString()}
                            </Text>
                        </TouchableOpacity>


                    </View>

                    {/*Time*/}

                    <View style={styles.category}>
                        <Text style={[GlobalStyle.textHeading, styles.textHeading]}>
                            Time
                        </Text>

                        <TouchableOpacity style={[{justifyContent: 'center'}, styles.touchableOpacity]}
                                          onPress={toggleTimePicker}>
                            {isTimePickerVisible && (
                                <DateTimePicker
                                    value={selectedTime}
                                    mode="time"
                                    display="default"
                                    timeZoneOffsetInMinutes={330}
                                    timeZoneOffsetInSeconds={19800}
                                    onChange={(event, time) => {

                                        setSelectedTime(time);
                                        setIsTimePickerVisible(!isTimePickerVisible);

                                    }}
                                />
                            )}

                            <Text style={[GlobalStyle.textHeading, styles.textHeading, {width: "100%"}]}>
                                {`${hours}:${minutes} ${ampm}`}
                            </Text>
                        </TouchableOpacity>


                    </View>


                </View>
            </View>
        </>
    )
}
// let text = "#ffffff";
// let liteGray = '#8a8a8a';
// let inputBGColor = '#000000';

const styles = StyleSheet.create({

    moneyNumber: {
        color: text,
        fontSize: 50,
        fontWeight: "bold",
        textAlign: "right",
        paddingStart: 10,
        marginEnd: 5
    },
    moneyNumberView: {
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    picker: {
        backgroundColor: containerBg,
        color: text,
        width: '60%',
        marginBottom: 5,
        marginVertical: 2,
    },
    pickerItem: {
        color: text,
        backgroundColor: containerBg,
        paddingLeft: 5,
        marginVertical: 2,
    },
    category: {
        flexDirection: "row",
        height: 55,
        marginVertical: 2
    },
    textHeading: {
        alignSelf: "center",
        width: '40%',
        fontSize: 22,
    },
    textInput: {
        borderColor: liteGray,
        // borderWidth: 1,
        backgroundColor: containerBg,
        color: '#ffffff',
        width: '60%',
        height: 55,
        fontSize: 18,
        paddingLeft: 5,
        marginVertical: 2,
        borderBottomWidth: 2
    },
    touchableOpacity: {
        backgroundColor: containerBg,
        color: '#ffffff',
        width: '60%',
        height: 55,
        fontSize: 18,
        paddingLeft: 5,
        marginVertical: 2,
        borderColor: liteGray,
        borderBottomWidth: 2
    }
    ,
    text: {
        color: '#8a8a8a',
        fontSize: 23,
    }
    ,
    col: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        height: 40
    },
    box: {
        flex: 1,
        marginHorizontal: 10,
        alignItems: 'center',
        width: 100,
    },
    selected: {
        color: text,
        borderBottomColor: liteGray,
        borderBottomWidth: 2,
    },
    selectedText: {
        color: text,
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: containerBg,
        borderBottomColor: "rgba(17,17,17,0.89)",
        borderBottomWidth: 1,
        paddingBottom: 8
    },
    androidMargin: {
        paddingTop: 10,
        paddingHorizontal: 10
    },
});export default Exp_Inc;