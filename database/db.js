import * as SQLite from 'expo-sqlite';

// Abre (ou cria) o banco de dados
const db = SQLite.openDatabaseSync('todo.db');

// Cria a tabela se não existir
export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      concluida INTEGER DEFAULT 0,
      latitude REAL,
      longitude REAL,
      criada_em TEXT DEFAULT (datetime('now','localtime'))
    );
  `);
}

// Retorna todas as tarefas
export function buscarTarefas() {
  return db.getAllSync('SELECT * FROM tarefas ORDER BY id DESC;');
}

// Insere uma nova tarefa
export function inserirTarefa(titulo, latitude, longitude) {
  db.runSync(
    'INSERT INTO tarefas (titulo, latitude, longitude) VALUES (?, ?, ?);',
    [titulo, latitude, longitude]
  );
}

// Alterna o status de concluída
export function alternarTarefa(id, concluida) {
  db.runSync('UPDATE tarefas SET concluida = ? WHERE id = ?;', [concluida, id]);
}

// Remove uma tarefa
export function removerTarefa(id) {
  db.runSync('DELETE FROM tarefas WHERE id = ?;', [id]);
}
