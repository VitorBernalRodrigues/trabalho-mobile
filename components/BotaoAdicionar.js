import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function BotaoAdicionar({ onPress, carregando }) {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress} disabled={carregando}>
      {carregando ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.texto}>+ Adicionar</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 110,
  },
  texto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
