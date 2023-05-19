import { StyleSheet, Text, View } from 'react-native'
import { Button, AppBar, Stack } from '@react-native-material/core';
 

export default function HomeScreen({navigation}) { {
        return (
            <View >
                <View style={styles.container}>
                </View>
                <View>
                    <Button style={styles.Button1} variant="contained" title="Add expense" onPress={()=>navigation.navigate('Add')}/>
                    <Button style={styles.Button2} variant="contained" title="Item List" onPress={()=>navigation.navigate('Items')}/>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',

    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginLeft: 4,
        marginTop: 40,
        letterSpacing: 5,
        color: 'white'


    },
    Button1: {
        backgroundColor: "blue",
        marginLeft: 78,
        marginRight: 77,
        marginTop: 200,
        borderRadius: 16,
        padding: 19
    },
    Button2: {
        backgroundColor: "blue",
        marginLeft: 78,
        marginRight: 77,
        marginTop: 70,
        borderRadius: 16,
        padding: 19
    }

});