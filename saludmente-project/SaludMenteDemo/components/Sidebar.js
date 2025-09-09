import React from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  TouchableOpacity, 
  Dimensions,
  Pressable,
  Platform 
} from 'react-native';
import { Text, Divider, List } from 'react-native-paper';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;
const SIDEBAR_WIDTH = isTablet ? Math.min(300, width * 0.4) : Math.min(280, width * 0.85);

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
    },
    {
      title: 'Notificaciones',
      icon: 'bell',
      screen: 'Notifications',
      color: colors.warning
    },
    {
      title: 'Mi Perfil',
      icon: 'account-circle',
      screen: 'Profile',
      color: colors.info
    }
  ];

  const handleMenuItemPress = (screen) => {
    onClose();
    navigation.navigate(screen);
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <Pressable onPress={onClose} style={styles.backdrop} />
      
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
    paddingHorizontal: isTablet ? 30 : 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    paddingBottom: isTablet ? 25 : 20,
  },
  appTitle: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: 'bold',
    color: colors.text.white,
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: isTablet ? 16 : 14,
    color: colors.text.white,
    opacity: 0.8,
  },
  divider: {
    backgroundColor: colors.cardBorder,
  },
  menuContainer: {
    flex: 1,
    paddingTop: isTablet ? 20 : 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 20 : 15,
    paddingVertical: isTablet ? 15 : 12,
    marginHorizontal: isTablet ? 10 : 8,
    borderRadius: 12,
    marginBottom: 3,
    minHeight: isTablet ? 60 : 50,
  },
  iconContainer: {
    width: isTablet ? 40 : 35,
    height: isTablet ? 40 : 35,
    borderRadius: isTablet ? 20 : 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: isTablet ? 15 : 12,
  },
  menuIcon: {
    margin: 0,
  },
  menuText: {
    fontSize: isTablet ? 16 : 14,
    color: colors.text.primary,
    fontWeight: '500',
    flex: 1,
    flexWrap: 'wrap',
  },
  footer: {
    paddingHorizontal: isTablet ? 20 : 15,
    paddingVertical: isTablet ? 20 : 15,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  footerText: {
    fontSize: isTablet ? 14 : 12,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: isTablet ? 20 : 18,
  },
});