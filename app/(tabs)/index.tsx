import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { View,Text } from 'react-native';
import JarScreen from './2ndpage';
import FullQuadrants from './3rdpage';
import HomeScreen from './1stpage';
import UrgentImportant from './4thpage';
import Noturgentimportant from './5thpage';
import urgentnotimportant from './6thpage';
import noturgentnotimportant from './7thpage';
import Knowledge from './8thpage';
import InfoEntered from './9thpage';
import Task1 from './10thpage';
import Task1complete from './11thpage';
import Task2 from './12thpage';
import Task2complete from './13thpage';
import Task3 from './14thpage';
import Task3complete from './15thpage';
import Task4 from './16thpage';
import Task4complete from './17thpage';
import Task5 from './18thpage';
import Task5complete from './19thpage';
import alltasks from './20thpage';

const Stack = createNativeStackNavigator();

export default function MyApp() {
  return (
    
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="JarScreen" component={JarScreen} />
        <Stack.Screen name="FullQuadrants" component={FullQuadrants} />
        <Stack.Screen name="UrgentImportant" component={UrgentImportant} />
        <Stack.Screen name="Noturgentimportant" component={Noturgentimportant} />
        <Stack.Screen name="urgentnotimportant" component={urgentnotimportant} />
        <Stack.Screen name="noturgentnotimportant" component={noturgentnotimportant} />
        <Stack.Screen name="Knowledge" component={Knowledge} />
        <Stack.Screen name="InfoEntered" component={InfoEntered} />
        <Stack.Screen name="Task1" component={Task1} />
        <Stack.Screen name="Task1complete" component={Task1complete} />
        <Stack.Screen name="Task2" component={Task2} />
        <Stack.Screen name="Task2complete" component={Task2complete} />
        <Stack.Screen name="Task3" component={Task3} />
        <Stack.Screen name="Task3complete" component={Task3complete} />
        <Stack.Screen name="Task4" component={Task4} />
        <Stack.Screen name="Task4complete" component={Task4complete} />
        <Stack.Screen name="Task5" component={Task5} />
        <Stack.Screen name="Task5complete" component={Task5complete} />
        <Stack.Screen name="alltasks" component={alltasks} />
        
      </Stack.Navigator>
    
  
    //<HomeScreen />
  )
}

         //<Stack.Screen name="JarScreen" component={JarScreen} />
          //<Stack.Screen name="FullQuadrants" component={FullQuadrants} />