# Overview

SaludMente Demo is a React Native mental health mobile application built with Expo. The app provides users with comprehensive tools for mental wellness including a personal diary, educational content, relaxation exercises, daily routines, and an AI chatbot assistant. The application focuses on anxiety management, mindfulness practices, and overall mental health support through an intuitive mobile interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Mobile App Architecture
The application follows a standard React Native architecture with Expo as the development framework. The app uses a stack-based navigation system powered by React Navigation, providing smooth transitions between different feature screens.

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
The application uses React's built-in state management (useState hooks) for local component state. Each screen manages its own data independently without a global state management solution, which is appropriate for the current scope and complexity.

## Data Storage Strategy
Currently implements in-memory storage using React state. All user data (diary entries, routine completions, chat messages) persists only during the app session. This approach prioritizes user privacy but limits data persistence across app restarts.

## UI/UX Design Patterns
- **Card-based Interface**: Features are presented as interactive cards with color-coded categories
- **Consistent Color Scheme**: Green primary theme (#4CAF50) with complementary accent colors for different features
- **Safe Area Handling**: Proper screen boundary management for different device sizes
- **Accessibility-First**: Touch-friendly interface with clear visual hierarchy

# External Dependencies

## Core Framework Dependencies
- **Expo SDK (~53.0.22)**: Primary development platform providing native API access and build tools
- **React Native (0.79.6)**: Core mobile framework with latest architecture support
- **React (19.0.0)**: JavaScript library for component-based UI development

## Navigation System
- **@react-navigation/native (^7.1.17)**: Primary navigation framework
- **@react-navigation/native-stack (^7.3.26)**: Stack navigator implementation
- **react-native-screens (~4.11.1)**: Native screen management for performance optimization

## UI and Interaction Libraries
- **react-native-safe-area-context (5.4.0)**: Safe area boundary handling for modern devices
- **react-native-gesture-handler (~2.24.0)**: Enhanced touch and gesture recognition
- **react-native-reanimated (~3.17.4)**: High-performance animation library

## Development and Build Tools
- **@babel/core (^7.20.0)**: JavaScript transpilation and build processing
- **@expo/metro-runtime (~5.0.4)**: Metro bundler runtime for development and production builds

## Platform Support
- **react-native-web (^0.20.0)**: Web platform compatibility layer
- **react-dom (19.0.0)**: React DOM rendering for web deployment

The application is currently self-contained with no external API integrations, database connections, or third-party services, making it suitable for offline operation and maximum user privacy.