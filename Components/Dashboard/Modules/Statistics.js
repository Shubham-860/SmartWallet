import {Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {LineChart, PieChart} from "react-native-chart-kit";
import {containerBg, liteGray, white} from "../../FixColors";
import {useNavigation} from "@react-navigation/native";

const Statistics = (props) => {

    const {db} = useSelector(state => state.userReducer)
    const navigation = useNavigation();

    console.log("props.onlyExp :", props.onlyExp)
    useEffect(() => {
    }, [db]);

    const [visible, setVisible] = useState(false);


    // noinspection DuplicatedCode
    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
    }

    let thisMonth = new Date().getMonth()
    const thisYear = new Date().getFullYear()


    const colorName = (Category) => {
        switch (Category) {
            case 'Food & Drinks': {
                return ('cyan')
            }
            case 'Shopping': {
                return ('burlywood')
            }
            case 'Housing': {
                return ('blue')
            }
            case 'Transportation': {
                return ('darkviolet')
            }
            case 'Life & Entertainment': {
                return ('coral')
            }
            case 'Financial expenses': {
                return ('orangered')
            }
            case 'Communication, PC, SmartPhone': {
                return ('yellow')
            }
            case 'Investments': {
                return ('green')
            }
            case 'Income': {
                return ('snow')
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
    }, []).map(record => ({
        name: record.iconCategory,
        money: Number(record.money),
        color: colorName(record.iconCategory),
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
    }))


    const totalExpenses = filteredData.reduce((sum, item) => {
        return sum + Number(item.money)
    }, 0)

    const totalIncome = db.reduce((sum, item) => {
        if (item.income) {
            console.log(sum)
            return sum + Number(item.money)
        } else {
            return sum
        }
    }, 0)

    // console.log("filteredData :", filteredData)
    // console.log("totalExpenses :", totalExpenses)
    // console.log("totalIncome :", totalIncome)


    const must = filteredData.filter(item => ['Housing', 'Transportation', 'Financial expenses', 'Income'].includes(item.name));
    const want = filteredData.filter(item => ['Food & Drinks', 'Life & Entertainment', 'Communication, PC, SmartPhone', 'Investments'].includes(item.name));
    const need = filteredData.filter(item => ['Shopping', 'Others'].includes(item.name));

    const mustTotal = must.reduce((total, item) => total + Number(item.money), 0);
    const wantTotal = want.reduce((total, item) => total + Number(item.money), 0);
    const needTotal = need.reduce((total, item) => total + Number(item.money), 0);

    const NatureOfSpending = [{
        name: "Must", money: mustTotal, color: "#1aff00", legendFontColor: '#7F7F7F', legendFontSize: 15
    }, {
        name: "Need", money: needTotal, color: "red", legendFontColor: '#7F7F7F', legendFontSize: 15
    }, {
        name: "Want", money: wantTotal, color: "orange", legendFontColor: '#7F7F7F', legendFontSize: 15
    },]

    // console.log("result : ", result);

    const Must = [{name: 'Housing', description: 'This is a basic necessity and a fundamental need for survival.'}, {
        name: 'Transportation, Vehicle',
        description: 'For many people, having reliable transportation is a must for getting to work or other essential activities.'
    }, {
        name: 'Financial expenses',
        description: 'Managing finances is essential for basic survival and long-term stability.'
    }, {name: 'Income', description: 'This is necessary to cover basic needs and expenses.'},];

    const Want = [{
        name: 'Food & Drinks',
        description: 'While food is a necessity, the specific types of food and drinks people consume can vary based on personal preferences and tastes.'
    }, {
        name: 'Life & Entertainment',
        description: "While it's important to have some leisure time and entertainment, these activities are not essential for survival."
    }, {
        name: 'Communication, PC, Smartphone',
        description: "While these tools can be very useful and convenient, they are not strictly necessary for basic survival."
    }, {
        name: 'Investments',
        description: "While investing can be a smart financial decision, it's not a necessity for survival."
    },];

    const Need = [{
        name: 'Shopping',
        description: 'While not strictly necessary, people often need to buy goods and services to meet their basic needs and maintain their lifestyle.'
    }, {
        name: 'Others',
        description: 'This category could include a variety of expenses or activities that are important to individuals, but not essential for survival.'
    },];

    const ExpensesChart = () => {
        return (
            <View style={GlobalStyle.body}>
                <Text style={GlobalStyle.textHeading}>
                    Expenses Structure
                </Text>
                <View style={{margin: 5, paddingLeft: 10}}>
                    <Text style={styles.text}>
                        ₹ {totalExpenses}
                    </Text>
                    <Text style={styles.subtext}>
                        Last 30 Days
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

                {props.onlyExp ? <TouchableOpacity
                    style={styles.topLine}
                    onPress={() => navigation.navigate("Statistics")}>
                    <Text style={[GlobalStyle.text, {color: 'dodgerblue', fontSize: 18, paddingLeft: 5, marginTop: 5}]}>Show
                        All</Text>
                </TouchableOpacity> : null}

            </View>
        )
    }

    return (
        props.onlyExp ?
            <ExpensesChart/>
            :
            <ScrollView style={GlobalStyle.mainBody}>

                {/*Pie Chart*/}

                <ExpensesChart/>

                {/*This month inc exp*/}
                <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>

                    <View style={[GlobalStyle.body, {flex: 1, marginHorizontal: 5, paddingLeft: 30}]}>
                        <Text style={[GlobalStyle.text]}>Income</Text>
                        <Text style={[GlobalStyle.textHeading, {paddingBottom: 10}]}>{totalIncome}</Text>
                        <Text style={[GlobalStyle.textHeading]}>{db.filter(item => {
                            const date = new Date(item.date);
                            return item.income && date.getMonth() >= thisMonth && date.getFullYear() === thisYear;
                        }).length}
                        </Text>
                        <Text style={[GlobalStyle.text]}>transactions </Text>
                    </View>

                    <View style={[GlobalStyle.body, {flex: 1, marginHorizontal: 5, paddingLeft: 30}]}>
                        <Text style={[GlobalStyle.text]}>EXPENSES</Text>
                        <Text style={[GlobalStyle.textHeading, {paddingBottom: 10}]}>{totalExpenses}</Text>
                        <Text style={[GlobalStyle.textHeading]}>{db.filter(item => {
                            const date = new Date(item.date);
                            return !item.income && date.getMonth() >= thisMonth && date.getFullYear() === thisYear;
                        }).length}
                        </Text>
                        <Text style={[GlobalStyle.text]}>transactions </Text>
                    </View>


                </View>

                {/*The Nature Of Spending*/}

                <TouchableOpacity style={GlobalStyle.body} onPress={() => setVisible(true)}>
                    <Text style={GlobalStyle.textHeading}>
                        The Nature of Spending
                    </Text>
                    <View style={{margin: 5, paddingLeft: 10}}>
                        <Text style={styles.text}>
                            ₹ {"10000"}
                        </Text>
                        <Text style={styles.subtext}>
                            Last 30 Days
                        </Text>
                    </View>
                    <PieChart
                        data={NatureOfSpending}
                        width={Dimensions.get('window').width - 40}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="money"
                        paddingLeft={'0'}
                        backgroundColor={"transparent"}/>
                </TouchableOpacity>

                {/*Other Chart*/}
                <View style={GlobalStyle.body}>
                    <Text style={GlobalStyle.text}>
                        Bezier Line Chart
                    </Text>
                    <LineChart
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June'], datasets: [{
                                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100]
                            }]
                        }}
                        width={Dimensions.get('window').width - 40} // from react-native
                        height={220}
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8, borderRadius: 16
                        }}
                    />
                </View>

                {/*Modal*/}

                <Modal visible={visible} animationType="slide" transparent={true}>
                    <View style={styles.modelView}>

                        <View style={styles.modelBody}>
                            <ScrollView>
                                <Text style={styles.textHeading}>Categories</Text>

                                <Text style={styles.textHeading}>Must</Text>

                                {Must.map((item) => (<View key={item.name}>
                                    <Text style={styles.subHeading}>{item.name}:</Text>
                                    <Text style={styles.description}>
                                        {item.description}</Text>
                                </View>))}

                                <Text style={styles.textHeading}>Want</Text>
                                {Want.map((item) => (<View key={item.name}>
                                    <Text style={styles.subHeading}>{item.name}:</Text>
                                    <Text style={styles.description}>
                                        {item.description}</Text>
                                </View>))}

                                <Text style={styles.textHeading}>Need</Text>
                                {Need.map((item) => (<View key={item.name}>
                                    <Text style={styles.subHeading}>{item.name}:</Text>
                                    <Text style={styles.description}>
                                        {item.description}</Text>
                                </View>))}

                                <View>
                                    <TouchableOpacity style={styles.btn} onPress={() => setVisible(false)}>
                                        <Text
                                            style={[styles.subHeading, {paddingTop: 0, paddingBottom: 5}]}> Close</Text>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>
                        </View>

                    </View>

                </Modal>
            </ScrollView>

    )
}
const styles = StyleSheet.create({

    text: {
        color: 'white', fontSize: 20, fontWeight: "bold",
    }, subtext: {
        color: '#8a8a8a', fontSize: 15, fontWeight: "bold",
    }, btn: {
        marginTop: 35,
        borderColor: white,
        borderWidth: 1,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: "100%",
    }, customBtn: {
        color: '#8a8a8a', borderColor: '#8a8a8a',
    }, img: {

        width: 250, height: 250
    }, modelBody: {
        backgroundColor: containerBg,
        borderRadius: 25,
        padding: 20,
        marginVertical: 50,
        alignItems: "center",
        justifyContent: "center"
    }, modelHeading: {
        textTransform: "uppercase", paddingLeft: 10, color: "white", fontSize: 24, fontWeight: "bold"
    }, modelView: {
        justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "rgba(0,0,0,0.65)",
    }, subHeading: {
        color: white, fontSize: 20, paddingVertical: 5, marginTop: 10
    }, description: {
        paddingLeft: 5, color: white,
    }, textHeading: {
        fontSize: 24, color: 'white', // color: '#33d6f3',
        fontWeight: "bold", textAlign: "center", marginTop: 5, marginBottom: 5
    },
    topLine: {
        borderColor: liteGray,
        borderTopWidth: 1
    }

});

export default Statistics;

