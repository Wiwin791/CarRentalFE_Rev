import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const OrderList = () => {
  const orderList = useSelector((state) => state.order.orderList);

  return (
    <View style={styles.container}>
      <FlatList
        data={orderList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.orderItem}>
            <Text style={styles.carName}>{item.car.name}</Text>
            <Text>{item.totalPrice}</Text>
            <Text>{item.startDate.toDateString()} - {item.endDate.toDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  orderItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  carName: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderList;
