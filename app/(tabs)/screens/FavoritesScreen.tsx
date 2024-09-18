import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const FAVORITE_MEALS = [
  { id: '1', title: 'Spaghetti Carbonara' },
  { id: '2', title: 'Chicken Parmesan' },
  { id: '3', title: 'Beef Wellington' },
  { id: '4', title: 'Sushi' },
  { id: '5', title: 'Pad Thai' },
  { id: '6', title: 'Margherita Pizza' },
  { id: '7', title: 'Fish Tacos' },
  { id: '8', title: 'Ramen' },
  { id: '9', title: 'Chocolate Cake' },
  { id: '10', title: 'French Toast' },
  { id: '11', title: 'Grilled Cheese Sandwich' },
  { id: '12', title: 'Lobster Bisque' },
];


const FavoritesScreen = () => {
  const renderFavoriteItem = (itemData: { item: { id: string; title: string } }) => {
    return (
      <View style={styles.favoriteItem}>
        <Text>{itemData.item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Your Favorite Meals</Text>
      <FlatList
        data={FAVORITE_MEALS}
        keyExtractor={(item) => item.id}
        renderItem={renderFavoriteItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  favoriteItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'pink',
    borderRadius: 10,
  },
});

export default FavoritesScreen;
