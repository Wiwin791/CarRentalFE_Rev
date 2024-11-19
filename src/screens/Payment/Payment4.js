import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

// const navigation = useNavigation();

export default function Payment4() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.title}>Tiket</Text>
          <Text style={styles.orderId}>Order ID: xxxxxxxx</Text>
        </View>
      </View>

      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        <View style={styles.progressStep}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepCheck}>✓</Text>
          </View>
          <Text style={styles.stepText}>Pilih Metode</Text>
        </View>
        <View style={[styles.progressLine, styles.completed]} />
        <View style={styles.progressStep}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepCheck}>✓</Text>
          </View>
          <Text style={styles.stepText}>Bayar</Text>
        </View>
        <View style={[styles.progressLine, styles.completed]} />
        <View style={styles.progressStep}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepCheck}>3</Text>
          </View>
          <Text style={styles.stepText}>Tiket</Text>
        </View>
      </View>

      {/* Invoice Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Invoice</Text>
        <TouchableOpacity style={styles.invoiceButton}>
          <Text style={styles.invoiceText}>INV/xx/xx-xxxx/</Text>
          <Icon name="download" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* E-Ticket Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>E-Tiket</Text>
        <View style={styles.pdfContainer}>
          <Icon name="image" size={32} color="#666" />
          <Text style={styles.pdfText}>PDF Viewer</Text>
        </View>
      </View>

      <Text style={styles.instructionText}>
        Tunjukkan tiket ini ke petugas JBO di pos penempatan Anda.
      </Text>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.bottomButton}>
        <Text style={styles.bottomButtonText}>Lihat Daftar Pesanan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
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
  backButton: {
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderId: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  progressStep: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepCheck: {
    color: '#fff',
    fontSize: 14,
  },
  stepText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  completed: {
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
  invoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
  },
  invoiceText: {
    fontSize: 14,
  },
  pdfContainer: {
    aspectRatio: 1.5,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  pdfText: {
    marginTop: 8,
    color: '#666',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  bottomButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
})