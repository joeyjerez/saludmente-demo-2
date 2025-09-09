import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';

// Import screens
import HomeScreen from './screens/HomeScreen';
import DiarioScreen from './screens/DiarioScreen';
import CapsulasScreen from './screens/CapsulasScreen';
import RutinasScreen from './screens/RutinasScreen';
import RelajacionScreen from './screens/RelajacionScreen';
import ChatbotScreen from './screens/ChatbotScreen';

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

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.text.white,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'SaludMente Demo' }}
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
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}