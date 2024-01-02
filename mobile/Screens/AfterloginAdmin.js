import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, TextInput } from 'react-native';
import axios from 'axios';

const AfterloginAdmin = ({ navigation, route }) => {
  const [userId, setUserId] = useState(route.params.userId);
  const [claims, setClaims] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const apiUrl = 'http://192.168.1.102:8080/api/getAll';

    axios.get(apiUrl)
      .then((response) => {
        setClaims(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  };

  const updateClaim = (claimId) => {
    const apiUrl = `http://192.168.1.102:8080/api/action/${claimId}/Accepted`;

    axios.put(apiUrl)
      .then(() => {
        console.log(`Claim with ID ${claimId} accepted successfully.`);
        loadData(); // Reload data after update
      })
      .catch((error) => {
        console.error(`Error accepting claim with ID ${claimId}: `, error);
      });
  };

  const deleteClaim = (claimId) => {
    const apiUrl = `http://192.168.1.102:8080/api/action/${claimId}/Decline`;

    axios.put(apiUrl)
      .then(() => {
        console.log(`Claim with ID ${claimId} declined successfully.`);
        loadData(); // Reload data after update
      })
      .catch((error) => {
        console.error(`Error declining claim with ID ${claimId}: `, error);
      });
  };

  const getBadgeStyles = (status) => {
    switch (status) {
      case 'Accepted':
        return { backgroundColor: '#14A44D' };
      case 'Pending':
        return { backgroundColor: '#FFC107' };
      case 'Decline':
        return { backgroundColor: '#DC4C64' };
      default:
        return {};
    }
  };

  const logout = () => {
    setUserId(0);
    navigation.navigate('LoginScreen');
  };

  const handleSearchInputChange = (text) => {
    setSearchInput(text);
    // Filter claims based on search input
    const filteredClaims = claims.filter((item) =>
      item.id.toString().includes(text) ||
      item.user.firstName.toLowerCase().includes(text.toLowerCase()) ||
      item.user.lastName.toLowerCase().includes(text.toLowerCase()) ||
      item.user.email.toLowerCase().includes(text.toLowerCase())
    );
    setClaims(filteredClaims);
  };

  const clearSearch = () => {
    setSearchInput('');
    loadData(); // Reset to default data
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchInput}
          onChangeText={handleSearchInputChange}
        />
        {searchInput.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={claims}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.claimContainer}>
            <Text>ID: {item.id}</Text>
            <Text>Identifier: {item.user.firstName} {item.user.lastName}</Text>
            <Text>Email: {item.user.email}</Text>
            <Text>Telephone: {item.user.tel}</Text>
            <Text>Date: {item.formattedDate}</Text>
            <Text>Subject: {item.subject}</Text>
            <Text>Description: {item.description}</Text>
            <View style={[styles.statusBadge, getBadgeStyles(item.status)]}>
              <Text style={styles.badgeText}>{item.status}</Text>
            </View>
            {item.status === 'Pending' && (
              <View style={styles.actionButtons}>
                <Button title="✔️ Accept" onPress={() => updateClaim(item.id)} />
                <Button title="❌ Decline" onPress={() => deleteClaim(item.id)} />
              </View>
            )}
          </View>
        )}
      />
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
  searchInput: {
    flex: 0.4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  clearButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  clearButtonText: {
    color: 'black',
    textAlign: 'center',
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

export default AfterloginAdmin;
