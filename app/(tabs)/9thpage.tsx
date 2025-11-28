import { Image, StyleSheet, ScrollView, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function InfoEntered({ route }) {
  const navigation = useNavigation();
  const { tasks1, tasks2, tasks3, tasks4 } = route.params;

  return (
    <ScrollView  style={{backgroundColor: 'lightblue'}} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>All the Tasks You Have Listed</Text>
      
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

      <Button title="DONE" onPress={() => navigation.navigate('Task1' , { tasks1: tasks1 , tasks2: tasks2 , tasks3: tasks3 , tasks4: tasks4})} color="#6200ea" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskContainer: {
    width: '90%',
    backgroundColor: '#fff',
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
    color: '#6200ea',
    marginBottom: 5,
  },
  taskText: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
  },
});
