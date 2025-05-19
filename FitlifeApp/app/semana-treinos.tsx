import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export default function SemanaTreinosScreen() {
  const router = useRouter();
  const diaAtual = new Date().getDay(); // 0 (domingo) até 6 (sábado)

  const [progressoSemanal, setProgressoSemanal] = useState(
    diasDaSemana.map((dia, index) => ({
      dia,
      desbloqueado: false,
      concluido: false,
    }))
  );

  // Desbloquear o treino do dia atual ao carregar
  useEffect(() => {
    setProgressoSemanal((prev) => {
      const atual = [...prev];
      atual[diaAtual].desbloqueado = true;
      return atual;
    });
  }, []);

  const concluirTreino = (index: number) => {
    setProgressoSemanal((prev) => {
      const novosDados = [...prev];
      novosDados[index].concluido = true;

      // desbloqueia o próximo dia (circular)
      const proximoIndex = (index + 1) % diasDaSemana.length;
      novosDados[proximoIndex].desbloqueado = true;

      return novosDados;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Semana de Treinos</Text>

      {progressoSemanal.map((dia, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.dia}>
            {dia.dia} {index === diaAtual ? '(Hoje)' : ''}
          </Text>

          {dia.concluido ? (
            <Text style={styles.concluido}>✅ Concluído</Text>
          ) : dia.desbloqueado ? (
            <>
              <Button
                title="Ver treino"
                onPress={() => router.push(`/treino-dia?dia=${dia.dia}`)}
              />
              <Button
                title="Marcar como concluído"
                onPress={() => concluirTreino(index)}
                color="green"
              />
            </>
          ) : (
            <Text style={styles.bloqueado}>🔒 Bloqueado</Text>
          )}
        </View>
      ))}

      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  dia: { fontSize: 20, marginBottom: 10 },
  concluido: { color: 'green', fontWeight: 'bold' },
  bloqueado: { color: 'gray' },
});
