import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TreinoDiaScreen() {
  const router = useRouter();
  const { dia } = useLocalSearchParams(); // vamos passar o dia como parâmetro opcional futuramente

  // Conteúdo fixo (exemplo). Pode ser um JSON futuramente.
  const treino = [
    { nome: 'Agachamento', series: '3x12' },
    { nome: 'Supino Reto', series: '3x10' },
    { nome: 'Remada Curvada', series: '3x8' },
    { nome: 'Abdominal', series: '4x20' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🏋️ Treino do Dia</Text>
      <Text style={styles.subTitle}>Dia: {dia || 'Desconhecido'}</Text>

      {treino.map((ex, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.exercise}>{ex.nome}</Text>
          <Text style={styles.series}>{ex.series}</Text>
        </View>
      ))}

      <Button title="Voltar" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subTitle: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  exercise: { fontSize: 18, fontWeight: 'bold' },
  series: { fontSize: 16, color: '#555' },
});
