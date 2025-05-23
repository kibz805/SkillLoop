import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';

interface Skill {
  id: string;
  title: string;
  category: string;
  tutor: string;
  distance: string;
  rating: number;
  imageUrl: string;
  tutorImageUrl: string;
}

interface ExploreCardProps {
  skill: Skill;
}

export default function ExploreCard({ skill }: ExploreCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: skill.imageUrl }} style={styles.image} />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.title}>{skill.title}</Text>
            <Text style={styles.category}>{skill.category}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{skill.rating}</Text>
          </View>
        </View>
        
        <View style={styles.tutorContainer}>
          <Image source={{ uri: skill.tutorImageUrl }} style={styles.tutorImage} />
          <Text style={styles.tutorName}>{skill.tutor}</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#6E6E73" />
          <Text style={styles.locationText}>{skill.distance}</Text>
        </View>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  image: {
    width: 120,
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#6E6E73',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 4,
  },
  tutorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#6E6E73',
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});