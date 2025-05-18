import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:3001';

export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  tipo: string;
  senha?: string;
}

export interface Treino {
  id?: string;
  usuarioId: string;
  exercicio: string;
  repeticoes?: number;
  concluido?: boolean;
  data?: string;
}

export interface LoginResponse {
  usuario: Usuario;
  token: string;
}

export async function criarUsuario(usuario: Usuario): Promise<Usuario> {
  const response = await fetch(`${BASE_URL}/api/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.error || 'Erro ao criar usuário');

  return data;
}

export async function login(email: string, senha: string): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.error || 'Erro ao fazer login');

  await armazenarToken(data.token);

  return data;
}

export async function buscarUsuario(id: string): Promise<Usuario> {
  const response = await fetch(`${BASE_URL}/api/usuarios/${id}`);

  if (!response.ok) throw new Error('Erro ao buscar usuário');

  return response.json();
}

export async function criarTreino(treino: Treino): Promise<Treino> {
  const response = await fetch(`${BASE_URL}/api/treinos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(treino),
  });

  if (!response.ok) throw new Error('Erro ao criar treino');

  return response.json();
}

export async function listarTreinos(usuarioId: string): Promise<Treino[]> {
  const response = await fetch(`${BASE_URL}/api/treinos/${usuarioId}`);

  if (!response.ok) throw new Error('Erro ao buscar treinos');

  return response.json();
}

// AsyncStorage para React Native

export async function armazenarToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (e) {
    console.error('Erro ao salvar token', e);
  }
}

export async function obterToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (e) {
    console.error('Erro ao obter token', e);
    return null;
  }
}

export async function estaAutenticado(): Promise<boolean> {
  const token = await obterToken();
  return !!token;
}

export async function logout(): Promise<void> {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (e) {
    console.error('Erro ao remover token', e);
  }
}
