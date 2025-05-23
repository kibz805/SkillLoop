import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Book, Code, Music, Palette, Activity, Globe, Coffee } from 'lucide-react-native';

const categories = [
  { id: '1', name: 'Education', icon: Book },
  { id: '2', name: 'Technology', icon: Code },
  { id: '3', name: 'Music', icon: Music },
  { id: '4', name: 'Arts', icon: Palette },
  { id: '5', name: 'Fitness', icon: Activity },
  { id: '6', name: 'Languages', icon: Globe },
  { id: '7', name: 'Lifestyle', icon: Coffee },
];

export default function CategoryList() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <TouchableOpacity key={category.id} style={styles.categoryItem}>
            <View style={styles.iconContainer}>
              <Icon size={24} color="#0066CC" />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E9F0F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
});