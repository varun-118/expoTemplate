import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Welcome!
        </ThemedText>

        <ThemedText type="subtitle" style={styles.subtitle}>
          Choose a user
        </ThemedText>

        <Link href="/chat?user=A" asChild>
          <TouchableOpacity style={styles.button}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              User A
            </ThemedText>
          </TouchableOpacity>
        </Link>


        <Link href="/chat?user=B" asChild>
          <TouchableOpacity style={styles.buttonOutline}>
            <ThemedText type="defaultSemiBold" style={styles.buttonOutlineText}>
              User B
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  subtitle: {
    marginBottom: 40,
  },
  button: {
    width: '70%',
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
  },
  buttonOutline: {
    width: '70%',
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3B82F6',
    alignItems: 'center',
  },
  buttonOutlineText: {
    color: '#3B82F6',
  },
});
