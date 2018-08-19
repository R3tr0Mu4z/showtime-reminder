import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Font, Container, Header, List, ListItem, Thumbnail, Left, Body, Right, Button, Icon, Title, Input, Item, Content, Label, Form } from 'native-base';
import Expo from "expo";

class SearchMovie extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            query: '',
            fastsuggestions: [],
            movie:'',
            img: '',
            movieid : '',
            movies: [],
            moviej: {}
        
        };
        
      }
    
   async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }
    
    fastsearch(event) {
        console.log(this.state.query);
        if (this.state.query !== null){
        const BASE_URL = 'https://api.themoviedb.org/3/search/movie?api_key=b2302b6aa8d81da12862cec0415e5b25&query=';
        const END_URL = ''
        let FETCH_URL = `${BASE_URL}?s=${this.state.query}${END_URL}`;
       fetch(FETCH_URL, {
           method: 'GET'
       })
      .then(response => response.json())
      .then(json => {
            console.log(json.results, 'json from tmdb')
            let fastsuggestions =[{"Title":"","Year":"","imdbID":"","Type":"","Poster":""}];

           if (json.results !== undefined){
             let fastsuggestions  = json.results;
               console.log(fastsuggestions, 'from fastsuggestion');
            this.setState({fastsuggestions});
           } else if (json.results == undefined) {
               let fastsuggestions = [];
               console.log(fastsuggestions, 'undefined from fastsuggestion');
           }

        }
       )  
    }
    } 
    clearsuggestion(event) {
        this.setState({fastsuggestions : []});
        console.log(this.state.fastsuggestions, 'this.fastsuggestion')
    }

    

  render() { 
      if (this.state.loading) {
      return <Expo.AppLoading />;
    }
  console.log(this.state.moviej.title, 'xxxxxxxxxxxxxxxxxxxxxxx')
  const  fastsuggestion  = this.state.fastsuggestions; 
    return (
        
       <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Search Movie</Title>
            
          </Body>
          <Right />
            <Content>
            
            </Content>
        </Header>
        <Header>
          <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search"
                   onChangeText={(query) => {this.setState({query},function () {
                    this.fastsearch();})}}   
                />  
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </Container>
        </Header>
        
        <Content>
      <Container>
      
        <Content>
          <List>
          {fastsuggestion.map((suggest, k) => {
            let img_BASE_URL = 'https://image.tmdb.org/t/p/w200';
            let img_END_URL = `${fastsuggestion[k].poster_path}` 
            let img_URL = `${img_BASE_URL}${img_END_URL}`
            return (
    
            <ListItem onPressIn={() => this.setState({movieid: fastsuggestion[k].id})} onPressOut={() => {
                                this.clearsuggestion()
                                console.log(this.state.movieid, '*************************************')
                                this.props.navigation.navigate('MovieInfo', {
                                movieid: this.state.movieid,
                                screen: 'Screen1'
                              });
                            }} delayPressOut={200} thumbnail>
              <Left>
                <Thumbnail square source={{ uri: `${img_URL}` }} />
              </Left>
              <Body>
                <Text>{fastsuggestion[k].title}</Text>
              </Body>
              <Right>
                
                  <Text>{fastsuggestion[k].release_date}</Text>
              
              </Right>
            </ListItem>
             )
        })}
          </List>
        </Content>
      </Container>
        </Content>

      </Container>
      
    );
  }
}

export default SearchMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 

