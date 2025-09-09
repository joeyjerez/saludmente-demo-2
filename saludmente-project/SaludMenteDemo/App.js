import React, { useState, useRef } from 'react';
import { View, Animated, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { List } from 'react-native-paper';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const isSmallScreen = width < 375;

// Import screens
import HomePage from './screens/HomePage';
import HomeScreen from './screens/HomeScreen';
import DiarioScreen from './screens/DiarioScreen';
import CapsulasScreen from './screens/CapsulasScreen';
import RutinasScreen from './screens/RutinasScreen';
import RelajacionScreen from './screens/RelajacionScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';

// Import components
import Sidebar from './components/Sidebar';

// Import theme
import { colors } from './theme/colors';

const Stack = createNativeStackNavigator();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.education,
    tertiary: colors.diary,
    surface: colors.surface,
    background: colors.background,
  },
};

let globalNavigation = null;

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSidebarVisible(false));
  };

  const screenOptions = ({ navigation }) => {
    globalNavigation = navigation;
    return {
      headerStyle: {
        backgroundColor: colors.primary,
        height: Platform.OS === 'ios' ? (isTablet ? 100 : 90) : (isTablet ? 70 : 60),
      },
      headerTintColor: colors.text.white,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: isTablet ? 20 : (isSmallScreen ? 16 : 18),
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={toggleSidebar}
          style={{ 
            marginLeft: isTablet ? 20 : (isSmallScreen ? 10 : 15), 
            padding: isTablet ? 8 : 5,
            minWidth: isTablet ? 44 : 40,
            minHeight: isTablet ? 44 : 40,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <List.Icon 
            icon="menu" 
            color={colors.text.white}
            size={isTablet ? 28 : (isSmallScreen ? 20 : 24)}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ 
          flexDirection: 'row', 
          marginRight: isTablet ? 20 : (isSmallScreen ? 10 : 15),
          alignItems: 'center'
        }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
            style={{ 
              padding: isTablet ? 8 : 5, 
              marginRight: isTablet ? 15 : 10,
              minWidth: isTablet ? 44 : 40,
              minHeight: isTablet ? 44 : 40,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <List.Icon 
              icon="bell" 
              color={colors.text.white}
              size={isTablet ? 26 : (isSmallScreen ? 18 : 22)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{ 
              padding: isTablet ? 8 : 5,
              minWidth: isTablet ? 44 : 40,
              minHeight: isTablet ? 44 : 40,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <List.Icon 
              icon="account-circle" 
              color={colors.text.white}
              size={isTablet ? 26 : (isSmallScreen ? 18 : 22)}
            />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="HomePage"
              screenOptions={screenOptions}
            >
              <Stack.Screen 
                name="HomePage" 
                component={HomePage} 
                options={{ title: 'SaludMente' }}
              />
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ title: 'Explorar Módulos' }}
              />
              <Stack.Screen 
                name="Diario" 
                component={DiarioScreen} 
                options={{ title: 'Mi Diario' }}
              />
              <Stack.Screen 
                name="Capsulas" 
                component={CapsulasScreen} 
                options={{ title: 'Cápsulas Educativas' }}
              />
              <Stack.Screen 
                name="Rutinas" 
                component={RutinasScreen} 
                options={{ title: 'Rutinas' }}
              />
              <Stack.Screen 
                name="Relajacion" 
                component={RelajacionScreen} 
                options={{ title: 'Relajación' }}
              />
              <Stack.Screen 
                name="Chatbot" 
                component={ChatbotScreen} 
                options={{ title: 'Asistente Virtual' }}
              />
              <Stack.Screen 
                name="Notifications" 
                component={NotificationsScreen} 
                options={{ title: 'Notificaciones' }}
              />
              <Stack.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{ title: 'Mi Perfil' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          
          <Sidebar 
            isVisible={sidebarVisible}
            onClose={closeSidebar}
            navigation={globalNavigation}
            slideAnim={slideAnim}
          />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}