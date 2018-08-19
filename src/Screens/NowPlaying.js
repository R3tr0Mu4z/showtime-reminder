import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableWithoutFeedback  } from 'react-native';
import { Container, Header, Content, Left, Right, Button, Icon, Body, Title } from 'native-base';

class NowPlaying extends Component {
    
  constructor(props) {
        super(props);
        this.state = { 
            movieid : '',
            movieplaying: []
        
        };
        
      }
  componentWillMount() {
        const PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=b2302b6aa8d81da12862cec0415e5b25&language=en-US&page=1';
        let MOVIE_FETCH_URL = `${PLAYING_URL}`;
        console.log(MOVIE_FETCH_URL); 
        fetch(MOVIE_FETCH_URL, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => {  
                console.log(json.results, 'json from tmdb')
            let movieplaying =[{"Title":"","Year":"","imdbID":"","Type":"","Poster":""}];

           if (json.results !== undefined){
             let movieplaying  = json.results;
               console.log(movieplaying, 'from fastsuggestion');
            this.setState({movieplaying});
           } else if (json.results == undefined) {
               let movieplaying = [];
               console.log(movieplaying, 'undefined from movieplaying');
           } 
        } 

        )
    
      
  }

  render() {
  const  movieplaying  = this.state.movieplaying; 
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Now Playing</Title>
            
          </Body>
          <Right />
            <Content>
            
            </Content>
        </Header>
        <ScrollView scrollEventThrottle={16}>
          <View style={[style.parent]}>
            
           {movieplaying.map((suggest, k) => {
            let img_BASE_URL = 'https://image.tmdb.org/t/p/w200';
            let img_END_URL = `${movieplaying[k].poster_path}` 
            let img_URL = `${img_BASE_URL}${img_END_URL}`
            return (
        
        <TouchableWithoutFeedback onPressIn={() => this.setState({movieid: movieplaying[k].id})} 
                            onPress={() => {
                                this.props.navigation.navigate('MovieInfo', {
                                movietitle: this.state.movieid,
                                screen: 'NowPlaying'
                              }); 
                            }}
                            >
            <View style={[style.child]}>
            
              <Image source={
                          {uri: `${img_URL}`}
                      
                      } style={{height: 400, width: 220, position: 'absolute', right: 0, bottom: 0, flex: 1} }/>   
              
              </View>
        </TouchableWithoutFeedback> 
             )
        })}  
             
             
        </View>   
        </ScrollView>
      </Container> 
    );
  }
}

export default NowPlaying;



const style = StyleSheet.create({
    parent: {
        width: '100%', 
        flexDirection: 'row',  
        flexWrap: 'wrap'
    },
    child: {
        width: '50%',    
        height: 500,
        aspectRatio: 1,
        paddingBottom: 400
    }
})