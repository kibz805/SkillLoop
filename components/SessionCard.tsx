import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { Video, MapPin, Clock } from 'lucide-react-native';

interface Session {
  id: string;
  title: string;
  tutor: string;
  tutorAvatar: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  status: 'confirmed' | 'pending' | 'canceled';
}

interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#48BF84';
      case 'pending':
        return '#F59E0B';
      case 'canceled':
        return '#EF4444';
      default:
        return '#8E8E93';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'canceled':
        return 'Canceled';
      default:
        return status;
    }
  };

  const isOnline = session.location.toLowerCase().includes('online');

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{format(session.date, 'EEEE, MMMM d')}</Text>
        <View 
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(session.status) + '20' }
          ]}
        >
          <Text 
            style={[
              styles.statusText,
              { color: getStatusColor(session.status) }
            ]}
          >
            {getStatusText(session.status)}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{session.startTime}</Text>
          <Text style={styles.timeSeparator}>-</Text>
          <Text style={styles.time}>{session.endTime}</Text>
        </View>

        <View style={styles.sessionDetails}>
          <Text style={styles.title}>{session.title}</Text>
          
          <View style={styles.tutorContainer}>
            <Image source={{ uri: session.tutorAvatar }} style={styles.tutorAvatar} />
            <Text style={styles.tutorName}>with {session.tutor}</Text>
          </View>
          
          <View style={styles.locationContainer}>
            {isOnline ? (
              <Video size={16} color="#6E6E73" />
            ) : (
              <MapPin size={16} color="#6E6E73" />
            )}
            <Text style={styles.locationText}>{session.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton}>
          <Clock size={16} color="#0066CC" />
          <Text style={styles.actionButtonText}>Reschedule</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            styles.primaryButton
          ]}
        >
          <Text style={styles.primaryButtonText}>
            {session.status === 'confirmed' ? 'Join Session' : 'Confirm'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    paddingBottom: 16,
    marginBottom: 16,
  },
  timeContainer: {
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  time: {
    fontSize: 14,
    color: '#000000',
  },
  timeSeparator: {
    fontSize: 14,
    color: '#8E8E93',
    marginVertical: 2,
  },
  sessionDetails: {
    flex: 1,
    paddingLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  tutorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tutorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  tutorName: {
    fontSize: 14,
    color: '#6E6E73',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#6E6E73',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0066CC',
  },
  actionButtonText: {
    marginLeft: 8,
    color: '#0066CC',
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});