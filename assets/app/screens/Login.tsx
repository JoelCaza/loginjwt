import React, { useState } from "react";
import { 
  View, Image, StyleSheet, TextInput, Text, TouchableOpacity, 
  StatusBar, Modal, Pressable, Dimensions 
} from "react-native";
import { useAuth } from "../context/AuthContext";

const { width } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [modalError, setModalError] = useState(false);

  const { onLogin, onRegister } = useAuth();

  const showModal = (msg: string, isError = false) => {
    setModalMsg(msg);
    setModalError(isError);
    setModalVisible(true);
  };

  const login = async () => {
    if (!email || !password) {
      showModal("Por favor completa todos los campos.", true);
      return;
    }

    const result = await onLogin(email, password);
    if (result?.error) {
      showModal(result.msg, true);
    } else {
      showModal("Inicio de sesión exitoso");
    }
  };

  const register = async () => {
    if (!email || !password) {
      showModal("Por favor completa todos los campos.", true);
      return;
    }

    const result = await onRegister(email, password);
    if (result?.error) {
      showModal(result.msg, true);
    } else {
      login();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={{ uri: 'https://itq.edu.ec/wp-content/uploads/2023/02/Recurso-26.png' }}
        style={styles.image}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={register}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContainer, modalError ? styles.modalError : styles.modalSuccess]}>
            <Text style={styles.modalText}>{modalMsg}</Text>

            <Pressable
              style={[styles.modalButton, modalError ? styles.modalButtonError : styles.modalButtonSuccess]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  input: {
    height: 50,
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ff1e1e',
  },
  loginButton: {
    backgroundColor: '#ff1e1e',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: '#5c67f2',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.8,
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  modalSuccess: {
    backgroundColor: '#222',
    borderLeftWidth: 5,
    borderLeftColor: '#5c67f2',
  },
  modalError: {
    backgroundColor: '#222',
    borderLeftWidth: 5,
    borderLeftColor: '#ff1e1e',
  },
  modalText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    minWidth: 100,
  },
  modalButtonSuccess: {
    backgroundColor: '#5c67f2',
  },
  modalButtonError: {
    backgroundColor: '#ff1e1e',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
