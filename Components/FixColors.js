let FixColors = () => {
    const bg = "#2e2d2d";
    const black = "#000000";
    const text = "#fdfdfd";
}
export default FixColors;

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    // fetch or read the data from firestore
    useEffect(() => {
        todoRef.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            const todos = [];
            querySnapshot.forEach((doc) => {
                const { heading } = doc.data();
                todos.push({
                    id: doc.id,
                    heading,
                });
            });
            setTodos(todos);
            //console.log(users)
        });
    }, []);

    // delete a todo from firestore db
    const deleteTodo = (todos) => {
        todoRef
            .doc(todos.id)
            .delete()
            .then(() => {
                // show a successful alert
                alert('Deleted successfully');
            })
            .catch((error) => {
                // show an error alert
                alert(error);
            });
    };

    // add a todo
    const addTodo = () => {
        // check if we have a todo.
        if (addData && addData.length > 0) {
            // get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp,
            };
            todoRef
                .add(data)
                .then(() => {
                    // release todo state
                    setAddData('');
                    // release keyboard
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    // show an alert in case of error
                    alert(error);
                });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.textHeadingContainer}>
                <Text style={styles.textHeading}>Todos App</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add new todo"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(heading) => setAddData(heading)}
                    value={addData}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{}}
                data={todos}
                numColumns={1}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity
                            style={styles.container}
                            onPress={() => navigation.navigate('Detail', { item })}>

                            <FontAwesome
                                name="trash-o"
                                color="red"
                                onPress={() => deleteTodo(item)}
                                style={styles.todoIcon}
                            />
                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading}>
                                    {item.heading}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textHeadingContainer: {
        paddingVertical: 20,
        alignContent: 'center',
        alignItems: 'center',
    },
    textHeading: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 45,
    },
    itemHeading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 22,
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },

    todoIcon: {
        marginTop: 5,
        fontSize: 20,
        marginLeft: 14,
    },
});

export default Home;
