import React from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  TouchableOpacity, 
  Dimensions,
  TouchableWithoutFeedback 
} from 'react-native';
import { Text, Divider, List } from 'react-native-paper';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

export default function Sidebar({ 
  isVisible, 
  onClose, 
  navigation, 
  slideAnim 
}) {
  const menuItems = [
    {
      title: 'Inicio',
      icon: 'home',
      screen: 'HomePage',
      color: colors.primary
    },
    {
      title: 'Diario Emocional',
      icon: 'book-edit',
      screen: 'Diario',
      color: colors.diary
    },
    {
      title: 'Cápsulas Educativas',
      icon: 'school',
      screen: 'Capsulas',
      color: colors.education
    },
    {
      title: 'Rutinas de Autocuidado',
      icon: 'heart-pulse',
      screen: 'Rutinas',
      color: colors.routines
    },
    {
      title: 'Ejercicios de Relajación',
      icon: 'meditation',
      screen: 'Relajacion',
      color: colors.relaxation
    },
    {
      title: 'Chatbot Empático',
      icon: 'robot',
      screen: 'Chatbot',
      color: colors.chatbot
    }
  ];

  const handleMenuItemPress = (screen) => {
    onClose();
    navigation.navigate(screen);
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      
      <Animated.View 
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>SaludMente</Text>
          <Text style={styles.appSubtitle}>Tu bienestar mental</Text>
        </View>

        <Divider style={styles.divider} />

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item.screen)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <List.Icon 
                  icon={item.icon} 
                  color={item.color}
                  style={styles.menuIcon}
                />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Cuida tu mente, cuida tu vida
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: colors.surface,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 30,
    paddingTop: 60,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.white,
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 16,
    color: colors.text.white,
    opacity: 0.8,
  },
  divider: {
    backgroundColor: colors.cardBorder,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 12,
    marginBottom: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIcon: {
    margin: 0,
  },
  menuText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  footerText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});