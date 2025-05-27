import { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Search, Bell, TrendingUp, Clock, BookOpen } from 'lucide-react-native';
import SearchBar from '@/components/SearchBar';
import FeaturedCourse from '@/components/FeaturedCourse';
import ActivityCard from '@/components/ActivityCard';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredCourses = [
    {
      id: '1',
      title: 'Advanced Web Development',
      instructor: 'Sarah Johnson',
      duration: '8 hours',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      price: 49.99,
    },
    {
      id: '2',
      title: 'Digital Marketing Mastery',
      instructor: 'Michael Chen',
      duration: '10 hours',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      price: 59.99,
    },
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'course_progress',
      title: 'Completed Chapter 3: React Hooks',
      course: 'Advanced Web Development',
      timestamp: '2 hours ago',
      icon: Clock,
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Earned "Fast Learner" Badge',
      description: 'Completed 5 courses in a month',
      timestamp: '1 day ago',
      icon: TrendingUp,
    },
    {
      id: '3',
      type: 'reading',
      title: 'Started reading "Clean Code"',
      author: 'Robert C. Martin',
      timestamp: '2 days ago',
      icon: BookOpen,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.greeting}>Welcome back, Alex!</Text>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#1A1A1A" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
          <SearchBar
            placeholder="Search courses, books, and more..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Courses</Text>
            <Link href="/courses" style={styles.seeAllLink}>
              <Text style={styles.seeAllText}>See All</Text>
            </Link>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coursesContainer}
          >
            {featuredCourses.map(course => (
              <FeaturedCourse key={course.id} course={course} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            {recentActivity.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </View>
        </View>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F3F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  seeAllLink: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  seeAllText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '500',
  },
  coursesContainer: {
    paddingRight: 16,
  },
  activityContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
});