import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from "./Components/Dashboard/Dashboard";
import {NavigationContainer} from "@react-navigation/native";
    import Profile from "./Components/User/Profile";
import Login from "./Components/User/Login";
import Exp_Inc from "./Components/Dashboard/Modules/Exp_Inc";
import AllRecords from "./Components/Dashboard/Modules/AllRecords";

const Drawer = createDrawerNavigator();
let login = true
export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator

                // initialRouteName={'Dashboard'}
                initialRouteName={'Exp_Inc'}
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: 'black',
                    },
                    drawerLabelStyle: {
                        fontSize: 20,
                    },
                    drawerActiveTintColor: "#33d6f3",
                    drawerActiveBackgroundColor: "#2e2d2d",
                    drawerInactiveTintColor: '#858585',
                    headerStyle: {
                        backgroundColor: '#2e2d2d',
                    },
                    headerTintColor: 'white',
                }
                }
            >
                <Drawer.Screen name="Profile" component={Profile}/>
                <Drawer.Screen name="Dashboard" component={Dashboard}/>
                <Drawer.Screen name='Logout' component={Login}/>
                <Drawer.Screen name='All Records' component={AllRecords}/>
                <Drawer.Screen name="Exp_Inc" component={Exp_Inc}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E2D2D',
        alignItems: 'center',
        justifyContent: 'center',
    }, text: {
        fontSize: 20
    }
});
