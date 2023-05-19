import React, { useState } from 'react';
import { View, Text, TextInput} from 'react-native';
import { Button, AppBar, Stack } from '@react-native-material/core';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExpense = ({ navigation }) => {
  const [name, setName] = useState('');
  const [plannedAmount, setPlannedAmount] = useState('');
  const [actualAmount, setActualAmount] = useState('');

  const handleNameChange = (value) => {
    setName(value);
  };

  const handlePlannedAmountChange = (value) => {
    setPlannedAmount(value);
  };

  const handleActualAmountChange = (value) => {
    setActualAmount(value);
  };

  const handleSaveItem = async () => {
    // Save item to memory-based list
    const newItem = { name, plannedAmount, actualAmount };
    try {
      // Get the existing items from AsyncStorage
      const existingItems = await AsyncStorage.getItem('Items');
      let items = [];
      if (existingItems !== null) {
        items = JSON.parse(existingItems);
      }
      // Add the new item to the list
      items.push(newItem);
      // Save the updated list to AsyncStorage
      await AsyncStorage.setItem('Items', JSON.stringify(items));
      console.log('Item saved:', newItem);
      navigation.navigate('Items', { item: newItem });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowItems = () => {
    // Navigate to Budget Entries Listing screen
    navigation.navigate('Items');
  };

  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!name.trim()) {
      alert('Please Enter Name');
      return;
    }
    //Check for the planned amount TextInput
    if (!plannedAmount.trim()) {
      alert('Please Enter planned amount');
      return;
    }
    if (!actualAmount.trim()) {
      alert('Please Enter actual amount');
      return;
    }
    handleSaveItem()
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD NEW ITEM</Text>
      <TextInput
        style={styles.input}
        placeholder="Name of the item"
        onChangeText={handleNameChange}
        value={name}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <TextInput
          style={styles.input}
          placeholder="Planned amount"
          onChangeText={handlePlannedAmountChange}
          value={plannedAmount}
          keyboardType="numeric"
        />
      </TouchableWithoutFeedback>
      <TextInput
        style={styles.input}
        placeholder="Actual amount"
        onChangeText={handleActualAmountChange}
        value={actualAmount}
        keyboardType="numeric"
      />
      <Button variant="contained" style={styles.button} title="Save" onPress={checkTextInput} />
      <Button style={styles.button} title="Show All Items" onPress={handleShowItems} />
    </View>
  );
};


const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue'
  },
    input: {
      height: 40,
      width: '80%',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    button: {
      marginTop: 20,
      width: '80%',
      borderRadius: 50,
    },
  };

export default AddExpense;
