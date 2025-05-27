import { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter } from 'lucide-react-native';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import CategoryPills from '@/components/CategoryPills';

export default function LibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Books',
    'Articles',
    'Papers',
    'Tutorials',
    'Documentation',
  ];

  const books = [
    {
      id: '1',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      cover: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      rating: 4.8,
      reviews: 1250,
      category: 'Books',
      progress: 65,
    },
    {
      id: '2',
      title: 'Design Patterns',
      author: 'Erich Gamma',
      cover: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      rating: 4.7,
      reviews: 980,
      category: 'Books',
      progress: 30,
    },
    {
      id: '3',
      title: 'The Future of AI',
      author: 'Various Authors',
      cover: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
      rating: 4.5,
      reviews: 450,
      category: 'Articles',
      progress: 100,
    },
  ];

  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter(book => book.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Digital Library</Text>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search books, articles, and more..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>
      </View>

      <CategoryPills
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F3F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
});