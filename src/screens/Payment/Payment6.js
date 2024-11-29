import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {statusChange, selectOrder} from '../../redux/reducers/order';
import { useDispatch, useSelector } from 'react-redux';

export default function TicketScreen() {

  const order = useSelector(selectOrder);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      if (order.status) dispatch(statusChange());
    }, [order.status]),
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View>
          <Text
            style={styles.headerTitle}>Tiket</Text>
            <Text style={styles.orderId}>Order ID:</Text>
        </View>
      </View>

      {/* Stepper */}
      <View style={styles.stepper}>
        <View style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepCheck}>✓</Text>
          </View>
          <Text style={styles.stepText}>Pilih Metode</Text>
        </View>
        <View style={[styles.stepLine, styles.completedLine]} />
        <View style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepCheck}>✓</Text>
          </View>
          <Text style={styles.stepText}>Bayar</Text>
        </View>
        <View style={[styles.stepLine, styles.completedLine]} />
        <View style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepCheck}>✓</Text>
          </View>
          <Text style={styles.stepText}>Tiket</Text>
        </View>
      </View>

      {/* Invoice Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Invoice</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.invoiceText}>{order.data?.order_no}</Text>
          <Feather name="download" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* E-Ticket Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>E-Tiket</Text>
        <View style={styles.pdfViewer}>
          <Feather name="image" size={32} color="#666" />
          <Text style={styles.pdfText}>PDF Viewer</Text>
        </View>
      </View>

      <Text style={styles.helperText}>
        Tunjukkan tiket ini ke petugas JR3 di pos penjemputan Anda.
      </Text>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeTabs', {screen: 'ListOrder'})}>
        <Text style={styles.buttonText} >Lihat Daftar Pesanan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  orderId: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 10
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stepCheck: {
    color: '#fff',
    fontSize: 14,
  },
  stepText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  completedLine: {
    backgroundColor: '#4CAF50',
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  downloadButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
  },
  invoiceText: {
    fontSize: 14,
  },
  pdfViewer: {
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfText: {
    marginTop: 8,
    color: '#666',
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});