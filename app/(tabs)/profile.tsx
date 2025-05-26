import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Settings, Star, Award, CreditCard as Edit2, Shield, BookOpen } from 'lucide-react-native';
import SkillTag from '@/components/SkillTag';
import ProfileButton from '@/components/ProfileButton';

export default function ProfileScreen() {
  // Mock user data
  const user = {
    name: 'Alex Martinez',
    bio: 'Software developer with a passion for teaching and learning new skills. I love photography, hiking, and playing guitar in my free time.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    rating: 4.9,
    reviewCount: 24,
    memberSince: 'March 2023',
    location: 'San Francisco, CA',
    skills: [
      { id: '1', name: 'Web Development', level: 'Expert' },
      { id: '2', name: 'Photography', level: 'Intermediate' },
      { id: '3', name: 'Guitar', level: 'Beginner' },
    ],
    learning: [
      { id: '1', name: 'Spanish', level: 'Beginner' },
      { id: '2', name: 'Yoga', level: 'Beginner' },
    ],
    badges: [
      { id: '1', name: 'Top Teacher', icon: 'award' },
      { id: '2', name: 'Verified', icon: 'shield' },
      { id: '3', name: 'Quick Responder', icon: 'message-circle' },
    ],
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileHeader}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>{user.rating} ({user.reviewCount} reviews)</Text>
            </View>
            <Text style={styles.location}>{user.location}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit2 size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.bioContainer}>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>

        <View style={styles.badgesContainer}>
          {user.badges.map(badge => (
            <View key={badge.id} style={styles.badgeItem}>
              {badge.icon === 'award' && <Award size={16} color="#FFFFFF" />}
              {badge.icon === 'shield' && <Shield size={16} color="#FFFFFF" />}
              {badge.icon === 'message-circle' && <MessageCircle size={16} color="#FFFFFF" />}
              <Text style={styles.badgeText}>{badge.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Skills I Can Teach</Text>
            <TouchableOpacity>
              <Text style={styles.sectionAction}>Add Skill</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.skillsContainer}>
            {user.skills.map(skill => (
              <SkillTag key={skill.id} name={skill.name} level={skill.level} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Skills I'm Learning</Text>
            <TouchableOpacity>
              <Text style={styles.sectionAction}>Add Skill</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.skillsContainer}>
            {user.learning.map(skill => (
              <SkillTag key={skill.id} name={skill.name} level={skill.level} />
            ))}
          </View>
        </View>

        <View style={styles.buttonSection}>
          <ProfileButton
            icon={<BookOpen size={20} color="#FFFFFF" />}
            title="My Learning Journey"
            subtitle="Track your progress"
          />
          <ProfileButton
            icon={<MessageCircle size={20} color="#FFFFFF" />}
            title="Reviews & Testimonials"
            subtitle="See what others are saying"
          />
          <ProfileButton
            icon={<Shield size={20} color="#FFFFFF" />}
            title="Verification"
            subtitle="Verify your skills & identity"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C63FF',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  settingsButton: {
    padding: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 8,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  location: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  editButton: {
    padding: 8,
  },
  bioContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  bio: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  badgesContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    flexWrap: 'wrap',
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionAction: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    opacity: 0.8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonSection: {
    marginHorizontal: 16,
    marginTop: 16,
  },
});