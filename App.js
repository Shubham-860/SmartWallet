import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from "./Components/Dashboard/Dashboard";
import {NavigationContainer} from "@react-navigation/native";
import Profile from "./Components/User/Profile";
import Login from "./Components/User/Login";
import Exp_Inc from "./Components/Dashboard/Modules/Exp_Inc";
import AllRecords from "./Components/Dashboard/Modules/AllRecords";
import {Provider} from "react-redux";
import {Store} from './Components/Redux/Store';
import LastRecordsOverview from "./Components/Dashboard/Modules/LastRecordsOverview";
import Logout from "./Components/User/Logout";


const Drawer = createDrawerNavigator();
let login = true
export default function App() {
    return (
        <Provider store={Store}>

            <NavigationContainer>
                <Drawer.Navigator

                    initialRouteName={'Dashboard'}
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
                            backgroundColor: 'rgb(31,38,42)',
                        },
                        headerTintColor: 'white',
                    }
                    }
                >
                    <Drawer.Screen name="Dashboard" component={Dashboard}/>
                    <Drawer.Screen name='All Records' component={AllRecords}/>
                    <Drawer.Screen name="Profile" component={Profile}/>
                    <Drawer.Screen name="Exp_Inc" component={Exp_Inc}
                                   options={{drawerItemStyle: {display: 'none'},swipeEnabled:false}}
                    />
                    <Drawer.Screen name='Login' component={Login}
                                   options={{headerShown: false, drawerItemStyle: {display: 'none'},swipeEnabled:false}}
                    />
                    {/*<Drawer.Screen name='Logout' component={Logout}*/}
                    {/*            options={{headerShown:false,swipeEnabled:false}}*/}
                    {/*/>*/}
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider>

    );
}