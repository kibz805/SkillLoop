import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface User {
  name: string;
  avatar: string;
  skill: string;
}

interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface MessagePreviewProps {
  conversation: Conversation;
}

export default function MessagePreview({ conversation }: MessagePreviewProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: conversation.user.avatar }} style={styles.avatar} />
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.userName}>{conversation.user.name}</Text>
          <Text style={styles.timestamp}>{conversation.timestamp}</Text>
        </View>
        
        <Text style={styles.skillName}>{conversation.user.skill}</Text>
        
        <Text 
          style={[styles.messageText, conversation.unread > 0 && styles.unreadMessage]}
          numberOfLines={2}
        >
          {conversation.lastMessage}
        </Text>
      </View>
      
      {conversation.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadBadgeText}>{conversation.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  timestamp: {
    fontSize: 14,
    color: '#8E8E93',
  },
  skillName: {
    fontSize: 14,
    color: '#0066CC',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    color: '#6E6E73',
    lineHeight: 20,
  },
  unreadMessage: {
    fontWeight: '500',
    color: '#000000',
  },
  unreadBadge: {
    backgroundColor: '#0066CC',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});