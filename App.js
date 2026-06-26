import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

import { initDatabase, buscarTarefas, inserirTarefa, alternarTarefa, removerTarefa } from './database/db';
import Header from './components/Header';
import TarefaCard from './components/TarefaCard';
import BotaoAdicionar from './components/BotaoAdicionar';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [carregando, setCarregando] = useState(false);

  // useEffect: inicializa o banco e carrega as tarefas ao abrir o app
  useEffect(() => {
    initDatabase();
    carregarTarefas();
  }, []);

  // Lê todas as tarefas do SQLite e atualiza o estado
  function carregarTarefas() {
    const resultado = buscarTarefas();
    setTarefas(resultado);
  }

  // Pede permissão e retorna as coordenadas GPS atuais
  async function obterLocalizacao() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Localização não será salva nesta tarefa.');
      return { latitude: null, longitude: null };
    }
    const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
    return { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
  }

  // Adiciona uma nova tarefa com localização
  async function handleAdicionar() {
    const titulo = novoTitulo.trim();
    if (!titulo) {
      Alert.alert('Campo vazio', 'Digite o título da tarefa.');
      return;
    }

    setCarregando(true);
    const { latitude, longitude } = await obterLocalizacao();
    inserirTarefa(titulo, latitude, longitude);
    setNovoTitulo('');
    carregarTarefas();
    setCarregando(false);
  }

  // Alterna concluída/pendente no banco e recarrega
  function handleAlternar(id, novaConcluida) {
    alternarTarefa(id, novaConcluida);
    carregarTarefas();
  }

  // Remove tarefa após confirmação
  function handleRemover(id) {
    Alert.alert('Remover tarefa', 'Tem certeza que deseja remover esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          removerTarefa(id);
          carregarTarefas();
        },
      },
    ]);
  }

  const totalConcluidas = tarefas.filter((t) => t.concluida).length;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />

      {/* Componente de cabeçalho */}
      <Header total={tarefas.length} concluidas={totalConcluidas} />

      {/* Lista de tarefas */}
      <FlatList
        data={tarefas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TarefaCard
            tarefa={item}
            onAlternar={handleAlternar}
            onRemover={handleRemover}
          />
        )}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma tarefa ainda. Adicione uma! 🎯</Text>
        }
      />

      {/* Área de input para nova tarefa */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          placeholderTextColor="#9ca3af"
          value={novoTitulo}
          onChangeText={setNovoTitulo}
          onSubmitEditing={handleAdicionar}
        />
        {/* Componente de botão personalizado */}
        <BotaoAdicionar onPress={handleAdicionar} carregando={carregando} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  lista: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 15,
    color: '#9ca3af',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#f9fafb',
    color: '#1e1e2e',
  },
});
