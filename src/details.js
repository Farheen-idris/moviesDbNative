import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Dimensions} from 'react-native';
const image_path = 'http://image.tmdb.org/t/p/w500';
const windowWidth = Dimensions.get('window').width - 20;
export default function Details({route, navigation}) {
  const item = route.params.item;
  console.log(route.params.item);
  return (
    <ScrollView>
      <View style={{width: windowWidth, margin: 6}}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.title} </Text>
          <View style={styles.header}>
            <Text style={styles.textStyle}>Adult</Text>
            <Text>{item.adult}</Text>
          </View>
        </View>

        <View>
          <Image
            source={{uri: `${image_path}${item.backdrop_path}`}}
            style={{
              width: windowWidth,
              height: 400,
            }}
          />
          {/* <Card.Image source={require("http://image.tmdb.org/t/p/w500/69Sns8WoET6CfaYlIkHbla4l7nC.jpg")}> */}

          <View style={styles.header}>
            <Text style={styles.overView}>{item.overview}</Text>
          </View>
          <Text style={styles.textStyle}>Popularity</Text>

          <Text>{item.popularity}</Text>
          <Text style={styles.textStyle}>Vote Average</Text>
          <Text>{item.vote_average}</Text>
          <Text style={styles.textStyle}>Vote Count</Text>
          <Text>{item.vote_count}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    // width: '95%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"red"
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textStyle: {
    fontWeight: 'bold',
    fontSize: 24,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  overView: {
    marginBottom: 10,
    width: windowWidth,
  },
});
