// Имитация базы данных
const db = {
    users: [
        { id: 1, username: 'user1', password: 'pass1', name: 'Пользователь 1' },
        { id: 2, username: 'user2', password: 'pass2', name: 'Пользователь 2' }
    ],
    chats: [
        { id: 1, name: "Андрей", participants: [1, 2], lastMessage: "Привет, как дела?", time: "12:30" }
    ],
    messages: [
        { id: 1, chatId: 1, senderId: 2, text: "Привет!", time: "12:30" },
        { id: 2, chatId: 1, senderId: 2, text: "Как дела?", time: "12:31" },
        { id: 3, chatId: 1, senderId: 1, text: "Привет! Все отлично, спасибо!", time: "12:35" }
    ]
};

// Имитация API
const api = {
    // Авторизация
    login(username, password) {
        return new Promise((resolve, reject) => {
            const user = db.users.find(u => u.username === username && u.password === password);
            if (user) {
                resolve(user);
            } else {
                reject('Неверный логин или пароль');
            }
        });
    },
    
    // Регистрация
    register(name, username, password) {
        return new Promise((resolve, reject) => {
            if (db.users.some(u => u.username === username)) {
                reject('Пользователь с таким логином уже существует');
                return;
            }
            
            const newUser = {
                id: db.users.length + 1,
                name,
                username,
                password
            };
            
            db.users.push(newUser);
            resolve(newUser);
        });
    },
    
    // Получение списка чатов
    getChats(userId) {
        return new Promise(resolve => {
            const chats = db.chats.filter(chat => chat.participants.includes(userId));
            resolve(chats);
        });
    },
    
    // Получение сообщений чата
    getMessages(chatId) {
        return new Promise(resolve => {
            const messages = db.messages.filter(msg => msg.chatId === chatId);
            resolve(messages);
        });
    },
    
    // Отправка сообщения
    sendMessage(chatId, senderId, text) {
        return new Promise(resolve => {
            const newMessage = {
                id: db.messages.length + 1,
                chatId,
                senderId,
                text,
                time: new Date().toISOString()
            };
            
            db.messages.push(newMessage);
            
            // Обновляем последнее сообщение в чате
            const chat = db.chats.find(c => c.id === chatId);
            if (chat) {
                chat.lastMessage = text;
                chat.time = 'Только что';
            }
            
            resolve(newMessage);
        });
    }
};
