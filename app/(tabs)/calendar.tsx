import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import CalendarStrip from '@/components/CalendarStrip';
import SessionCard from '@/components/SessionCard';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock sessions data
  const sessions = [
    {
      id: '1',
      title: 'Piano Lessons',
      tutor: 'Sarah Johnson',
      tutorAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      date: new Date(),
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      location: 'Online (Zoom)',
      status: 'confirmed',
    },
    {
      id: '2',
      title: 'Web Development',
      tutor: 'Alex Chen',
      tutorAvatar: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg',
      date: new Date(Date.now() + 86400000), // Tomorrow
      startTime: '2:00 PM',
      endTime: '3:30 PM',
      location: 'Online (Google Meet)',
      status: 'confirmed',
    },
    {
      id: '3',
      title: 'Yoga for Beginners',
      tutor: 'Emma Wilson',
      tutorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      date: new Date(Date.now() + 172800000), // Day after tomorrow
      startTime: '9:00 AM',
      endTime: '10:00 AM',
      location: 'Central Park',
      status: 'pending',
    },
    {
      id: '4',
      title: 'Photography Basics',
      tutor: 'Michael Brown',
      tutorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      date: new Date(Date.now() + 259200000), // 3 days from now
      startTime: '3:00 PM',
      endTime: '5:00 PM',
      location: 'City Museum',
      status: 'confirmed',
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

  const filteredSessions = sessions.filter(session => {
    if (activeTab === 'upcoming') {
      return new Date(session.date) >= new Date();
    } else if (activeTab === 'past') {
      return new Date(session.date) < new Date();
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
      </View>
      
      <CalendarStrip 
        selectedDate={selectedDate}
        onDateSelected={setSelectedDate}
      />

      <View style={styles.tabContainer}>
        {renderTabButton('Upcoming', 'upcoming')}
        {renderTabButton('Past', 'past')}
      </View>

      <FlatList
        data={filteredSessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SessionCard session={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No sessions {activeTab === 'upcoming' ? 'scheduled' : 'found'}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
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
    marginTop: 16,
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F2F2F7',
  },
  activeTabButton: {
    backgroundColor: '#0066CC',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6E6E73',
  },
  activeTabButtonText: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
  },
});