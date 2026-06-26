import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ total, concluidas }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📝 Minhas Tarefas</Text>
      <Text style={styles.subtitulo}>
        {concluidas}/{total} concluídas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46E5',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitulo: {
    fontSize: 14,
    color: '#C7D2FE',
    marginTop: 4,
  },
});
