# 📝 ToDo App — React Native + Expo

Aplicativo de lista de tarefas desenvolvido como projeto prático da disciplina de **Programação para Dispositivos Móveis 1**.

## 👥 Integrantes

- Nome Completo 1
- Nome Completo 2

## 📱 Sobre o App

Um gerenciador de tarefas simples que permite criar, concluir e remover tarefas. Cada tarefa registra automaticamente a **localização GPS** de onde foi criada, que fica salva localmente no dispositivo.

## ✅ Requisitos Atendidos

| Requisito | Implementação |
|-----------|--------------|
| Componentização | `Header.js`, `TarefaCard.js`, `BotaoAdicionar.js` |
| Hooks | `useState` e `useEffect` em `App.js` |
| SQLite | CRUD completo em `database/db.js` |
| Hardware (GPS) | `expo-location` ao adicionar cada tarefa |
| GitHub | Este repositório |

## 🗂️ Estrutura

```
todo-app/
├── App.js                  # Tela principal e lógica
├── database/
│   └── db.js               # Funções SQLite (init, buscar, inserir, alternar, remover)
└── components/
    ├── Header.js            # Cabeçalho com contador
    ├── TarefaCard.js        # Card de exibição de cada tarefa
    └── BotaoAdicionar.js    # Botão personalizado
```

## 🚀 Como rodar

```bash
npm install
npx expo start
```

Escaneie o QR Code com o aplicativo **Expo Go** no celular.
