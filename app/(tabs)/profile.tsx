import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Edit2, BookOpen, Video, Users, Star } from 'lucide-react-native';
import StatCard from '@/components/StatCard';

export default function ProfileScreen() {
  const user = {
    name: 'Alex Martinez',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    bio: 'Software developer passionate about learning and teaching. Currently exploring AI and machine learning.',
    location: 'San Francisco, CA',
    stats: {
      courses: 12,
      videos: 45,
      followers: 1250,
      following: 890,
    },
    achievements: [
      {
        id: '1',
        title: 'Fast Learner',
        description: 'Completed 5 courses in a month',
        icon: BookOpen,
      },
      {
        id: '2',
        title: 'Video Master',
        description: 'Watched 100+ educational videos',
        icon: Video,
      },
      {
        id: '3',
        title: 'Community Leader',
        description: 'Helped 50+ students',
        icon: Users,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editButton}>
              <Edit2 size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
          <Text style={styles.location}>{user.location}</Text>
        </View>

        <View style={styles.statsContainer}>
          <StatCard
            icon={BookOpen}
            value={user.stats.courses}
            label="Courses"
          />
          <StatCard
            icon={Video}
            value={user.stats.videos}
            label="Videos"
          />
          <StatCard
            icon={Users}
            value={user.stats.followers}
            label="Followers"
          />
          <StatCard
            icon={Users}
            value={user.stats.following}
            label="Following"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {user.achievements.map(achievement => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={styles.achievementIcon}>
                <achievement.icon size={24} color="#6C63FF" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
              </View>
              <Star size={20} color="#FFD700" fill="#FFD700" />
            </View>
          ))}
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
  content: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  settingsButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F3F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  location: {
    fontSize: 14,
    color: '#8E8E93',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E9F0F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#4A4A4A',
  },
});