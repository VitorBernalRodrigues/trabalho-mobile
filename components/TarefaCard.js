import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TarefaCard({ tarefa, onAlternar, onRemover }) {
  return (
    <View style={[styles.card, tarefa.concluida && styles.cardConcluido]}>
      {/* Botão de marcar concluída */}
      <TouchableOpacity
        style={[styles.circulo, tarefa.concluida && styles.circuloConcluido]}
        onPress={() => onAlternar(tarefa.id, tarefa.concluida ? 0 : 1)}
      >
        {tarefa.concluida ? <Text style={styles.check}>✓</Text> : null}
      </TouchableOpacity>

      {/* Informações da tarefa */}
      <View style={styles.info}>
        <Text style={[styles.titulo, tarefa.concluida && styles.tituloConcluido]}>
          {tarefa.titulo}
        </Text>

        {/* Localização (se disponível) */}
        {tarefa.latitude ? (
          <Text style={styles.localizacao}>
            📍 {tarefa.latitude.toFixed(4)}, {tarefa.longitude.toFixed(4)}
          </Text>
        ) : null}

        <Text style={styles.data}>{tarefa.criada_em}</Text>
      </View>

      {/* Botão de remover */}
      <TouchableOpacity style={styles.btnRemover} onPress={() => onRemover(tarefa.id)}>
        <Text style={styles.btnRemoverTexto}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardConcluido: {
    opacity: 0.6,
  },
  circulo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  circuloConcluido: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  check: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    color: '#1e1e2e',
    fontWeight: '500',
  },
  tituloConcluido: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  localizacao: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  data: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  btnRemover: {
    padding: 6,
  },
  btnRemoverTexto: {
    fontSize: 18,
  },
});
