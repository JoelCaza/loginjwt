# Autenticación Móvil con JWT usando React Native y Expo

## Descripción

Este proyecto implementa un sistema de autenticación móvil seguro utilizando React Native y Expo en el cliente, con un backend en Node.js que entrega JSON Web Tokens (JWT). El token se almacena de forma segura en el dispositivo usando `expo-secure-store`.

El sistema permite manejar sesiones seguras y control de acceso basado en roles, ideal para aplicaciones móviles que requieren autenticación robusta.

## Características

- Login y registro de usuarios con validación.
- Consumo de API REST para autenticación.
- Uso de JWT para manejo de sesiones.
- Almacenamiento seguro de tokens con `expo-secure-store`.
- Control de acceso en navegación basado en estado de autenticación.
- Arquitectura escalable y fácil de mantener.

## Tecnologías usadas

- React Native (Expo)
- Node.js (backend)
- Axios (para consumo de API)
- expo-secure-store (almacenamiento seguro)
- React Navigation (@react-navigation/native)

## Uso

1. Clonar el repositorio
2. Instalar dependencias con `npm install` o `yarn install`
3. Ejecutar la app con `expo start`
4. Registrar un usuario o iniciar sesión con credenciales válidas
5. El token JWT se almacena de forma segura y mantiene la sesión activa
6. Cerrar sesión elimina el token y redirige a la pantalla de login

## Referencias

- [JWT.io - JSON Web Tokens](https://jwt.io/introduction/)
- [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Axios](https://axios-http.com/docs/intro)

## Autor

Joel Caza - Quinto Nivel Desarrollo de Software

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
