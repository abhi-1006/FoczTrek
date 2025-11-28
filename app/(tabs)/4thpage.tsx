import { Image, StyleSheet, ScrollView, View, TextInput, Text, Button } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function UrgentImportant() {
  const navigation = useNavigation();
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [text4, setText4] = useState('');
  const [text5, setText5] = useState('');
  const [text6, setText6] = useState('');
  const [text7, setText7] = useState('');
  const [text8, setText8] = useState('');
  const [text9, setText9] = useState('');
  const [text10, setText10] = useState('');
  const [text11, setText11] = useState('');
  const [text12, setText12] = useState('');
  const [text13, setText13] = useState('');
  const [text14, setText14] = useState('');
  const [text15, setText15] = useState('');

  const handleDonePress = () => {
    const taskDetails = `
      Task 1: ${text1} - Start Time: ${text2} | End Time: ${text3}
      Task 2: ${text4} - Start Time: ${text5} | End Time: ${text6}
      Task 3: ${text7} - Start Time: ${text8} | End Time: ${text9}
      Task 4: ${text10} - Start Time: ${text11} | End Time: ${text12}
      Task 5: ${text13} - Start Time: ${text14} | End Time: ${text15}
    `;
    navigation.navigate('Noturgentimportant', { tasks1: taskDetails });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>LIST OUT ALL THE URGENT AND IMPORTANT TASKS</Text>
      <Text style={styles.subtitle}>These are Critical Tasks that need Immediate Attention</Text>

      {/* Task 1 */}
      <View style={styles.taskContainer}>
        <Text style={styles.taskTitle}>Task 1:</Text>
        <TextInput
          style={styles.input}
          value={text1}
          onChangeText={setText1}
          placeholder="Enter Task 1"
        />
        <Text style={styles.timeLabel}>Start Time:</Text>
        <TextInput
          style={styles.timeInput}
          value={text2}
          onChangeText={setText2}
          placeholder="Start Time"
        />
        <Text style={styles.timeLabel}>End Time:</Text>
        <TextInput
          style={styles.timeInput}
          value={text3}
          onChangeText={setText3}
          placeholder="End Time"
        />
      </View>

      {/* Task 2 */}
      <View style={styles.taskContainer}>
        <Text style={styles.taskTitle}>Task 2:</Text>
        <TextInput
          style={styles.input}
          value={text4}
          onChangeText={setText4}
          placeholder="Enter Task 2"
        />
        <Text style={styles.timeLabel}>Start Time:</Text>
        <TextInput
          style={styles.timeInput}
          value={text5}
          onChangeText={setText5}
          placeholder="Start Time"
        />
        <Text style={styles.timeLabel}>End Time:</Text>
        <TextInput
          style={styles.timeInput}
          value={text6}
          onChangeText={setText6}
          placeholder="End Time"
        />
      </View>

      {/* Task 3 */}
      <View style={styles.taskContainer}>
        <Text style={styles.taskTitle}>Task 3:</Text>
        <TextInput
          style={styles.input}
          value={text7}
          onChangeText={setText7}
          placeholder="Enter Task 3"
        />
        <Text style={styles.timeLabel}>Start Time:</Text>
        <TextInput
          style={styles.timeInput}
          value={text8}
          onChangeText={setText8}
          placeholder="Start Time"
        />
        <Text style={styles.timeLabel}>End Time:</Text>
        <TextInput
          style={styles.timeInput}
          value={text9}
          onChangeText={setText9}
          placeholder="End Time"
        />
      </View>

      {/* Task 4 */}
      <View style={styles.taskContainer}>
        <Text style={styles.taskTitle}>Task 4:</Text>
        <TextInput
          style={styles.input}
          value={text10}
          onChangeText={setText10}
          placeholder="Enter Task 4"
        />
        <Text style={styles.timeLabel}>Start Time:</Text>
        <TextInput
          style={styles.timeInput}
          value={text11}
          onChangeText={setText11}
          placeholder="Start Time"
        />
        <Text style={styles.timeLabel}>End Time:</Text>
        <TextInput
          style={styles.timeInput}
          value={text12}
          onChangeText={setText12}
          placeholder="End Time"
        />
      </View>

      {/* Task 5 */}
      <View style={styles.taskContainer}>
        <Text style={styles.taskTitle}>Task 5:</Text>
        <TextInput
          style={styles.input}
          value={text13}
          onChangeText={setText13}
          placeholder="Enter Task 5"
        />
        <Text style={styles.timeLabel}>Start Time:</Text>
        <TextInput
          style={styles.timeInput}
          value={text14}
          onChangeText={setText14}
          placeholder="Start Time"
        />
        <Text style={styles.timeLabel}>End Time:</Text>
        <TextInput
          style={styles.timeInput}
          value={text15}
          onChangeText={setText15}
          placeholder="End Time"
        />
      </View>

      <Button title="DONE" onPress={handleDonePress} color="#4CAF50" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#98FB98',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#1b5e20',
    textAlign: 'center',
    marginBottom: 20,
  },
  taskContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B22222',
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: '25%',
    borderColor: '#4169E1',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#ffffff',
    alignSelf: 'center', 
  },
  timeInput: {
    height: 40,
    width: '8%',
    borderColor: '#D3D3D3c',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#ffffff',
    alignSelf: 'center', 
  },
  timeLabel: {
    fontSize: 16,
    color: '#D2691E',
    marginBottom: 5,
  },
});
