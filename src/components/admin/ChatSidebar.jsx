import { useState, useEffect } from 'react';
import { X, Send, User, Clock } from 'lucide-react';
import styles from './ChatSidebar.module.css';

const ChatSidebar = ({ isOpen, onClose }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([
    {
      id: 1,
      userId: 1,
      userName: 'Adrian Fathir',
      userAvatar: 'AF',
      lastMessage: 'Ada kost campur yang tersedia?',
      time: '10:30 AM',
      unread: 2,
      messages: [
        {
          id: 1,
          sender: 'user',
          text: 'Halo, ada kost campur yang tersedia?',
          time: '10:30 AM',
        },
        {
          id: 2,
          sender: 'admin',
          text: 'Halo Adrian, ada beberapa kost campur yang tersedia. Bisa saya bantu?',
          time: '10:32 AM',
        },
      ],
    },
    {
      id: 2,
      userId: 2,
      userName: 'User Baru',
      userAvatar: 'UB',
      lastMessage: 'Bisa lihat foto kamar?',
      time: 'Yesterday',
      unread: 0,
      messages: [
        {
          id: 1,
          sender: 'user',
          text: 'Bisa lihat foto kamar yang lebih detail?',
          time: 'Yesterday',
        },
        {
          id: 2,
          sender: 'admin',
          text: 'Tentu, saya akan kirim foto-fotonya via WA ya',
          time: 'Yesterday',
        },
      ],
    },
    {
      id: 3,
      userId: 3,
      userName: 'Mahasiswa UGM',
      userAvatar: 'MU',
      lastMessage: 'Terima kasih informasinya',
      time: '2 days ago',
      unread: 0,
      messages: [
        {
          id: 1,
          sender: 'user',
          text: 'Kost dekat UGM ada yang ready?',
          time: '2 days ago',
        },
        {
          id: 2,
          sender: 'admin',
          text: 'Ada beberapa kost di daerah Gejayan',
          time: '2 days ago',
        },
        {
          id: 3,
          sender: 'user',
          text: 'Terima kasih informasinya',
          time: '2 days ago',
        },
      ],
    },
  ]);

  useEffect(() => {
    const savedChats = localStorage.getItem('kawankost_chats');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kawankost_chats', JSON.stringify(chats));
  }, [chats]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      sender: 'admin',
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setChats(
      chats.map((chat) =>
        chat.id === activeChat.id
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: message,
              time: newMessage.time,
            }
          : chat
      )
    );

    setMessage('');
  };

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    // Reset unread count
    setChats(chats.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c)));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatSidebar}>
      <div className={styles.sidebarHeader}>
        <h3>Chat Support</h3>
        <button onClick={onClose} className={styles.closeButton}>
          <X size={20} />
        </button>
      </div>

      <div className={styles.chatContainer}>
        {/* Chat List */}
        <div className={styles.chatList}>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`${styles.chatItem} ${
                activeChat?.id === chat.id ? styles.active : ''
              }`}
              onClick={() => handleSelectChat(chat)}
            >
              <div className={styles.chatAvatar}>{chat.userAvatar}</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatHeader}>
                  <h4>{chat.userName}</h4>
                  <span className={styles.chatTime}>
                    <Clock size={12} />
                    {chat.time}
                  </span>
                </div>
                <p className={styles.chatPreview}>{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className={styles.unreadBadge}>{chat.unread}</span>
              )}
            </div>
          ))}
        </div>

        {/* Chat Messages */}
        <div className={styles.messagesContainer}>
          {activeChat ? (
            <>
              <div className={styles.messagesHeader}>
                <div className={styles.activeUser}>
                  <div className={styles.userAvatar}>
                    {activeChat.userAvatar}
                  </div>
                  <div>
                    <h4>{activeChat.userName}</h4>
                    <p className={styles.userStatus}>Online</p>
                  </div>
                </div>
              </div>

              <div className={styles.messagesList}>
                {activeChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${styles.message} ${
                      msg.sender === 'admin' ? styles.sent : styles.received
                    }`}
                  >
                    <div className={styles.messageContent}>
                      <p>{msg.text}</p>
                      <span className={styles.messageTime}>{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className={styles.messageForm}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className={styles.messageInput}
                />
                <button type="submit" className={styles.sendButton}>
                  <Send size={20} />
                </button>
              </form>
            </>
          ) : (
            <div className={styles.noChatSelected}>
              <User size={48} />
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
