// @ts-nocheck
import { Image, StyleSheet, ScrollView, View, Text, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import type { CompositeNavigationProp, CompositeScreenProps } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  UrgentImportant: undefined, 
  Profile: { name: string };
};

type RootStackParamList1 = {
  Noturgentimportant: undefined, 
  Profile: { name: string };
};

export default function FullQuadrants({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Welcome to FoczTrek</Text>
        <Text style={styles.subheading}>Please fill in your tasks accordingly</Text>
      </View>

      <Image source={require('../../assets/images/all1.png')} style={styles.image} resizeMode="contain" />

      
      <View style={styles.buttonContainer}>
        <Button
          title="Urgent and Important"
          onPress={() => navigation.navigate('UrgentImportant')}
          color="#4CAF50" // Green button
        />
        <Button
          title="Not Urgent but Important"
          onPress={() => navigation.navigate('Noturgentimportant')}
          color="#2196F3" // Blue button
        />
        <Button
          title="Urgent but Not Important"
          onPress={() => navigation.navigate('urgentnotimportant', { name: 'urgentnotimportant' })}
          color="#FF9800" // Orange button
        />
        <Button
          title="Not Urgent and Not Important"
          onPress={() => navigation.navigate('noturgentnotimportant', { name: 'noturgentnotimportant' })}
          color="#f44336" // Red button
        />
      </View>
    </ScrollView>
  );
}

type FirstPageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UrgentImportant'
>;

type FirstPageScreenNavigationProp1 = StackNavigationProp<
  RootStackParamList1,
  'Noturgentimportant'
>;

type Props = CompositeNavigationProp<
  FirstPageScreenNavigationProp,
  FirstPageScreenNavigationProp1
>;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', 
  },
  headerContainer: {
    padding: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F8E71C', 
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 20,
    color: '#8e44ad', 
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 500, 
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
});
