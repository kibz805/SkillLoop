import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';

interface Skill {
  id: string;
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  tutor: string;
  imageUrl: string;
  tutorImageUrl: string;
}

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: skill.imageUrl }} style={styles.image} />
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{skill.category}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{skill.title}</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFD700" fill="#FFD700" />
          <Text style={styles.ratingText}>
            {skill.rating} ({skill.reviewCount})
          </Text>
        </View>
        <View style={styles.tutorContainer}>
          <Image source={{ uri: skill.tutorImageUrl }} style={styles.tutorImage} />
          <Text style={styles.tutorName}>{skill.tutor}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 136,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#6E6E73',
    marginLeft: 4,
  },
  tutorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tutorImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  tutorName: {
    fontSize: 14,
    color: '#000000',
  },
});