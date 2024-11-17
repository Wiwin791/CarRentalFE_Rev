/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useCallback } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Button from '../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import CarList from '../components/CarList';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/reducers/user';
import { getCars, selectCars } from '../redux/reducers/cars';

const COLORS = {
  primary: '#A43333',
  secondary: '#5CB85F',
  darker: '#121212',
  lighter: '#ffffff'
}

const ButtonIcon = ({ icon, title }) => (
  <Button>
    <View style={styles.iconWrapper}>
      <Icon name={icon} size={25} color="#fff" />
    </View>
    <Text style={styles.iconText}>{title}</Text>
  </Button>
)

function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const car = useSelector(selectCars);
  const isDarkMode = useColorScheme() === 'dark';


  useFocusEffect(
    useCallback(() => {
        if (user.token) {
            dispatch(getCars(user.token))
            console.log(car.data)
        }
    }, [user, dispatch]))

  const backgroundStyle = {
    // overflow: 'visible',
    backgroundColor: isDarkMode ? COLORS.darker : COLORS.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.primary}
      />
      {/* end banner */}
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.headerContainer}>
                <View>
                  <Text style={styles.headerText}>Hi, {user ? user.fullname : 'Guest'}</Text>
                  <Text style={styles.headerTextLocation}>Your Location</Text>
                </View>
                <View >
                  <Image style={styles.imageRounded} source={{ uri: "https://i.pravatar.cc/100" }} width={50} height={50} />
                </View>
              </View>
              {/* banner */}
              <View style={{
                ...styles.headerContainer,
                ...styles.bannerContainer
              }}>
                <View style={styles.bannerDesc}>
                  <Text style={styles.bannerText}>Sewa Mobil Berkualitas di kawasanmu</Text>
                  <Button
                    color={COLORS.secondary}
                    title='Sewa Mobil'
                  />
                </View>
                <View style={styles.bannerImage}>
                  <Image source={require('../assets/images/img_car.png')} width={50} height={50} />
                </View>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <ButtonIcon icon="truck" title="Sewa Mobil" />
              <ButtonIcon icon="box" title="Oleh-Oleh" />
              <ButtonIcon icon="key" title="Penginapan" />
              <ButtonIcon icon="camera" title="Wisata" />
            </View>
          </>
        }
       // Display car list only if the user is logged in
       data={user.token && car.data ? car.data : []} // Only show cars if the user is logged in
       ListEmptyComponent={
        !user.token ? (
          <View style={styles.emptyStateContainer}>
            <Icon name="log-in" style={styles.iconStyle} size={52} color="#ccc" />
            <Text style={styles.emptyStateText}>
              Silahkan Login untuk Melihat Daftar Mobil
              
            </Text>
            <View style={styles.loginButtonContainer}>
              <Button title="Login" onPress={() => navigation.navigate('SignIn')} />
            </View>
          </View>
        ) : (
          <Text style={styles.noCarsText}>
            Tidak ada mobil yang tersedia
          </Text>
        )
      }
      renderItem={({ item }) => (
        <CarList
          key={item.id}
          image={{ uri: item.img }}
          carName={item.name}
          passengers={5}
          baggage={4}
          price={item.price}
          onPress={() => navigation.navigate('Detail', { id: item.id })}
        />
      )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    height: 130,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // posisi horizontal
    alignItems: 'center', // posisi
    padding: 10
  },
  imageRounded: {
    borderRadius: 40,
  },
  headerText: {
    color: COLORS.lighter,
    fontWeight: 700,
    fontSize: 12
  },
  headerTextLocation: {
    color: COLORS.lighter,
    fontWeight: 700,
    fontSize: 14
  },
  bannerContainer: {
    borderRadius: 4,
    padding: 0,
    backgroundColor: '#AF392F',
    marginHorizontal: 10,
    flexWrap: 'wrap',
    marginBottom: -200
  },
  bannerText: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.lighter,
  },
  bannerDesc: {
    paddingHorizontal: 10,
    width: '40%'
  },
  iconContainer: {
    marginTop: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  iconWrapper: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    padding: 15
  },
  iconText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 700,
    minWidth: 65,
    marginTop: 5,
    textAlign: 'center'
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lighter,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButtonContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconStyle: {
    marginBottom: 50,
    marginTop: 50
  },

  // Styling untuk pesan "Tidak Ada Mobil"
  noCarsText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 30,
  },
});

export default Home;
