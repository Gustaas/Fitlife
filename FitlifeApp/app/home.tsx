import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao FitlifeApp 💪</Text>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/treino-dia')}>
        <Text style={styles.cardText}>🏋️ Treino do Dia</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/semana-treinos')}>
        <Text style={styles.cardText}>📅 Semana de Treinos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/progresso')}>
        <Text style={styles.cardText}>📈 Progresso</Text>
      </TouchableOpacity>

      <Button title="Sair" onPress={() => router.replace('/login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  card: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
