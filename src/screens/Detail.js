import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Markdown from 'react-native-markdown-display';
import {Row, Col} from '../components/Grid';
import {useNavigation} from '@react-navigation/native';
import {formatCurrency} from '../utils/formatCurrency';
import { getCarsDetails,selectDetail,resetDetail } from '../redux/reducers/cars/Detail';
import {useDispatch, useSelector} from 'react-redux';

const md = `## Include
  
  - Apa saja yang termasuk dalam paket misal durasi max 12 jam
  - Sudah termasuk bensin selama 12 jam
  - Sudah termasuk Tiket Wisata
  - Sudah termasuk pajak
  
  ## Exclude
  
  - Tidak termasuk biaya makan sopir Rp 75.000/hari
  - Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
  - Tidak termasuk akomodasi penginapan`.toString();

export default function Detail({route}) {
  const navigation = useNavigation();
  const {id} = route.params;
  const dispatch = useDispatch();
  const car = useSelector(selectDetail);

  const handleNextPayment = () => {

    navigation.navigate('Payment1', {
      id,
      car : car.data,
    })

  };

  useFocusEffect(
    React.useCallback(() => {
      if (id) {
        dispatch(getCarsDetails(id));
      }
    }, [id]),
  );

  useEffect(() => {
    console.log(car);
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={32} name={'arrow-left'} color={'black'} />
        </TouchableOpacity>
        <View style={styles.heading}>
          <Text style={styles.title}>{car.data.name}</Text>
          <Row style={styles.iconWrapper} gap={5}>
            <Col style={styles.textIcon}>
              <Icon size={14} name={'users'} color={'#8A8A8A'} />
              <Text style={styles.capacityText}>{car.data.seat}</Text>
            </Col>
            <Col style={styles.textIcon}>
              <Icon size={14} name={'briefcase'} color={'#8A8A8A'} />
              <Text style={styles.capacityText}>{car.data.baggage}</Text>
            </Col>
          </Row>
          <Image
            style={styles.image}
            source={{uri: car.data.img}}
            height={200}
            width={200}
          />
        </View> 
        <Markdown style={styles.details}>{car.data.description}</Markdown>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.price}>
          {formatCurrency.format(car.data.price || 0)}
        </Text>
        <TouchableOpacity
          style={styles.payButton}
          onPress={handleNextPayment}>
          <Text style={styles.payButtonText}>Lanjutkan Pembayaran</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    paddingTop: 30,
    padding: 20,
  },
  heading: {
    marginTop: -30,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
  iconWrapper: {
    marginBottom: 20,
  },
  image: {
    marginBottom: 20,
    width: '100%',
  },
  details: {
    body: {
      fontSize: 16,
      marginBottom: 10,
    },
    bullet_list: {
      marginBottom: 10,
    },
    heading2: {marginBottom: 10, fontSize: 18, fontFamily: 'PoppinsBold'},
  },
  price: {
    fontFamily: 'Poppins',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#eeeeee',
    position: 'fixed',
    bottom: 0,
    padding: 20,
  },
  backButton: {
    alignItems: 'flex-start',
    position: 'fixed',
    backgroundColor: 'transparent',
    top: 40,
    left: 10,
    zIndex: 9,
    flex: 0,
  },
  textIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  payButton: {
    backgroundColor: '#3D7B3F',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
