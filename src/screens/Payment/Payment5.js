import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import { selectOrder, payment } from '../../redux/reducers/order';
import { selectUser } from '../../redux/reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect , useNavigation} from '@react-navigation/native';
import ModalPopup from '../../components/Modal';


export default function PaymentConfirmation() {
  const [timeLeft, setTimeLeft] = useState(595); // 9 minutes and 55 seconds
  const [image, setImage] = useState(null);
  const user = useSelector(selectUser);
  const order = useSelector(selectOrder);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisibile, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      
    };

    launchImageLibrary(options, (response) => {

      const selectedImage = response.assets[0];
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }   
      const imageData = `data:${selectedImage.type};base64,${selectedImage.base64}`;
      setImage(imageData);

    });
  };

  const handlePayment = () => {
    if (image) {
      dispatch(payment({
        id: order.data?.id,
        receipt: image,
        token: user.token
      }));
    }

    
  }

  useFocusEffect(
    useCallback(() => {
      if (order.status === 'success') {
        setModalVisible(true);
        setErrorMessage(null);
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('TicketScreen');
        }, 1000);
      } else if (order.status === 'failed') {
        setErrorMessage(order.message);
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
      } else if (order.status === 'pending') {
        // Do nothing or handle the case where status is pending
        setErrorMessage('Your payment is still being processed.');
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
      }
      // If order.status is not 'success', 'failed', or 'pending', no action happens here
    }, [order.status])
  );
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Konfirmasi Pembayaran</Text>

      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu akan segera kami cek tunggu kurang lebih 10 menit untuk mendapatkan konfirmasi.
        </Text>
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.uploadTitle}>Upload Bukti Pembayaran</Text>
        <Text style={styles.uploadSubtitle}>
          Untuk membantu kami lebih cepat melakukan pengecekan, Kamu bisa upload bukti bayarmu
        </Text>

        <TouchableOpacity onPress={pickImage} style={styles.imagePickerContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.selectedImage} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Image
                // source={require('./assets/placeholder-icon.png')}
                style={styles.placeholderIcon}
              />
              <Icon name="image" size={32} color="#666" />
              <Text>Pick an image</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handlePayment}
        style={[
          styles.uploadButton,
          !image && styles.uploadButtonDisabled,
        ]}
        disabled={!image} 
      >
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.viewOrderButton} onPress={() => navigation.navigate('HomeTabs', {screen : 'ListOrder'})}>
        <Text style={styles.viewOrderText}>Lihat Daftar Pesanan</Text>
      </TouchableOpacity>

      <ModalPopup visible={modalVisibile}>
          <View style={styles.modalBackground}>
            {errorMessage !== null ? (
              <>
                <Icon size={13} name={'x-circle'} color="#D9534F" />
                {Array.isArray(errorMessage) ? (
                  errorMessage.map(e => {
                    return <Text>{e.message}</Text>;
                  })
                ) : (
                  <Text> {errorMessage} </Text>
                )}
              </>
            ) : (
              <>
                <Icon size={32} name={'check-circle'} color="#5CB85F" />
                <Text>Upload Image Succesfully</Text>
              </>
            )}
          </View>
        </ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageContainer: {
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF0000',
  },
  uploadSection: {
    marginBottom: 24,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  uploadButtonDisabled: {
    backgroundColor: '#cccccc',  
    borderColor: '#999999',
  },

  imagePickerContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  placeholderIcon: {
    width: 24,
    height: 24,
    opacity: 0.5,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  uploadButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  viewOrderButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  viewOrderText: {
    color: '#4CAF50',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  modalBackground: {
    width: '90%',
    backgroundColor: '#fff',
    elevation: 20,
    borderRadius: 10,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
},
  iconError: {
    marginBottom: 15,
  },
  iconSuccess: {
    marginBottom: 15,
  },
});