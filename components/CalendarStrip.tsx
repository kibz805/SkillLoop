import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { format, addDays, isSameDay } from 'date-fns';

interface CalendarStripProps {
  selectedDate: Date;
  onDateSelected: (date: Date) => void;
}

export default function CalendarStrip({ selectedDate, onDateSelected }: CalendarStripProps) {
  const [dates, setDates] = useState<Date[]>([]);
  
  useEffect(() => {
    // Generate dates for the next 14 days
    const nextTwoWeeks = Array.from({ length: 14 }, (_, i) => {
      return addDays(new Date(), i);
    });
    setDates(nextTwoWeeks);
  }, []);

  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };

  const isSelected = (date: Date) => {
    return isSameDay(date, selectedDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.monthText}>{format(selectedDate, 'MMMM yyyy')}</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.datesContainer}
      >
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateItem,
              isSelected(date) && styles.selectedDateItem,
              isToday(date) && styles.todayItem,
            ]}
            onPress={() => onDateSelected(date)}
          >
            <Text 
              style={[
                styles.dayName, 
                isSelected(date) && styles.selectedText,
                isToday(date) && !isSelected(date) && styles.todayText,
              ]}
            >
              {format(date, 'EEE')}
            </Text>
            <Text 
              style={[
                styles.dayNumber, 
                isSelected(date) && styles.selectedText,
                isToday(date) && !isSelected(date) && styles.todayText,
              ]}
            >
              {format(date, 'd')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  datesContainer: {
    paddingHorizontal: 12,
  },
  dateItem: {
    width: 56,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  selectedDateItem: {
    backgroundColor: '#0066CC',
  },
  todayItem: {
    borderWidth: 1,
    borderColor: '#0066CC',
  },
  dayName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  todayText: {
    color: '#0066CC',
  },
});