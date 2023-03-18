import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import Record from "./SubModules/Record";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import {liteGray} from "../../FixColors";


const LastRecordsOverview = () => {
    const navigation = useNavigation();
    const {db} = useSelector(state => state.userReducer)
    let reversedArray = [...db].reverse();

    // console.log(db)
    useEffect(() => {
        // LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
        reversedArray = [...db].reverse();
    }, [db, reversedArray])

    return (
        <View style={[GlobalStyle.body, {flex: 1, height: "100%", width: '100%'}]}>
            <View>
                <Text style={GlobalStyle.textHeading}>
                    Last Records Overview
                </Text>
            </View>
            {reversedArray.length !== 0 ? (
                    <>
                        <View style={{flex: 1}}>

                            <ScrollView>

                                {reversedArray.slice(0, 5).map((item) =>
                                    (
                                        <TouchableOpacity
                                            key={item.id}
                                            onPress={() => {
                                                // console.log("pressed");
                                                navigation.navigate("EditRecord", {id: item.id})
                                            }}>
                                            <Record
                                                iconCategory={item.iconCategory}
                                                description={item.description}
                                                income={item.income}
                                                money={item.money}
                                            />
                                        </TouchableOpacity>

                                    )
                                )}
                            </ScrollView>

                            {/*<FlatList*/}
                            {/*    inverted={true}*/}
                            {/*    data={db.slice(-5)}*/}
                            {/*    // key={index}*/}
                            {/*    renderItem={*/}
                            {/*        rec => {*/}
                            {/*            // {console.log(rec.item.id)}*/}
                            {/*            return (*/}
                            {/*                <TouchableOpacity >*/}
                            {/*                    <Record*/}
                            {/*                        iconCategory={rec.item.iconCategory}*/}
                            {/*                        description={rec.item.description}*/}
                            {/*                        income={rec.item.income}*/}
                            {/*                        money={rec.item.money}*/}
                            {/*                    />*/}
                            {/*                </TouchableOpacity>*/}

                            {/*            )*/}
                            {/*        }*/}
                            {/*    }*/}
                            {/*/>*/}
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('All Records')}>
                            <Text style={[GlobalStyle.text, {
                                color: 'dodgerblue',
                                fontSize: 18,
                                paddingLeft: 5,
                                marginTop: 5
                            }]}>Show
                                All</Text>
                        </TouchableOpacity>
                    </>
                ) :
                (<View>
                    <Text style={[GlobalStyle.textHeading, {color: liteGray, paddingLeft: 15}]}>No records found</Text>
                </View>)
            }


        </View>
    )
}
// const styles = StyleSheet.create({});
export default LastRecordsOverview;