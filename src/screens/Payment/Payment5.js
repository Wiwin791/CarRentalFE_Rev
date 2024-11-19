import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import CountDown from 'react-native-countdown-component-maintained';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function Payment5() {
  const [timeLeft, setTimeLeft] = useState(600);  // 10 minutes in seconds (600 seconds)
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  // Function to pick an image
  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1, includeBase64: false },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          setSelectedImage(response.assets[0].uri); // Save the selected image
        }
      }
    );
  };

  const handleTimeChange = (time) => {
    setTimeLeft(time); 
  };

const handleNextPayment = () => {

    navigation.navigate('Payment4', {
      // bank: bank,
      // car : car,
      // totalPrice: totalPrice,
      // startDate: startDate,
      // endDate: endDate,
    })
  };


  useEffect(() => {
    if (timeLeft <= 0) {
      alert('Finished');
    }
  }, [timeLeft]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Konfirmasi Pembayaran</Text>
        
        <Text style={styles.message}>
          Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu akan segera 
          kami cek tunggu kurang lebih 10 menit untuk mendapatkan konfirmasi.
        </Text>
        
        <Text style={styles.timer}>
          <CountDown 
            until={timeLeft} // Time remaining in state
            onFinish={() => alert('Finished')}  // Show alert when countdown finishes
            onChange={handleTimeChange} // Update timeLeft on every tick
            size={10.5}
            digitStyle={{ backgroundColor: '#FA2C5A' }}
            digitTxtStyle={{ color: 'white', fontSize: 18 }}
            timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
            separatorStyle={{ color: 'black' }}
            timeToShow={['M', 'S']}
            timeLabels={{ m: null, s: null }}
            showSeparator
          />
        </Text>

        <Text style={styles.uploadTitle}>Upload Bukti Pembayaran</Text>
        <Text style={styles.uploadSubtitle}>
          Untuk membantu kami lebih cepat melakukan pengecekan, Kamu bisa upload 
          bukti bayarmu
        </Text>

        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <Icon name="image" style={styles.placeholderImage} size={48} color="black" />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.uploadButton} onPress={handleNextPayment}>
          <Text style={styles.uploadButtonText }>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.orderListButton}>
          <Text style={styles.orderListButtonText}>Lihat Daftar Pesanan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#ff0066',
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  placeholderImage: {
    width: 48,
    height: 48,
    tintColor: '#ccc',
  },
  uploadButton: {
    backgroundColor: '#3D7B3F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  orderListButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  orderListButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
});
