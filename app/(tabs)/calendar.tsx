import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    backgroundColor: '#95D5B2',
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  activeTabButtonText: {
    color: '#000000',
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
    color: '#000000',
    opacity: 0.7,
  },
});