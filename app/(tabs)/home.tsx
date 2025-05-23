import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Search, Filter, ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkillCard from '@/components/SkillCard';
import CategoryList from '@/components/CategoryList';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for featured skills
  const featuredSkills = [
    {
      id: '1',
      title: 'Piano Lessons',
      category: 'Music',
      rating: 4.8,
      reviewCount: 124,
      tutor: 'Sarah Johnson',
      imageUrl: 'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg',
      tutorImageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    },
    {
      id: '2',
      title: 'Web Development',
      category: 'Technology',
      rating: 4.9,
      reviewCount: 89,
      tutor: 'Alex Chen',
      imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
      tutorImageUrl: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg',
    },
    {
      id: '3',
      title: 'Yoga for Beginners',
      category: 'Fitness',
      rating: 4.7,
      reviewCount: 156,
      tutor: 'Emma Wilson',
      imageUrl: 'https://images.pexels.com/photos/374101/pexels-photo-374101.jpeg',
      tutorImageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    },
  ];

  // Mock data for nearby skills
  const nearbySkills = [
    {
      id: '4',
      title: 'Photography Basics',
      category: 'Arts',
      rating: 4.6,
      reviewCount: 78,
      tutor: 'Michael Brown',
      imageUrl: 'https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg',
      tutorImageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
    {
      id: '5',
      title: 'French Conversation',
      category: 'Languages',
      rating: 4.9,
      reviewCount: 112,
      tutor: 'Sophie Martin',
      imageUrl: 'https://images.pexels.com/photos/5211479/pexels-photo-5211479.jpeg',
      tutorImageUrl: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
    },
    {
      id: '6',
      title: 'Guitar for Beginners',
      category: 'Music',
      rating: 4.5,
      reviewCount: 67,
      tutor: 'David Wilson',
      imageUrl: 'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg',
      tutorImageUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Alex</Text>
          <Text style={styles.subGreeting}>What would you like to learn today?</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#8E8E93" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for skills"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#0066CC" />
          </TouchableOpacity>
        </View>

        <CategoryList />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Skills</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color="#0066CC" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.skillsScrollContent}
        >
          {featuredSkills.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Skills</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color="#0066CC" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.skillsScrollContent}
        >
          {nearbySkills.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: '#6E6E73',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFF4',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000000',
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: '#E9F0F9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#0066CC',
    marginRight: 4,
  },
  skillsScrollContent: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingBottom: 8,
  },
});