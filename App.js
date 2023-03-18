import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from "./Components/Dashboard/Dashboard";
import {NavigationContainer} from "@react-navigation/native";
import Profile from "./Components/User/Profile";
import Login from "./Components/User/Login";
import Exp_Inc from "./Components/Dashboard/Modules/Exp_Inc";
import AllRecords from "./Components/Dashboard/Modules/AllRecords";
import {Provider} from "react-redux";
import {Store} from './Components/Redux/Store';
import EditRecord from "./Components/Dashboard/Modules/EditRecord";
import SignUp from "./Components/User/SignUp";
import Statistics from "./Components/Dashboard/Modules/Statistics";
import ForgotPassword from "./Components/User/ForgotPassword";


const Drawer = createDrawerNavigator();
export default function App() {
    return (
        <Provider store={Store}>

            <NavigationContainer>
                <Drawer.Navigator

                    initialRouteName={'Dashboard'}
                    // initialRouteName={'AddData'}
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
                            backgroundColor: '#000000',
                            // backgroundColor: 'rgb(31,38,42)',
                        },
                        headerTintColor: 'white',
                    }
                    }
                >
                    <Drawer.Screen name="Dashboard" component={Dashboard}/>
                    <Drawer.Screen name='All Records' component={AllRecords}/>
                    <Drawer.Screen name='Statistics' component={Statistics}/>
                    <Drawer.Screen name="Profile" component={Profile}/>
                    <Drawer.Screen name="ForgotPassword" component={ForgotPassword}
                                   options={{
                                       headerShown: false,
                                       drawerItemStyle: {display: 'none'},
                                       swipeEnabled: false
                                   }}/>
                    <Drawer.Screen name="SignUp" component={SignUp}
                                   options={{
                                       headerShown: false,
                                       drawerItemStyle: {display: 'none'},
                                       swipeEnabled: false
                                   }}/>
                    <Drawer.Screen name="Exp_Inc" component={Exp_Inc}
                                   options={{
                                       headerShown: false,
                                       drawerItemStyle: {display: 'none'},
                                       swipeEnabled: false
                                   }}/>
                    <Drawer.Screen name="EditRecord" component={EditRecord}
                                   options={{
                                       headerShown: false,
                                       drawerItemStyle: {display: 'none'},
                                       swipeEnabled: false
                                   }}/>
                    <Drawer.Screen name='Login' component={Login}
                                   options={{
                                       headerShown: false,
                                       drawerItemStyle: {display: 'none'},
                                       swipeEnabled: false
                                   }}/>

                    {/*<Drawer.Screen name="AddData" component={AddData}/>*/}

                    {/*<Drawer.Screen name='Logout' component={Logout}*/}
                    {/*            options={{headerShown:false,swipeEnabled:false}}*/}
                    {/*/>*/}
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider>

    );
}