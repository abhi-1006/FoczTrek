import { Image, StyleSheet, ScrollView, View, Text } from 'react-native';

export default function alltasks({ route }) {
  const { enttext1, enttext2, enttext3, enttext4, enttext5 } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/summit.1.png')}
          style={styles.image}
        />
        
        <Text style={styles.completedTasksTitle}>Great that you Completed these TASKS:</Text>
        <Text style={styles.completedTasks}>{enttext1}, {enttext2}, {enttext3}, {enttext4}, {enttext5}</Text>
        
        <Text style={styles.consistencyMessage}>Come back Tomorrow and maintain <Text style={styles.highlight}>CONSISTENCY</Text>!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#f0f8ff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 800,
    height: 600,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#007bff',
    marginBottom: 20,
  },
  completedTasksTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004777',
    marginBottom: 10,
  },
  completedTasks: {
    fontSize: 20,
    color: '#333',
    backgroundColor: '#e6f7ff',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  consistencyMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginTop: 20,
  },
  highlight: {
    color: '#ff9800',
  },
});
