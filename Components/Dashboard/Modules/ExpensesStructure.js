import {Dimensions, StyleSheet, Text, View} from "react-native";
import GlobalStyle from "../../Style/GlobalStyle";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {PieChart} from "react-native-chart-kit";

const ExpensesStructure = () => {

    const {db} = useSelector(state => state.userReducer)

    useEffect(() => {
    }, [db]);


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

    //  const colorName = (Category) => {
    //     switch (Category) {
    //         case 'Food & Drinks': {
    //             return ('aqua')
    //         }
    //         case 'Shopping': {
    //             return ('bisque')
    //         }
    //         case 'Housing': {
    //             return ('blue')
    //         }
    //         case 'Transportation': {
    //             return ('violet')
    //         }
    //
    //         case 'Life & Entertainment': {
    //             return ('coral')
    //         }
    //         case 'Financial expenses': {
    //             return ('orangered')
    //         }
    //         case 'Communication, PC, SmartPhone': {
    //             return ('thistle')
    //         }
    //         case 'Investments': {
    //             return ('mediumslateblue')
    //         }
    //         case 'Income': {
    //             return ('springgreen')
    //         }
    //         case 'Others': {
    //             return ('slategray')
    //         }
    //     }
    // }
    //
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
        <View style={GlobalStyle.body}>
            <Text style={GlobalStyle.textHeading}>
                Expenses Structure
            </Text>
            <View style={{margin: 5, paddingLeft: 10}}>
                <Text style={styles.text}>
                    ₹ {totalMoney}
                </Text>
                <Text style={styles.subtext}>
                    This Month
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
    )
}
const styles = StyleSheet.create({

    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
    },
    subtext: {
        color: '#8a8a8a',
        fontSize: 15,
        fontWeight: "bold",
    }, btn: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    customBtn: {
        color: '#8a8a8a',
        borderColor: '#8a8a8a',
    },
    img: {

        width: 250,
        height: 250
    }
});
export default ExpensesStructure;