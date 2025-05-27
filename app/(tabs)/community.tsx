import { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, UserPlus } from 'lucide-react-native';
import SearchBar from '@/components/SearchBar';
import UserCard from '@/components/UserCard';
import PostCard from '@/components/PostCard';

export default function CommunityScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('feed');

  const users = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      bio: 'Web Developer & UI/UX Designer',
      followers: 1250,
      following: 890,
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg',
      bio: 'Full Stack Developer',
      followers: 980,
      following: 750,
    },
  ];

  const posts = [
    {
      id: '1',
      user: users[0],
      content: 'Just completed the Advanced React course! Learned so much about hooks and context API. 🚀',
      likes: 45,
      comments: 12,
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      user: users[1],
      content: 'Working on a new project using Next.js and Tailwind CSS. Stay tuned for updates! 💻',
      likes: 32,
      comments: 8,
      timestamp: '4 hours ago',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <SearchBar
          placeholder="Search people and posts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
          onPress={() => setActiveTab('feed')}
        >
          <Users size={20} color={activeTab === 'feed' ? '#6C63FF' : '#8E8E93'} />
          <Text style={[styles.tabText, activeTab === 'feed' && styles.activeTabText]}>
            Feed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'discover' && styles.activeTab]}
          onPress={() => setActiveTab('discover')}
        >
          <UserPlus size={20} color={activeTab === 'discover' ? '#6C63FF' : '#8E8E93'} />
          <Text style={[styles.tabText, activeTab === 'discover' && styles.activeTabText]}>
            Discover
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'feed' ? (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          users.map(user => (
            <UserCard key={user.id} user={user} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#F1F3F5',
    borderRadius: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#6C63FF',
  },
  content: {
    padding: 16,
  },
});