import { StyleSheet, ScrollView, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Task4complete({ route }) {
  const { enttext1, enttext2 , enttext3 , enttext4 ,   tasks1, tasks2, tasks3, tasks4 } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView  style={{backgroundColor: 'lightblue'}} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Great you Completed these TASKS: {'\n'}  {'\t'} {enttext1} , {enttext2} , {enttext3} , {enttext4}</Text>
      
      <Button
        title="Proceed To the NEXT TASK"
        onPress={() => 
          navigation.navigate('Task5', { tasks1, tasks2, tasks3, tasks4, enttext1 , enttext2 , enttext3 , enttext4 })
        }
        color="#6200ea"
      />
      
      <Text>{'\n'}</Text>
      
      <Button
        title="Done with all TASKS for the Day"
        onPress={() => 
          navigation.navigate('alltasks', { enttext1, enttext2 , enttext3, enttext4, tasks1, tasks2, tasks3, tasks4 })
        }
        color="#d32f2f"
      />
      
      <Text style={styles.sectionTitle}>Your To Do List is Here. For Reference </Text>
      
      <View style={[styles.taskContainer, { backgroundColor: '#FF6B6B' }]}>  
        <Text style={styles.categoryTitle}>🔥 Urgent & Important</Text>
        <Text style={styles.taskText}>{tasks1}</Text>
      </View>

      <View style={[styles.taskContainer, { backgroundColor: '#4ECDC4' }]}>  
        <Text style={styles.categoryTitle}>🕒 Not Urgent & Important</Text>
        <Text style={styles.taskText}>{tasks2}</Text>
      </View>

      <View style={[styles.taskContainer, { backgroundColor: '#FFD166' }]}>  
        <Text style={styles.categoryTitle}>⚡ Urgent & Not Important</Text>
        <Text style={styles.taskText}>{tasks3}</Text>
      </View>

      <View style={[styles.taskContainer, { backgroundColor: '#BDBDBD' }]}>  
        <Text style={styles.categoryTitle}>⏳ Not Urgent & Not Important</Text>
        <Text style={styles.taskText}>{tasks4}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6200ea',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  taskContainer: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  taskText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});
