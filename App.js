import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './components/HomeScreen';
import AddExpense from './components/AddExpense';
import ItemList from './components/ItemList';





const stack  = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <stack.Navigator>
      
        <stack.Screen name="Budget App" component={HomeScreen} />

        <stack.Screen name="Add" component={AddExpense} />

        <stack.Screen name="Items" component={ItemList} />

        
      </stack.Navigator>
    </NavigationContainer>
    

  )
};

