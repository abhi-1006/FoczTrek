import { Image, StyleSheet, Platform, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Knowledge({ route }) {
  const navigation = useNavigation();
  const { tasks1, tasks2, tasks3, tasks4 } = route.params;
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.headerText}>This is an informative about How our BRAIN Works</Text>

      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/rationalthinker.png')} style={styles.image} />
      </View>
      
      <Text style={styles.subHeaderText}>This is the Normal HUMAN Focusing on his Goals</Text>
      
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/monkey.png')} style={styles.image} />
      </View>
      
      <Text style={styles.bodyText}>That is An Instant Gratification MONKEY searching for immediate pleasures and doesn't care about the future or Goals</Text>
      
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/monkeytake.png')} style={styles.image} />
      </View>
      
      <Text style={styles.bodyText}>There is always a Fight between both while deciding to do a Task. Which has the HIGHER ENERGY wins.</Text>
      
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/monkeytakeover.png')} style={styles.image} />
      </View>
      
      <Text style={styles.bodyText}>MONKEY takes over when it has a higher Energy</Text>
      
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/panicmonster.png')} style={styles.image} />
      </View>
      
      <Text style={styles.bodyText}>This is the PANIC MONSTER the only creature MONKEY is afraid of.</Text>
      
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/panicmonstert.png')} style={styles.image} />
      </View>
      
      <Text style={styles.bodyText}>The PANIC MONSTER arrives only when there is an External Deadline</Text>
      
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/frationalthinker.png')} style={styles.image} />
      </View>
      
      <Text style={styles.bodyText}>The MONKEY runs away but the HUMAN is still unhappy as he doesn’t have enough time left.</Text>

      <Text style={styles.questionText}>SO FROM NOW ON WHILE STARTING ANY TASK PLEASE ASK YOURSELF A QUESTION</Text>
      <Text style={styles.questionText}>WHO IS OPERATING MY BRAIN???</Text>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => 
          navigation.navigate('InfoEntered', { tasks1, tasks2, tasks3, tasks4 })
        }
      >
        <Text style={styles.buttonText}>DONE</Text>
      </TouchableOpacity>
      
      <Text style={styles.endingText}>You are now ready to tackle any task with full control over your brain!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#FFF8DC', 
    paddingBottom: 40, 
  },
  headerText: {
    fontSize: 30,
    fontWeight: '800', 
    textAlign: 'center',
    color: '#2c3e50', 
    marginVertical: 30,
    fontFamily: 'Roboto-Bold', 
    letterSpacing: 1.5, 
  },
  subHeaderText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#3498db', 
    marginVertical: 15,
    fontFamily: 'Roboto-Regular',
    letterSpacing: 1.2, 
  },
  bodyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#34495e', 
    marginVertical: 15,
    fontFamily: 'Georgia', 
    lineHeight: 24, 
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e74c3c', 
    marginVertical: 25,
    fontFamily: 'Courier-Bold',
    textDecorationLine: 'underline', 
    letterSpacing: 2, 
  },
  buttonContainer: {
    marginVertical: 30,
    width: '10%',
    backgroundColor: '#3498db', 
    borderRadius: 30, 
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2980b9', 
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF8DC',
    fontFamily: 'Arial',
  },
  endingText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#27ae60', 
    marginTop: 35,
    fontFamily: 'Verdana-Bold',
    letterSpacing: 1.2,
    paddingHorizontal: 40,
  },
  imageContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 500,
    height: 500,
    borderRadius: 15, 
    borderWidth: 2,
    borderColor: '#3498db', 
  },
});
