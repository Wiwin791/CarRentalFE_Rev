import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/user';
import { useState, useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import axios from 'axios';
import CarList from '../components/CarList';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

function List() {
    const dispatch = useDispatch();
    const [cars, setCars] = useState([]);
    const isDarkMode = useColorScheme() === 'dark';
    const user = useSelector(selectUser)
    const navigation = useNavigation();

    const COLORS = {
        primary: '#A43333',
        secondary: '#5CB85F',
        darker: '#121212',
        lighter: '#ffffff'
      }

    useEffect(() => {
        if (user.isLogin) {
            const fetchCars = async () => {
                try {
                    const res = await axios('http://192.168.25.207:3000/api/v1/cars');
                    console.log(res.data);
                    setCars(res.data);
                } catch (e) {
                    console.log(e);
                }
            };
            fetchCars();
        }
    }, [user]);

    const handleLogin = () => {
        dispatch(login());  // Disptach action login
    };

    return (
        <SafeAreaView style={{ backgroundColor: isDarkMode ? '#121212' : '#ffffff' }}>
            <FocusAwareStatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={COLORS.lighter}
            />
            {!user.isLogin ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, marginBottom: 20 }}>Silahkan Login untuk Melihat Daftar Mobil</Text>
                    <Button title="Login" onPress={handleLogin} />
                </View>
            ) : (
                <FlatList
                    data={cars.data}
                    renderItem={({ item, index }) => (
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
            )}
        </SafeAreaView>
    );
}

export default List;
