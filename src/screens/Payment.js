import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../utils/formatCurrency';
import { Row, Col } from '../components/Grid';
import Icon from 'react-native-vector-icons/Feather';

export default function PaymentScreen({ route }) {
    const navigation = useNavigation();
    const { carDetails } = route.params;  // Passing carDetails from previous screen

    useEffect(() => {
        if (!carDetails) {
            navigation.goBack();  // If no car details are passed, go back
        }
    }, [carDetails]);

    return (
              <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon size={32} name={'arrow-left'} color={'black'} />
                </TouchableOpacity>
                  <Text style={styles.headerTitle}>Pembayaran</Text>
                </View>
          
                {/* Progress Steps */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressStep}>
                    <View style={[styles.stepCircle, styles.activeStep]}>
                      <Text style={styles.stepNumber}>1</Text>
                    </View>
                    <Text style={styles.stepText}>Pilih Metode</Text>
                  </View>
                  <View style={styles.progressLine} />
                  <View style={styles.progressStep}>
                    <View style={styles.stepCircle}>
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
          
                <ScrollView style={styles.content}>
                  {/* Vehicle Details */}
                  <View style={styles.vehicleCard}>
                  <Image
                        style={styles.carIconPlaceholder}
                        source={{ uri: carDetails.img }}
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
          
                  {/* Bank Transfer Section */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pilih Bank Transfer</Text>
                    <Text style={styles.sectionDescription}>
                      Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau Mobile Banking
                    </Text>
          
                    {/* Bank Options */}
                    <TouchableOpacity style={styles.bankOption}>
                      <Text style={styles.bankText}>BCA</Text>
                      <Text style={styles.bankSubtext}>BCA Transfer</Text>
                    </TouchableOpacity>
          
                    <TouchableOpacity style={styles.bankOption}>
                      <Text style={styles.bankText}>BNI</Text>
                      <Text style={styles.bankSubtext}>BNI Transfer</Text>
                    </TouchableOpacity>
          
                    <TouchableOpacity style={styles.bankOption}>
                      <Text style={styles.bankText}>Mandiri</Text>
                      <Text style={styles.bankSubtext}>Mandiri Transfer</Text>
                    </TouchableOpacity>
                  </View>
          
                  {/* Promo Code */}
                  <View style={styles.promoSection}>
                    <Text style={styles.promoTitle}>Pakai Kode Promo</Text>
                    <View style={styles.promoInputContainer}>
                      <TextInput
                        style={styles.promoInput}
                        placeholder="Tulis catatanmu di sini"
                        placeholderTextColor="#999"
                      />
                      <TouchableOpacity style={styles.promoButton}>
                        <Text style={styles.promoButtonText}>Terapkan</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
          
                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                  <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>{formatCurrency.format(carDetails.price || 0)}</Text>
                  </View>
                  <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>Bayar</Text>
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
            headerTitle: {
              fontSize: 18,
              fontWeight: '600',
              marginLeft: 16,
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
            progressLine: {
              flex: 1,
              height: 1,
              backgroundColor: '#ddd',
              marginHorizontal: 8,
            },
            stepCircle: {
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: '#eee',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 4,
            },
            activeStep: {
              backgroundColor: '#4CAF50',
            },
            stepNumber: {
              fontSize: 12,
              color: '#666',
            },
            stepText: {
              fontSize: 12,
              color: '#666',
            },
            content: {
              flex: 1,
            },
            vehicleCard: {
              flexDirection: 'row',
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            },
            carIconPlaceholder: {
              width: 80,
              height: '100%',
              backgroundColor: 'transparent',
              borderRadius: 8
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
              fontSize: 16,
              fontWeight: '600',
              color: '#4CAF50',
            },
            section: {
              padding: 16,
            },
            sectionTitle: {
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 8,
            },
            sectionDescription: {
              fontSize: 14,
              color: '#666',
              marginBottom: 16,
            },
            bankOption: {
              padding: 16,
              borderWidth: 1,
              borderColor: '#eee',
              borderRadius: 8,
              marginBottom: 8,
            },
            bankText: {
              fontSize: 16,
              fontWeight: '500',
            },
            bankSubtext: {
              fontSize: 14,
              color: '#666',
              marginTop: 2,
            },
            promoSection: {
              padding: 16,
            },
            promoTitle: {
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 8,
            },
            promoInputContainer: {
              flexDirection: 'row',
            },
            promoInput: {
              flex: 1,
              borderWidth: 1,
              borderColor: '#eee',
              borderRadius: 8,
              padding: 12,
              marginRight: 8,
            },
            promoButton: {
              backgroundColor: '#4CAF50',
              borderRadius: 8,
              padding: 12,
              justifyContent: 'center',
            },
            promoButtonText: {
              color: '#fff',
              fontWeight: '600',
            },
            bottomSection: {
              padding: 16,
              borderTopWidth: 1,
              borderTopColor: '#eee',
            },
            totalContainer: {
              marginBottom: 12,
            },
            totalText: {
              fontSize: 18,
              fontWeight: '600',
            },
            payButton: {
              backgroundColor: '#4CAF50',
              borderRadius: 8,
              padding: 16,
              alignItems: 'center',
            },
            payButtonText: {
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            },
            backButton: {
                alignItems: 'flex-start',
                position: 'fixed',
               
                top: 40,
                left: 10,
                zIndex: 9,
                flex: 0,
            },
          })