document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const chatList = document.querySelector('.chat-list');
    const messagesContainer = document.querySelector('.messages-container');
    const messageInput = document.querySelector('.message-input textarea');
    const sendButton = document.querySelector('.send-btn');
    const settingsButton = document.querySelector('.settings-btn');
    const closeSettingsButton = document.querySelector('.close-settings');
    const settingsPanel = document.querySelector('.settings-panel');
    
    // Загрузка чатов
    function loadChats() {
        // Здесь должен быть запрос к API для получения списка чатов
        // Для демо используем тестовые данные
        const chats = [
            { id: 1, name: "Андрей", lastMessage: "Привет, как дела?", time: "12:30", unread: 2 },
            { id: 2, name: "Мария", lastMessage: "Документы готовы", time: "10:15", unread: 0 },
            { id: 3, name: "Работа", lastMessage: "Совещание в 15:00", time: "09:45", unread: 5 },
            { id: 4, name: "Друзья", lastMessage: "Кино в субботу?", time: "Вчера", unread: 0 },
            { id: 5, name: "Родители", lastMessage: "Позвони, когда сможешь", time: "Понедельник", unread: 1 }
        ];
        
        chatList.innerHTML = '';
        chats.forEach(chat => {
            const chatItem = document.createElement('div');
            chatItem.className = 'chat-item';
            chatItem.setAttribute('data-chat-id', chat.id);
            chatItem.innerHTML = `
                <img src="assets/default-avatar.jpg" alt="Аватар" class="chat-avatar">
                <div class="chat-info">
                    <span class="chat-name">${chat.name}</span>
                    <span class="last-message">${chat.lastMessage}</span>
                </div>
                <div class="chat-time">${chat.time}</div>
                ${chat.unread > 0 ? `<div class="unread-count">${chat.unread}</div>` : ''}
            `;
            chatList.appendChild(chatItem);
            
            // Обработчик клика по чату
            chatItem.addEventListener('click', function() {
                loadMessages(chat.id);
                document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Загрузка сообщений
    function loadMessages(chatId) {
        // Здесь должен быть запрос к API для получения сообщений чата
        // Для демо используем тестовые данные
        const messages = [
            { id: 1, text: "Привет!", time: "12:30", incoming: true },
            { id: 2, text: "Как дела?", time: "12:31", incoming: true },
            { id: 3, text: "Привет! Все отлично, спасибо!", time: "12:35", incoming: false },
            { id: 4, text: "Что нового?", time: "12:36", incoming: true }
        ];
        
        messagesContainer.innerHTML = '';
        if (messages.length === 0) {
            messagesContainer.innerHTML = '<div class="empty-chat"><p>Нет сообщений</p></div>';
            return;
        }
        
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${message.incoming ? 'incoming' : 'outgoing'}`;
            messageElement.innerHTML = `
                <div class="message-text">${message.text}</div>
                <div class="message-time">${message.time}</div>
            `;
            messagesContainer.appendChild(messageElement);
        });
        
        // Прокрутка вниз
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Отправка сообщения
    function sendMessage() {
        const text = messageInput.value.trim();
        if (text === '') return;
        
        // Здесь должен быть запрос к API для отправки сообщения
        // Для демо просто добавляем сообщение в интерфейс
        const messageElement = document.createElement('div');
        messageElement.className = 'message outgoing';
        messageElement.innerHTML = `
            <div class="message-text">${text}</div>
            <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        `;
        messagesContainer.appendChild(messageElement);
        messageInput.value = '';
        
        // Прокрутка вниз
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Обработчики событий
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    settingsButton.addEventListener('click', function() {
        settingsPanel.classList.remove('hidden');
    });
    
    closeSettingsButton.addEventListener('click', function() {
        settingsPanel.classList.add('hidden');
    });
    
    // Инициализация
    loadChats();
});
