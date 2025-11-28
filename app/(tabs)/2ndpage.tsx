import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ScrollView, View, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';

export default function JarScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>THE JAR OF LIFE</Text>
      <Text style={styles.subheading}>Here we follow this principle:</Text>

      <View style={styles.videoContainer}>
  <iframe
    width="1900"
    height="1000"
    src="https://www.youtube.com/embed/6_N_uvq41Pg?si=6Cb1gakhyG8MjuaW"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
</View>


      <Text style={styles.description}>Please go through this video if you are unaware of it.</Text>

      <Button
        title="Next"
        onPress={() => navigation.navigate('FullQuadrants', { name: 'FullQuadrants' })}
        color="#ff9800"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#00E676',
    textAlign: 'center',
    marginBottom: 20,
  },
  videoContainer: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  video: {
    flex: 1,
  },
  
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
});
