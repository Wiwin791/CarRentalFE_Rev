import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getProfile, selectUser, logout, resetState } from '../redux/reducers/user';
import { resetCar } from '../redux/reducers/cars';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Akun = () => {

  const navigation = useNavigation();
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logout());
  
  try {
    const currentUser = auth().currentUser; // Check if there's a signed-in user

    if (currentUser) {
      await GoogleSignin.revokeAccess(); // Revoke Google access
      await auth().signOut(); // Log out from Firebase Auth
      dispatch(logout());
      dispatch(resetCar());
      console.log('User logged out successfully');
    } else {
      console.log('No user currently signed in');
    }
  } catch (e) {
    console.error('Error during logout: ', e);
  }
};


  const handleRegister = () => {
    dispatch(resetState())
    navigation.navigate('SignUp')
  }

  const handleEditProfile = () => {
    navigation.navigate('EditProfile')
  }

  const getUser = async () => {
    if (user.token) {
      await dispatch(getProfile(user.token))
    }

  }

  useFocusEffect(
    React.useCallback(() => {
      if (!user.token) {
        handleLogout()
      }
      getUser()
    }, [user.token]))


  const renderInfoItem = (icon, label, value,) => (
    <View style={styles.infoItem}>
      <Icon name={icon} size={24} color="#6b7280" style={styles.infoIcon} />
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user.login ? (
        <ScrollView style={styles.scrollView}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View>
              <Image
                style={styles.avatarPlaceholder}
                source={{ uri: user.data.avatar }}
              />
            </View>
            <Text style={styles.profileName}>{user.data?.fullname}</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Account Information */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}> About Your Account</Text>
            {renderInfoItem("mail", "Email", user.data?.email)}
            {renderInfoItem("phone", "Phone Number", user.data?.phone_number)}
            {renderInfoItem("home", "Address", user.data?.address)}
          </View>

          {/* Additional Options */}
          <View style={styles.optionsSection}>
            <TouchableOpacity style={styles.optionItem}>
              <Icon name="lock" size={24} color="#6b7280" style={styles.optionIcon} />
              <Text style={styles.optionText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem}>
              <Icon name="bell" size={24} color="#6b7280" style={styles.optionIcon} />
              <Text style={styles.optionText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem}>
              <Icon name="help-circle" size={24} color="#6b7280" style={styles.optionIcon} />
              <Text style={styles.optionText}>Help</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>

      ) : (
        <View style={styles.detailsContainer}>
          <View style={styles.cardContainer}>
            <Image
              style={styles.imageSet}
              source={require('../assets/images/akun_bg.png')}
            />
            <Text style={styles.messageRegister}>
              Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di
              TMMIN Car Rental lebih mudah
            </Text>
            <Button
              onPress={handleRegister}
              style={styles.buttonContainer}
              color="#3D7B3F"
              title="Register"
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    flexGrow: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  detailsContainer: {
    width: '100%',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
  },
  cardContainer: {
    marginVertical: '40%',
    alignItems: 'center',
  },
  messageRegister: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginTop: '10%',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    width: '30%',
    alignContent: 'center',
  },

  //Style Logined
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#4b5563',
    fontWeight: '500',
  },
  infoSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 16,
    color: '#111827',
  },
  optionsSection: {
    padding: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  optionIcon: {
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Akun;