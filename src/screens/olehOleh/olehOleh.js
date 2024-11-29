import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { selectUser } from '../../redux/reducers/user';
import { useSelector } from 'react-redux';
import GeoLoc from '../../components/Geolocation';

const COLORS = {
    primary: '#A43333',
    secondary: '#5CB85F',
    darker: '#121212',
    lighter: '#ffffff',
  };
  

const OlehOlehScreen = () => {
  const souvenirs = [
    {
      id: '1',
      name: 'Batik Traditional',
      price: 'Rp 150.000,00',
      image: require('../../assets/images/batik.png'),
      rating: 4.5,
      sold: 50,
    },
    {
      id: '2',
      name: 'Local Snacks Pack',
      price: 'Rp 75.000,00',
      image: require('../../assets/images/snack.jpg'),
      rating: 4.8,
      sold: 120,
    },
    {
      id: '3',
      name: 'Handmade Craft',
      price: 'Rp 200.000,00',
      image: require('../../assets/images/handmade.jpg'),
      rating: 4.3,
      sold: 30,
    },
  ];

  const user = useSelector(selectUser)

  const Header = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>{user.data?.fullname}</Text>
        <Text style={styles.location}>
            <GeoLoc/>
        </Text>
      </View>
      <Image
        source={{uri: 'https://i.pravatar.cc/100'}}
        style={styles.profilePic}
      />
    </View>
  );

  const SouvenirCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.souvenirImage} />
      <View style={styles.cardContent}>
        <Text style={styles.souvenirName}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>⭐ {item.rating}</Text>
          <Text style={styles.stats}>Terjual {item.sold}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Oleh-Oleh Khas Daerah</Text>
          <Text style={styles.bannerSubtitle}>Temukan berbagai oleh-oleh unik</Text>
        </View>
        <View style={styles.souvenirList}>
          {souvenirs.map((item) => (
            <SouvenirCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>📋</Text>
          <Text style={styles.navText}>Daftar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>🛒</Text>
          <Text style={styles.navText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>👤</Text>
          <Text style={styles.navText}>Akun</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#B22222',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  location: {
    color: COLORS.lighter,
    fontSize: 14,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    padding: 16,
    backgroundColor: '#B22222',
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#fff',
  },
  souvenirList: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  souvenirImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 12,
  },
  souvenirName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stats: {
    fontSize: 14,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default OlehOlehScreen;