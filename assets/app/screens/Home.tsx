import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { API_URL } from '../context/AuthContext';

const Home = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const { onLogout } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${API_URL}/users`);
      console.log('Respuesta API usuarios:', result.data);

      const fetchedUsers = result.data.users || result.data;

      setUsers(fetchedUsers);
    } catch (e: any) {
      alert(e.message || 'Error al cargar los usuarios');
    }
    setLoading(false);
  };

  const openModal = (user: any) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  // Helper para inicial avatar
  const getInitial = (email: string) => {
    return email ? email.charAt(0).toUpperCase() : '?';
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        {loading && (
          <ActivityIndicator size="large" color="#ff1e1e" style={{ marginTop: 20 }} />
        )}

        {!loading && users.length === 0 && (
          <Text style={styles.endText}>No hay usuarios para mostrar</Text>
        )}

        {users.map((user) => (
          <TouchableOpacity
            key={user._id}
            style={styles.card}
            onPress={() => openModal(user)}
            activeOpacity={0.8}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitial(user.email)}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>{user.email || 'Sin correo'}</Text>
              <Text style={styles.cardSubtext}>ID: {user._id}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            {selectedUser && (
              <>
                <Text style={styles.modalTitle}>Detalles del Usuario</Text>
                <Text style={styles.modalItem}>ID: {selectedUser._id}</Text>
                <Text style={styles.modalItem}>Email: {selectedUser.email}</Text>
                <Text style={styles.modalItem}>
                  Fecha: {new Date(selectedUser.createdAt || '').toLocaleDateString()}
                </Text>

                <Pressable style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000', // negro puro
    paddingTop: 50,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#222222', // gris oscuro para que resalte sobre negro
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#ff1e1e', // borde rojo para resaltar
  },
  avatar: {
    backgroundColor: '#ff1e1e',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1,
  },
  cardText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  cardSubtext: {
    color: '#bbb',
    fontSize: 13,
    marginTop: 3,
  },
  logoutButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff1e1e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 15,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  endText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalView: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    maxWidth: 350,
    borderColor: '#ff1e1e',
    borderWidth: 1,
  },
  modalTitle: {
    color: '#ff1e1e',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalItem: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 4,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff1e1e',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
