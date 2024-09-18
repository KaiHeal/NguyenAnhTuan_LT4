import React, { useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import thư viện icon

const CATEGORIES = [
  { id: '1', title: 'Italian', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDDq1iLXfXoLfgkVm6CJRNCgfHp--MyLbEg&s', rating: 4.5 },
  { id: '2', title: 'Quick & Easy', imageUrl: 'https://www.thelazydish.com/wp-content/uploads/2022/03/quick-and-easy-dinner-ideas-fast-to-make-last-minute.jpg', rating: 4.0 },
  { id: '3', title: 'Hamburgers', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENYnRh013tE7LrJCY-j0pTDFoJzJZtAx8qw&s', rating: 3.5 },
  { id: '4', title: 'German', imageUrl: 'https://admin.expatica.com/de/wp-content/uploads/sites/6/2023/11/bratwurst-sauerkraut.jpg', rating: 4.8 },
  { id: '5', title: 'Light & Lovely', imageUrl: 'https://images.cookforyourlife.org/wp-content/uploads/2018/08/Pumpkin-Soup_5216.jpg', rating: 4.2 },
  { id: '6', title: 'Exotic', imageUrl: 'https://www.vietnamonline.com/media/uploads/froala_editor/images/Scallop.jpg', rating: 5.0 },
];

const CategoriesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const filteredCategories = CATEGORIES.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : i - rating < 1 ? 'star-half-full' : 'star-o'}
          size={20}
          color="#FFD700"
        />
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const renderCategoryItem = (itemData: { item: { id: string; title: string; imageUrl: string; rating: number } }) => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigation.navigate('Meals', { categoryId: itemData.item.id })}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: itemData.item.imageUrl }} style={styles.image} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{itemData.item.title}</Text>
            {renderStars(itemData.item.rating)}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search categories..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryItem}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchInput: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'pink',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'pink',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
});

export default CategoriesScreen;
