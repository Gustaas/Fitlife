import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

type RegistroProgresso = {
  id: number;
  data: string;
  peso: string;
  altura: string;
  cintura: string;
  braco: string;
};

export default function ProgressoScreen() {
  const router = useRouter();

  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [cintura, setCintura] = useState('');
  const [braco, setBraco] = useState('');

  const [registros, setRegistros] = useState<RegistroProgresso[]>([]);

  const adicionarRegistro = () => {
    if (!peso || !altura || !cintura || !braco) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const novoRegistro: RegistroProgresso = {
      id: Date.now(),
      data: new Date().toLocaleDateString(),
      peso,
      altura,
      cintura,
      braco,
    };

    setRegistros([novoRegistro, ...registros]);

    setPeso('');
    setAltura('');
    setCintura('');
    setBraco('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Progresso</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (cm)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />
      <TextInput
        style={styles.input}
        placeholder="Cintura (cm)"
        keyboardType="numeric"
        value={cintura}
        onChangeText={setCintura}
      />
      <TextInput
        style={styles.input}
        placeholder="Braço (cm)"
        keyboardType="numeric"
        value={braco}
        onChangeText={setBraco}
      />

      <Button title="Salvar registro" onPress={adicionarRegistro} />

      <Text style={styles.subtitle}>Histórico de Registros</Text>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Data: {item.data}</Text>
            <Text>Peso: {item.peso} kg</Text>
            <Text>Altura: {item.altura} cm</Text>
            <Text>Cintura: {item.cintura} cm</Text>
            <Text>Braço: {item.braco} cm</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum registro ainda.</Text>}
      />

      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  subtitle: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 10,
  },
});
