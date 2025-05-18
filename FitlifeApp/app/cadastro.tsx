import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

interface Usuario {
  nome: string;
  email: string;
  senha: string;
  tipo: "aluno"; // tipo fixo "aluno"
}

async function criarUsuario(usuario: Usuario) {
  const response = await fetch("http://localhost:3001/api/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Erro ao criar usuário");
  }

  return await response.json();
}

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      await criarUsuario({ nome, email, senha, tipo: "aluno" });
      router.replace("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Erro", error.message);
      } else {
        Alert.alert("Erro", "Ocorreu um erro desconhecido");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
      <Button
        title="Voltar para login"
        onPress={() => router.replace("/login")}
        color="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    paddingHorizontal: 5,
    color: "#000",
  },
});
