import React, { useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../../utils/formatCurrency';
import { format, addDays } from 'date-fns';
import { id } from 'date-fns/locale';
import CountDown from 'react-native-countdown-component-maintained';

export default function Payment3({ route }) {
  const navigation = useNavigation();
  const currentDate = new Date();
  const newDate = addDays(currentDate, 1);
  const { carDetails, selectedPaymentMethod } = route.params;
  const formattedDate = format(newDate, "eeee, dd MMM yyyy 'jam' HH:mm", { locale: id });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={32} name={'arrow-left'} color={'black'} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{selectedPaymentMethod}</Text>
          <Text style={styles.orderNumber}>Order ID: xxxxxxxx</Text>
        </View>
      </View>

      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        <View style={styles.progressStep}>
          <View style={[styles.stepCircle, styles.activeStep]}>
            <Text style={styles.stepNumber}>✓</Text>
          </View>
          <Text style={styles.stepText}>Pilih Metode</Text>
        </View>
        <View style={[styles.progressLine, styles.activeLine]} />
        <View style={styles.progressStep}>
          <View style={[styles.stepCircle, styles.activeStep]}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <Text style={styles.stepText}>Bayar</Text>
        </View>
        <View style={styles.progressLine} />
        <View style={styles.progressStep}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={styles.stepText}>Tiket</Text>
        </View>
      </View>

      {/* Timer */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          Selesaikan Pembayaran Sebelum{' '}
          <CountDown style={styles.timerDigits}
            size={10.5}
            until={86400}
            onFinish={() => alert('Finished')}
            digitStyle={{ backgroundColor: '#FA2C5A' }}
            digitTxtStyle={{ color: 'white', fontSize: 18 }}
            timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
            separatorStyle={{ color: 'black' }}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{ m: null, s: null }}
            showSeparator
          />
        </Text>
        <Text style={styles.dateText}>{formattedDate} WIB</Text>
      </View>

      {/* Vehicle Details */}
      <View style={styles.vehicleContainer}>
        <Image
          source={{ uri: carDetails.img }}
          style={styles.vehicleImage}
        />
        <View style={styles.vehicleDetails}>
          <Text style={styles.vehicleName}>{carDetails.name}</Text>
          <View style={styles.vehicleIcons}>
            <View style={styles.iconContainer}>
              <Icon size={14} name={'users'} color={'#8A8A8A'} />
              <Text style={styles.iconText}>{carDetails.seat}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon size={14} name={'briefcase'} color={'#8A8A8A'} />
              <Text style={styles.iconText}>{carDetails.baggage}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.price}>{formatCurrency.format(carDetails.price || 0)}</Text>
      </View>

      {/* Transfer Details */}
      <View style={styles.transferContainer}>
        <Text style={styles.transferTitle}>Lakukan Transfer ke</Text>
        <View style={styles.bankContainer}>
          <View style={styles.bankButton}>
            <Text style={styles.bankText}>{selectedPaymentMethod}</Text>

          </View>
          <View>
            <Text >{selectedPaymentMethod} Transfer</Text>
          </View>
          <View>
          </View>
        </View>
        <View>
          <Text style={styles.bankSubtext}>a.n Jeep Bromo Online</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nomor Rekening</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.input}>xxxx-xxxx-xxxx</Text>
            <TouchableOpacity>
              <Icon size={20} name={'copy'} color={'#8A8A8A'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Total Bayar</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.input}>{formatCurrency.format(carDetails.price || 0)}</Text>
            <TouchableOpacity>
              <Icon size={20} name={'copy'} color={'#8A8A8A'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          Klik konfirmasi pembayaran untuk mempercepat proses pengeceken
        </Text>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            navigation.navigate('Payment5');
          }}
        >
          <Text style={styles.payButtonText}>Lanjutkan Pembayaran</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderListButton}>
          <Text style={styles.orderListButtonText}>Lihat Daftar Pesanan</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  orderNumber: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  progressStep: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStep: {
    backgroundColor: '#4CAF50',
  },
  stepNumber: {
    color: '#fff',
    fontSize: 12,
  },
  stepText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: '#eee',
    marginHorizontal: 8,
  },
  activeLine: {
    backgroundColor: '#4CAF50',
  },
  timerContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerDigits: {
    alignItems: 'center',
    marginBottom: 20
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginTop: -5,
    fontWeight: 'bold'
  },
  vehicleContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  vehicleImage: {
    width: 80,
    height: '100%',
    backgroundColor: 'transparent',
  },
  vehicleDetails: {
    flex: 1,
    marginLeft: 12,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
  },
  vehicleIcons: {
    flexDirection: 'row',
    marginTop: 4,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    marginLeft: 4,
    color: '#666',
  },
  price: {
    marginTop: 13,
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  transferContainer: {
    padding: 16,
  },
  transferTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  bankContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bankButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  bankButtonActive: {
    backgroundColor: '#E8F5E9',
  },
  bankText: {
    color: '#666',
  },
  bankTextActive: {
    color: '#4CAF50',
  },
  bankSubtext: {
    fontSize: 14,
    color: '#666',
    marginLeft: 84,
    marginTop: -25
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    marginTop: 8
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
  },
  input: {
    fontSize: 16,
  },
  bottomContainer: {
    padding: 16,
  },
  bottomText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orderListButton: {
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  orderListButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: '#3D7B3F',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 15
},
payButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
})