import { Image, StyleSheet, ScrollView, View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  JarScreen: undefined;
  Profile: { name: string };
};

type FirstPageScreenNavigationProp = StackNavigationProp<RootStackParamList, "JarScreen">;
type Props = {
  navigation: FirstPageScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/focztreklogo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Welcome to FoczTrek!</Text>
      <Text style={styles.subtitle}>Your journey to productivity begins here.</Text>

      <Button
        title="Get Started"
        onPress={() => navigation.navigate('JarScreen')}
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00E676',
    textAlign: 'center',
    marginBottom: 25,
  },
});
