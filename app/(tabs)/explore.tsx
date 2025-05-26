import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Search, Filter, MapPin } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExploreCard from '@/components/ExploreCard';
import SearchBar from '@/components/SearchBar';

export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState('nearby');
  
  // Mock data for skills
  const skillsData = [
    {
      id: '1',
      title: 'Advanced Guitar Techniques',
      category: 'Music',
      tutor: 'James Wilson',
      distance: '0.8 miles',
      rating: 4.8,
      imageUrl: 'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg',
      tutorImageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
    {
      id: '2',
      title: 'Conversational Spanish',
      category: 'Languages',
      tutor: 'Maria Rodriguez',
      distance: '1.2 miles',
      rating: 4.9,
      imageUrl: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
      tutorImageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    },
    {
      id: '3',
      title: 'Watercolor Painting',
      category: 'Arts',
      tutor: 'Emma Thompson',
      distance: '1.5 miles',
      rating: 4.7,
      imageUrl: 'https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg',
      tutorImageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
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
        <Text style={styles.title}>Explore Skills</Text>
        <SearchBar />
      </View>
      
      <View style={styles.tabContainer}>
        {renderTabButton('Nearby', 'nearby')}
        {renderTabButton('Popular', 'popular')}
        {renderTabButton('New', 'new')}
      </View>
      
      <View style={styles.locationContainer}>
        <MapPin size={16} color="#FFFFFF" />
        <Text style={styles.locationText}>San Francisco, CA</Text>
        <TouchableOpacity>
          <Text style={styles.changeLocationText}>Change</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={skillsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExploreCard skill={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B6B',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  activeTabButtonText: {
    color: '#FF6B6B',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
    marginRight: 8,
  },
  changeLocationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});