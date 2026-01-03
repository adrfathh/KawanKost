import { useState, useEffect } from 'react';
import { X, Send, User, Clock, Search, Phone, Video, MoreVertical, Image, Paperclip, Smile } from 'lucide-react';
import styles from './ChatSidebarUser.module.css';

const ChatSidebarUser = ({ isOpen, onClose }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState([
    {
      id: 1,
      userId: 1,
      userName: 'Pemilik Kost Ayu',
      userAvatar: 'PA',
      userType: 'Pemilik',
      lastMessage: 'Halo, ada kamar kosong untuk bulan depan',
      time: '10:30 AM',
      unread: 2,
      messages: [
        {
          id: 1,
          sender: 'user',
          text: 'Halo, apakah kost masih ada kamar untuk bulan depan?',
          time: '10:30 AM',
        },
        {
          id: 2,
          sender: 'owner',
          text: 'Halo, masih ada kamar tipe A dengan harga Rp 1.800.000/bulan',
          time: '10:32 AM',
        },
      ],
    },
    {
      id: 2,
      userId: 2,
      userName: 'Admin KawanKost',
      userAvatar: 'AK',
      userType: 'Admin',
      lastMessage: 'Pesanan Anda sudah dikonfirmasi',
      time: 'Yesterday',
      unread: 0,
      messages: [
        {
          id: 1,
          sender: 'admin',
          text: 'Pesanan kost Eksklusif Ayu sudah dikonfirmasi',
          time: 'Yesterday',
        },
        {
          id: 2,
          sender: 'user',
          text: 'Terima kasih, kapan bisa melihat kamarnya?',
          time: 'Yesterday',
        },
      ],
    },
    {
      id: 3,
      userId: 3,
      userName: 'Pemilik Kost Samara',
      userAvatar: 'PS',
      userType: 'Pemilik',
      lastMessage: 'Bisa nego harga untuk sewa 6 bulan',
      time: '2 days ago',
      unread: 1,
      messages: [
        {
          id: 1,
          sender: 'owner',
          text: 'Bapak/Ibu tertarik dengan kost Samara?',
          time: '2 days ago',
        },
        {
          id: 2,
          sender: 'user',
          text: 'Iya, apakah harganya bisa nego untuk sewa 6 bulan?',
          time: '2 days ago',
        },
      ],
    },
  ]);

  const filteredChats = chats.filter(
    (chat) =>
      chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const savedChats = localStorage.getItem('kawankost_user_chats');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kawankost_user_chats', JSON.stringify(chats));
  }, [chats]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user',
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

  const startNewChat = () => {
    const newChat = {
      id: Date.now(),
      userId: Date.now(),
      userName: 'Pemilik Kost Baru',
      userAvatar: 'PB',
      userType: 'Pemilik',
      lastMessage: 'Halo, ada yang bisa saya bantu?',
      time: 'Now',
      unread: 0,
      messages: [
        {
          id: 1,
          sender: 'owner',
          text: 'Halo, ada yang bisa saya bantu?',
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ],
    };
    setChats([newChat, ...chats]);
    setActiveChat(newChat);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatSidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.headerContent}>
          <h3>Chat</h3>
          <div className={styles.headerActions}>
            <button className={styles.newChatButton} onClick={startNewChat}>
              + Baru
            </button>
            <button onClick={onClose} className={styles.closeButton}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Cari chat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.chatContainer}>
        {/* Chat List */}
        <div className={styles.chatList}>
          {filteredChats.length === 0 ? (
            <div className={styles.noChats}>
              <p>Tidak ada percakapan saat ini</p>
              <button className={styles.startChatButton} onClick={startNewChat}>
                Mulai Chat Baru
              </button>
            </div>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`${styles.chatItem} ${
                  activeChat?.id === chat.id ? styles.active : ''
                }`}
                onClick={() => handleSelectChat(chat)}
              >
                <div className={styles.chatAvatar}>
                  {chat.userAvatar}
                  {chat.userType === 'Admin' && (
                    <span className={styles.adminBadge}>A</span>
                  )}
                </div>
                <div className={styles.chatInfo}>
                  <div className={styles.chatHeader}>
                    <div>
                      <h4>{chat.userName}</h4>
                      <span className={styles.chatType}>{chat.userType}</span>
                    </div>
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
            ))
          )}
        </div>

        {/* Chat Messages */}
        <div className={styles.messagesContainer}>
          {activeChat ? (
            <>
              <div className={styles.messagesHeader}>
                <div className={styles.activeUser}>
                  <div className={styles.userAvatar}>
                    {activeChat.userAvatar}
                    {activeChat.userType === 'Admin' && (
                      <span className={styles.userAdminBadge}>A</span>
                    )}
                  </div>
                  <div>
                    <h4>{activeChat.userName}</h4>
                    <p className={styles.userType}>{activeChat.userType}</p>
                  </div>
                </div>
                <div className={styles.messageActions}>
                  <button className={styles.actionButton}>
                    <Phone size={20} />
                  </button>
                  <button className={styles.actionButton}>
                    <Video size={20} />
                  </button>
                  <button className={styles.actionButton}>
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              <div className={styles.messagesList}>
                {activeChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${styles.message} ${
                      msg.sender === 'user' ? styles.sent : styles.received
                    }`}
                  >
                    <div className={styles.messageContent}>
                      <p>{msg.text}</p>
                      <span className={styles.messageTime}>{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.messageInputContainer}>
                <div className={styles.messageAttachments}>
                  <button className={styles.attachmentButton}>
                    <Image size={20} />
                  </button>
                  <button className={styles.attachmentButton}>
                    <Paperclip size={20} />
                  </button>
                  <button className={styles.attachmentButton}>
                    <Smile size={20} />
                  </button>
                </div>
                <form
                  onSubmit={handleSendMessage}
                  className={styles.messageForm}
                >
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ketik pesan..."
                    className={styles.messageInput}
                  />
                  <button type="submit" className={styles.sendButton}>
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className={styles.noChatSelected}>
              <div className={styles.noChatIllustration}>
                <div className={styles.chatBubble}>
                  <span>💬</span>
                </div>
                <div className={styles.chatBubble}>
                  <span>👋</span>
                </div>
              </div>
              <h4>Pilih percakapan</h4>
              <p>Pilih chat untuk mulai percakapan atau mulai chat baru</p>
              <button
                className={styles.selectChatButton}
                onClick={startNewChat}
              >
                Mulai Chat Baru
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebarUser;
