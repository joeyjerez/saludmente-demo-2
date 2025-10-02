# Overview

SaludMente Demo is a React Native mental health mobile application built with Expo. The app provides users with comprehensive tools for mental wellness including a personal diary, educational content, self-care routines, relaxation exercises, and an empathetic chatbot. The application focuses on anxiety management and overall mental health support through an accessible, user-friendly interface designed for cross-platform deployment.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Mobile App Architecture
The application follows a standard React Native architecture with Expo as the development framework. The app uses a stack-based navigation system powered by React Navigation, providing smooth transitions between different features.

**Key Architectural Decisions:**
- **React Native with Expo**: Chosen for cross-platform development (iOS, Android, Web) with simplified build processes and native feature access
- **Stack Navigation**: Implements a hierarchical navigation pattern suitable for the app's feature-based structure
- **Component-Based Architecture**: Each major feature (diary, relaxation, routines, etc.) is isolated in separate screen components for maintainability

## Frontend Structure
The app is organized around six main functional areas, each implemented as standalone screen components:

1. **Home Screen**: Central navigation hub with feature overview cards
2. **Diary Screen**: Personal journaling with local entry storage
3. **Educational Capsules**: Static content delivery for mental health education
4. **Routines Screen**: Habit tracking with completion toggles
5. **Relaxation Screen**: Guided exercises with step-by-step instructions
6. **Chatbot Screen**: Interactive Q&A system with predefined responses

## State Management
The application uses React's built-in state management (useState hooks) for local component state. Each screen manages its own data independently without a global state management solution. This approach prioritizes simplicity and reduces complexity for the current feature set.

## Data Storage Strategy
Currently implements in-memory storage using React state. All user data (diary entries, routine completions, chat messages) persists only during the app session. This approach prioritizes user privacy but limits data persistence across app sessions.

## UI/UX Design Patterns
- **Card-based Interface**: Features are presented as interactive cards with color-coded categories
- **Consistent Color Scheme**: Green primary theme with complementary accent colors for different features
- **Safe Area Handling**: Proper screen boundary management for different device sizes
- **Material Design**: Uses React Native Paper for consistent Material Design components

## Theme System
Centralized color management through a dedicated theme system that defines:
- Primary brand colors and variations
- Feature-specific color coding (diary, education, routines, etc.)
- Mood-based color mapping for emotional tracking
- Text hierarchy and accessibility considerations

# External Dependencies

## Core Framework Dependencies
- **Expo SDK (~53.0.22)**: Primary development platform providing native API access and build tools
- **React Native (0.79.6)**: Core mobile framework with latest architecture support
- **React (19.0.0)**: JavaScript library for component-based UI development

## Navigation System
- **@react-navigation/native (^7.1.17)**: Primary navigation framework
- **@react-navigation/native-stack (^7.3.26)**: Stack navigator implementation
- **react-native-screens (~4.11.1)**: Native screen management optimization
- **react-native-safe-area-context (5.4.0)**: Safe area boundary handling

## UI Component Library
- **react-native-paper (^5.14.5)**: Material Design component library providing cards, buttons, inputs, and theming
- **react-native-vector-icons (^10.3.0)**: Icon library for consistent iconography

## Animation and Interaction
- **react-native-reanimated (~3.17.4)**: High-performance animations for smooth user interactions
- **react-native-gesture-handler (~2.24.0)**: Native gesture recognition for enhanced touch interactions

## Platform Support
- **react-native-web (^0.20.0)**: Web platform support for cross-platform deployment
- **@expo/metro-runtime (~5.0.4)**: Metro bundler runtime for Expo development

## Development Tools
- **@babel/core (^7.20.0)**: JavaScript compiler for modern React Native features
- **expo-status-bar (~2.2.3)**: Status bar configuration for mobile platforms
- **TypeScript (^5.7.3)**: Static type checking for improved code quality and developer experience
- **@types/react**: TypeScript definitions for React
- **@types/react-native**: TypeScript definitions for React Native

# TypeScript Integration

## Migration Status
**Date**: October 2, 2025  
**Status**: Completed

All screen components have been migrated from JavaScript (.js) to TypeScript (.tsx), providing:
- Type-safe navigation props using React Navigation types
- Explicit type definitions for all component states
- Interface definitions for data structures (diary entries, notifications, routines, etc.)
- Enhanced IDE support with autocompletion and type checking

## TypeScript Configuration
The project includes a `tsconfig.json` file configured for Expo with:
- Strict type checking enabled
- React Native JSX support
- ES module interoperability
- Path resolution for better imports

## Typed Components
All screen components now include:
- **Navigation Props**: Type-safe navigation using `NativeStackNavigationProp<RootStackParamList>`
- **State Types**: Explicit types for all `useState` hooks
- **Data Interfaces**: Structured types for domain models (entries, routines, exercises, messages, etc.)
- **Function Signatures**: Type-safe parameters and return values

This migration improves code maintainability, reduces runtime errors, and provides better developer experience through enhanced IDE support.