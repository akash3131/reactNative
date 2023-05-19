import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';

const ItemList = () => {
  const [budgetEntries, setBudgetEntries] = useState([]);
  const [totalAmountSpent, setTotalAmountSpent] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const budgetEntriesData = await AsyncStorage.getItem('Items');
        if (budgetEntriesData !== null) {
          setBudgetEntries(JSON.parse(budgetEntriesData));
        }
      } catch (e) {
        console.error('Failed to load budget entries', e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const actualAmounts = budgetEntries.map((entry) => parseFloat(entry.actualAmount));
    const totalAmount = actualAmounts.reduce((acc, val) => acc + val, 0);
    setTotalAmountSpent(totalAmount);
  }, [budgetEntries]);

  const renderBudgetEntryItem = ({ item }) => {

    const onDeleteItem = async (id) => {
      try {
        const updatedEntries = budgetEntries.filter((entry) => entry.id !== id);
        await AsyncStorage.setItem('Items', JSON.stringify(updatedEntries));
        setBudgetEntries(updatedEntries);
      } catch (e) {
        console.error('Failed to delete item', e);
      }
    };
    

    return (
      <View style={styles.item}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemAmount}>
          Planned amount: {item.plannedAmount}
        </Text>
        <Text style={styles.itemAmount}>
          Actual amount: {item.actualAmount}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDeleteItem(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Item List</Text>
      <FlatList
        data={budgetEntries}
        renderItem={renderBudgetEntryItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.totalAmount}>
        Total amount spent: {totalAmountSpent}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#B6FBEB',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemAmount: {
    fontSize: 18,
    marginBottom: 3,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#7D26CD',
    color: 'white',
    borderRadius: 30

  },
  deleteButton: {
    backgroundColor: '#FF5252',
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default ItemList;
