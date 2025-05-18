import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';

type Usuario = {
  nome: string;
  email: string;
  tipo: string;
};

export default function PerfilScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>(); // tipando o id como string opcional

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const response = await fetch(`https://seu-backend.com/api/usuario/${id ?? 'me'}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do usuário');
        }
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        Alert.alert('Erro', (error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsuario();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text>Usuário não encontrado.</Text>
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{usuario.nome}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{usuario.email}</Text>

      <Text style={styles.label}>Tipo:</Text>
      <Text style={styles.value}>{usuario.tipo}</Text>

      {/* Futuro: botão para editar perfil */}
      <Button title="Editar Perfil" onPress={() => Alert.alert('Funcionalidade futura')} />

      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  value: { fontSize: 18, marginBottom: 5 },
});
