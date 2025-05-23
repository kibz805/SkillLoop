import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon } from 'lucide-react-native';
import SearchBar from '@/components/SearchBar';
import MessagePreview from '@/components/MessagePreview';

export default function MessagesScreen() {
  const [activeTab, setActiveTab] = useState('all');

  // Mock conversation data
  const conversations = [
    {
      id: '1',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
        skill: 'Piano Lessons',
      },
      lastMessage: "Hi there! I'm interested in learning piano. Are you available for lessons next week?",
      timestamp: '10:30 AM',
      unread: 2,
    },
    {
      id: '2',
      user: {
        name: 'Alex Chen',
        avatar: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg',
        skill: 'Web Development',
      },
      lastMessage: "I've sent you the resources we discussed during our last session.",
      timestamp: 'Yesterday',
      unread: 0,
    },
    {
      id: '3',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        skill: 'Yoga for Beginners',
      },
      lastMessage: "Don't forget about our session tomorrow at 9 AM!",
      timestamp: 'Yesterday',
      unread: 1,
    },
    {
      id: '4',
      user: {
        name: 'Michael Brown',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        skill: 'Photography Basics',
      },
      lastMessage: "I really liked the photos you took during our last lesson. You're making great progress!",
      timestamp: 'Monday',
      unread: 0,
    },
    {
      id: '5',
      user: {
        name: 'Sophie Martin',
        avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
        skill: 'French Conversation',
      },
      lastMessage: "Bonjour! Let me know when you want to schedule our next conversation practice.",
      timestamp: 'Sunday',
      unread: 0,
    },
  ];

  const renderTabButton = (title, tabName) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tabName && styles.activeTabButton]}
      onPress={() => setActiveTab(tabName)}
    >
      <Text style={[styles.tabButtonText, activeTab === tabName && styles.activeTabButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <SearchBar placeholder="Search messages" />
      </View>
      
      <View style={styles.tabContainer}>
        {renderTabButton('All', 'all')}
        {renderTabButton('Unread', 'unread')}
        {renderTabButton('Archived', 'archived')}
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessagePreview conversation={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    paddingBottom: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: '#E9F0F9',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6E6E73',
  },
  activeTabButtonText: {
    color: '#0066CC',
  },
  listContainer: {
    paddingBottom: 24,
  },
});