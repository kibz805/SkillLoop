import { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter } from 'lucide-react-native';
import SearchBar from '@/components/SearchBar';
import VideoCard from '@/components/VideoCard';
import CategoryPills from '@/components/CategoryPills';

export default function VideosScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Programming',
    'Design',
    'Business',
    'Marketing',
    'Personal Development',
  ];

  const videos = [
    {
      id: '1',
      title: 'Introduction to React Native',
      instructor: 'Sarah Johnson',
      duration: '15:30',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      views: '12K',
      likes: 856,
      category: 'Programming',
    },
    {
      id: '2',
      title: 'UI/UX Design Principles',
      instructor: 'Michael Chen',
      duration: '22:45',
      thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      views: '8.5K',
      likes: 642,
      category: 'Design',
    },
    {
      id: '3',
      title: 'Digital Marketing Strategy',
      instructor: 'Emma Wilson',
      duration: '18:20',
      thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
      views: '15K',
      likes: 923,
      category: 'Marketing',
    },
  ];

  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Video Library</Text>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search videos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>
      </View>

      <CategoryPills
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F3F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
});