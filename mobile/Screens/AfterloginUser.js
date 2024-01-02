import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Button } from 'react-native';
import axios from 'axios';

const AfterloginUser = ({ navigation, route }) => {
  const [userId, setUserId] = useState(route.params.userId);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [claims, setClaims] = useState([]);
  const [newRequestSubject, setNewRequestSubject] = useState('');
  const [newRequestDescription, setNewRequestDescription] = useState('');
  const [updatedClaimId, setUpdatedClaimId] = useState(null);

  useEffect(() => {
    getUserClaims();
  }, [userId]);

  const toggleModal = () => {
    setNewRequestSubject('');
    setNewRequestDescription('');
    setShowModal(!showModal);
  };

  const toggleUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  const getUserClaims = () => {
    const url = `http://192.168.1.102:8080/api/get/${userId}`;

    axios.get(url)
      .then(response => {
        setClaims(response.data);
      })
      .catch(error => {
        console.error('Error fetching user claims', error);
      });
  };

  const getBadgeStyles = (status) => {
    switch (status) {
      case 'Accepted':
        return { backgroundColor: '#4CAF50' };
      case 'Pending':
        return { backgroundColor: '#FFC107' };
      case 'Decline':
        return { backgroundColor: '#F44336' };
      default:
        return {};
    }
  };

  const addClaim = () => {
    axios.post(`http://192.168.1.102:8080/api/save/${userId}`, {
      subject: newRequestSubject,
      description: newRequestDescription,
    })
      .then(response => {
        getUserClaims();
        toggleModal();
      })
      .catch(error => {
        console.error('Error adding claim', error);
      });
  };

  const updateClaim = (claimId) => {
    setShowUpdateModal(true);
    setUpdatedClaimId(claimId);
    updateClaimDetails(claimId);
  };

  const updateClaimDetails = (claimIdToUpdate) => {
    axios.get(`http://192.168.1.102:8080/api/getclaimbyid/${claimIdToUpdate}`)
      .then(response => {
        const claimDetails = response.data;

        setNewRequestSubject(claimDetails.subject);
        setNewRequestDescription(claimDetails.description);
      })
      .catch(error => {
        console.error('Error fetching claim details for update', error);
      });
  };

  const updateClaimmm = () => {
    if (!newRequestSubject || !newRequestDescription) {
      console.error('Subject and Description are required for update.');
      return;
    }

    axios.put(`http://192.168.1.102:8080/api/update/${updatedClaimId}`, {
      subject: newRequestSubject,
      description: newRequestDescription,
    })
      .then(response => {
        getUserClaims();
        toggleUpdateModal();
      })
      .catch(error => {
        console.error('Error updating claim', error);
      });
  };

  const deleteClaim = (claimId) => {
    axios.delete(`http://192.168.1.102:8080/api/delete/${claimId}`)
      .then(response => {
        getUserClaims();
      })
      .catch(error => {
        console.error('Error deleting claim', error);
      });
  };

  const logout = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>+ New</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={claims}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        renderItem={({ item }) => (
          <View style={styles.claimContainer}>
            <Text>ID: #{item.id}</Text>
            <Text>Subject: {item.subject}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Date: {item.formattedDate}</Text>
            <View style={[styles.statusBadge, getBadgeStyles(item.status)]}>
              <Text style={styles.badgeText}>{item.status}</Text>
            </View>
            {item.status === 'Pending' && (
              <View style={styles.actionButtons}>
                <Button title="Update" onPress={() => updateClaim(item.id)} />
                <Button title="Delete" onPress={() => deleteClaim(item.id)} />
              </View>
            )}
          </View>
        )}
      />

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>New Request</Text>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={newRequestSubject}
            onChangeText={text => setNewRequestSubject(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newRequestDescription}
            onChangeText={text => setNewRequestDescription(text)}
            multiline
          />
          <View style={styles.modalButtonContainer}>
            <Button title="Add" onPress={addClaim} />
            <View style={{ width: 10 }} />
            <Button title="Close" onPress={toggleModal} />
          </View>
        </View>
      </Modal>

      <Modal visible={showUpdateModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Update Claim</Text>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={newRequestSubject}
            onChangeText={text => setNewRequestSubject(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newRequestDescription}
            onChangeText={text => setNewRequestDescription(text)}
            multiline
          />
          <View style={styles.modalButtonContainer}>
            <Button title="Update" onPress={updateClaimmm} />
            <View style={{ width: 10 }} />
            <Button title="Close" onPress={toggleUpdateModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  upperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#14A44D',
    padding: 10,
    borderRadius: 5,
    flex: 0.48,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  dangerButton: {
    backgroundColor: '#FF5733', // Danger color
  },
  claimContainer: {
    marginTop: 20,
    marginBottom: 16,
  },
  statusBadge: {
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  badgeText: {
    color: 'white',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginVertical: 10,
    width: '80%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default AfterloginUser;
