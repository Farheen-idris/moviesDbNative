import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Details from './details';

import {Card, ListItem, Button, Icon} from 'react-native-elements';

const moviedbUrl =
  'https://api.themoviedb.org/3/movie/550/recommendations?api_key=649be8f66fa6eeb1a8c96108c2080ad7&language=en-US&page=1';

const image_path = 'http://image.tmdb.org/t/p/w500';

const windowWidth = Dimensions.get('window').width-60;
const windowHeight = Dimensions.get('window').height;


const Movie = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState(false);
  const [data, setData] = useState([]);
  const [scroll, setScroll] = useState(5);
  console.log(data);

  useEffect(() => {
    fetch(moviedbUrl)
      .then(response => response.json())
      .then(json => setData(json?.results))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
    console.log(data);
  }, []);

  return (
    <ScrollView>
      {data.slice(0, scroll).map((u, i) => (
        <Card containerStyle={styles.cardContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{u.title} </Text>
            <View style={styles.header}>
              <Text>release-on:</Text>
              <Text>{u.release_date}</Text>
            </View>
          </View>
          <ListItem key={i}>
            <View>
              <Image
                source={{uri: `${image_path}${u.poster_path}`}}
                style={{
                  width: windowWidth,
                  height: 200,
                }}
              />
              {/* <Card.Image source={require("http://image.tmdb.org/t/p/w500/69Sns8WoET6CfaYlIkHbla4l7nC.jpg")}> */}

              <View style={styles.header}>
                <Text style={styles.overView}>
                  {readMore
                    ? u.overview
                    : `${u.overview.substring(0, 150)}....`}
                  <TouchableOpacity onPress={() => setReadMore(!readMore)}>
                    <Text style={{color: 'blue'}}>
                      {readMore ? 'show less' : 'read more'}
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>

              <Text>Popularity: {u.popularity}</Text>

              <Button
                icon={<Icon color="#ffffff" />}
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate('Details', {
                    item: u,
                  });
                }}
                title="Detail"
              />
            </View>
          </ListItem>
        </Card>
      ))}
        <Button onPress={() => setScroll(scroll+5)} title="show More"/>
                
         

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    // width: '95%',
    // height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"red"
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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

export default Movie;
