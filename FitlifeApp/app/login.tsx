import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { login } from "./services/api.service";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha email e senha");
      return;
    }

    try {
      setLoading(true);
      const { usuario, token } = await login(email, senha);

      console.log("Token de acesso:", token); // Para debug
      Alert.alert("Login realizado", `Bem-vindo(a), ${usuario.nome}!`);

      // Redireciona direto após o login
      router.push("/home");
    } catch (error) {
      let errorMessage = "Erro ao fazer login";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitlife App</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
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

      <Button
        title={loading ? "Carregando..." : "Entrar"}
        onPress={handleLogin}
        disabled={loading}
        color="#4CAF50"
      />

      <Text style={styles.demoText}>
        Dados para teste:{"\n"}
        Email: admin@fitlife.com{"\n"}
        Senha: 123456
      </Text>

      <Button
        title="Criar nova conta"
        onPress={() => router.push("/cadastro")}
        color="#2196F3"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  demoText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
});
