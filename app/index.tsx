import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  list: {
    paddingBottom: 16,
  },
  movieItem: {
    flexDirection: 'column', // ubah dari 'row' ke 'column'
    alignItems: 'center',
    marginBottom: 32,
  },
  poster: {
    width: 150,
    height: 220,
    marginTop: 8,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

const MovieList = () => {
  const [movies, setMovies] = useState<{ id: string; title: string; poster: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  fetch('http://localhost:8000/api/movies')
    .then((res) => res.json())
    .then((data) => {
      console.log('DATA DARI API:', data); // Tambahkan ini
      setMovies(data);
      setLoading(false);
    })
    .catch(() => {
      setMovies([
        { id: '1', title: 'Sonic The Hedgehog 3', poster: 'https://cdn.moviefone.com/admin-uploads/highlights/images/sonic3-keanu-reeves-character-poster_1734259512.jpg' },
        { id: '2', title: 'Mufasa; The Lion King', poster: 'https://image.tmdb.org/t/p/original/jCs5jkhr69MCzTn9qO6cv1vjvO5.jpg' },
        { id: '3', title: 'Modal Nekad', poster: 'https://m.media-amazon.com/images/M/MV5BZDhiZmFjMTUtMzQyYy00MmEyLWJiNjMtN2Q1YmZjZDViYjVhXkEyXkFqcGc@._V1_UY1200_CR85,0,630,1200_AL_.jpg' },
      ]);
      setLoading(false);
    });
}, []);

  const renderMovie = ({ item }: { item: { id: string; title: string; poster: string } }) => (
    <TouchableOpacity style={styles.movieItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={{ uri: item.poster }} style={styles.poster} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>The Movie App</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default MovieList;

