import { View, Text, StyleSheet } from 'react-native';

interface SkillTagProps {
  name: string;
  level: string;
}

export default function SkillTag({ name, level }: SkillTagProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return '#48BF84';
      case 'intermediate':
        return '#F59E0B';
      case 'expert':
        return '#EF4444';
      default:
        return '#0066CC';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View 
        style={[
          styles.levelBadge, 
          { backgroundColor: getLevelColor(level) + '20' }
        ]}
      >
        <Text 
          style={[
            styles.levelText,
            { color: getLevelColor(level) }
          ]}
        >
          {level}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginRight: 8,
  },
  levelBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '500',
  },
});