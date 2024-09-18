import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Category = {
  id: string;
  title: string;
  imageUrl: string;
};

type Meal = {
  id: string;
  title: string;
  imageUrl: string;
};

type RootStackParamList = {
  MealsScreen: { categoryId: string };
  MealDetail: { mealId: string };
};

const CATEGORIES: Category[] = [
  { id: '1', title: 'Italian', imageUrl: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Quick & Easy', imageUrl: 'https://via.placeholder.com/150' },
  { id: '3', title: 'Hamburgers', imageUrl: 'https://via.placeholder.com/150' },
  { id: '4', title: 'German', imageUrl: 'https://via.placeholder.com/150' },
  { id: '5', title: 'Light & Lovely', imageUrl: 'https://via.placeholder.com/150' },
  { id: '6', title: 'Exotic', imageUrl: 'https://via.placeholder.com/150' },  
];

const MEALS: Record<string, Meal[]> = {
  '1': [
    { id: 'm1', title: 'Spaghetti Carbonara', imageUrl: 'https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-square640-v2.jpg' },
    { id: 'm2', title: 'Margherita Pizza', imageUrl: 'https://images.prismic.io/eataly-us/ed3fcec7-7994-426d-a5e4-a24be5a95afd_pizza-recipe-main.jpg?auto=compress,format' },
    { id: 'm3', title: 'Lasagna', imageUrl: 'https://beptruong.edu.vn/wp-content/uploads/2017/12/lasagna-truyen-thong-600x400.jpg' },
    { id: 'm4', title: 'Fettuccine Alfredo', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgfJFj0J6yrAHoZrFbv-0uBPetW8iDomwOtg&s' },
  ],
  '2': [
    { id: 'm5', title: 'Quick Tacos', imageUrl: 'https://gimmedelicious.com/wp-content/uploads/2019/01/Quick-Chicken-Tacos-food-truck-style-9.jpg' },
    { id: 'm6', title: 'Fast Stir-fry', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPad2NEdqaPXRmlIrx4e1JX4XocWwWxKL0vg&s' },
    { id: 'm7', title: 'Grilled Cheese', imageUrl: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/01/grilled-cheese.jpg' },
    { id: 'm8', title: 'Egg Salad Sandwich', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWywhp9sYt1DsrFUo5DibY5BKWHAW6J80GGw&s' },
  ],
  '3': [
    { id: 'm9', title: 'Beef Burger', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvprxcM2KkmglxdY7kk7IqnO_LMhA-DGsa_w&s' },
    { id: 'm10', title: 'Cheeseburger', imageUrl: 'https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202302_0003-999_CheeseburgerAlt_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off' },
    { id: 'm11', title: 'Double Bacon Burger', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUX4D4qT2gwXVxPyrGUkYtnA5BFHPy8MOmSA&s' },
    { id: 'm12', title: 'Vegan Burger', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBzIMpzjkpSGZmEgNfqOWHh4i8LGCwySiVXQ&s' },
  ],
  '4': [
    { id: 'm13', title: 'Bratwurst', imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2023/8/bratwurst-on-grill.jpg.rend.hgtvcom.1280.960.suffix/1691431272192.jpeg' },
    { id: 'm14', title: 'Sauerbraten', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk6AER6YLl4w7jAoL0nl8U61LtaKM2OhO-wA&s' },
    { id: 'm15', title: 'Potato Dumplings', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmLsXa1hSZGLN5Qp8-nW4t-p-7N424VVnQQA&s' },
    { id: 'm16', title: 'Rouladen', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8T8IsDkUEWnjZLiN3tetR_whuzZf8noWyJw&s' },
  ],
  '5': [
    { id: 'm17', title: 'Caesar Salad', imageUrl: 'https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg' },
    { id: 'm18', title: 'Grilled Chicken Salad', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVhtBlSl70N394EBCAS2pz1oyvw3NEAB-zxQ&s' },
    { id: 'm19', title: 'Kale & Quinoa Salad', imageUrl: 'https://www.recipetineats.com/uploads/2018/04/Kale-Quinoa-Salad_4.jpg' },
    { id: 'm20', title: 'Avocado Salad', imageUrl: 'https://www.jessicagavin.com/wp-content/uploads/2020/07/avocado-salad-16-1200.jpg' },
  ],
  '6': [
    { id: 'm21', title: 'Thai Green Curry', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLjmNA9dCZK-f-jUdLhhzBznrg8QNNKn36nw&s' },
    { id: 'm22', title: 'Chicken Satay', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwkkixV_D9gr_qyqSH_9-WM192grD9Fjmzbg&s' },
    { id: 'm23', title: 'Lamb Rogan Josh', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3beBkvYTloWz6mhttkw3UYORn_-EpskUCzw&s' },
    { id: 'm24', title: 'Tandoori Chicken', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSrOUgfum3eN-iuv0vtBrpao9D6BF2ULKBNg&s' },
  ],
};

const MealsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MealsScreen'>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { categoryId } = route.params;

  const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

  const meals = MEALS[categoryId] || [];

  const renderMealItem = ({ item }: { item: Meal }) => {
    return (
      <TouchableOpacity
        style={styles.mealItem}
        onPress={() => navigation.navigate('MealDetail', { mealId: item.id })}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.categoryInfo}>Category ID: {categoryId}</Text>
      <Text style={styles.categoryTitle}>{selectedCategory?.title}</Text>
      
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  categoryInfo: {
    fontSize: 16,
    color: 'pink',
    marginBottom: 5,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  mealItem: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'pink',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default MealsScreen;
