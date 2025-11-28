import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useNavigation } from '@react-navigation/native';

export default function Task3({ route }) {
  const navigation = useNavigation();
  const { tasks1, tasks2, tasks3, tasks4 , enttext1 , enttext2 } = route.params;
  const [text1, onChangeText1] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [duration, setDuration] = useState('00:25:00');

  const convertToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleStart = () => setIsPlaying(true);
  const handleReset = () => {
    setKey(prevKey => prevKey + 1);
    setIsPlaying(false);
  };

  const totalSeconds = convertToSeconds(duration);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.fullBackground}>
        <View style={styles.container}>
          <Image 
            source={require('../../assets/images/3.3.png')} 
            style={styles.image}
          />
          <Text style={styles.title}>Enter Your Task Below</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText1}
            placeholder="Type your task..."
            placeholderTextColor="#888"
          />
          <Text style={styles.selectedTask}>Task Selected: <Text style={styles.highlight}>{text1}</Text></Text>
          <Text style={styles.title}>Task Timer</Text>
          <TextInput
            style={styles.timerInput}
            value={duration}
            onChangeText={setDuration}
            placeholder="HH:MM:SS"
            keyboardType="numeric"
          />
          <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={totalSeconds}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ shouldRepeat: false })}
          >
            {({ remainingTime }) => <Text style={styles.timerText}>{remainingTime}</Text>}
          </CountdownCircleTimer>
          <View style={styles.buttonContainer}>
            <Button title="Start Timer" onPress={handleStart} color="#28a745" />
            <Button title="Reset Timer" onPress={handleReset} color="#dc3545" />
          </View>
          <Button
            title="DONE"
            onPress={() => navigation.navigate('Task3complete', {
              enttext3: ` ${text1} `,
              tasks1, tasks2, tasks3, tasks4 , enttext1 , enttext2
            })}
            color="#007bff"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  fullBackground: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#d0ebff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 400,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#007bff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    backgroundColor: '#cfe8fc',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    height: 50,
    width: '50%',
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    backgroundColor: '#e0f7fa',
    marginBottom: 10,
  },
  selectedTask: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    backgroundColor: '#fff3cd',
    padding: 10,
    borderRadius: 5,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  timerInput: {
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#ff9800',
    padding: 10,
    width: '60%',
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: '#fbe9e7',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#d32f2f',
    backgroundColor: '#f8bbd0',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
});
