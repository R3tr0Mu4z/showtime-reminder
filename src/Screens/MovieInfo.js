import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, Title } from 'native-base';

class MovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            screen: '',
            tmdb: {},
            imdb: '',
            omdb: {}
        
        };
        
      }
  componentWillMount() {
    const { navigation } = this.props;
    const movieid = navigation.getParam('movieid', 'NO-ID');
    const screen = navigation.getParam('screen', 'NO-ID');
    const T_MOVIE_BASE_URL = 'https://api.themoviedb.org/3/movie/';
    const T_MOVIE_END_URL = '?api_key=b2302b6aa8d81da12862cec0415e5b25&language=en-US'
    let T_MOVIE_FETCH_URL = `${T_MOVIE_BASE_URL}${movieid}${T_MOVIE_END_URL}`;
    fetch(T_MOVIE_FETCH_URL, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(json => {  
            this.setState({tmdb: json}); 
            this.setState({screen: screen});
            this.setState({imdb: json.imdb_id})
            this.getinfo()
    } 
      
    )
    
      
  }
    getinfo(){
        const O_MOVIE_BASE_URL = 'http://www.omdbapi.com/';
        const O_MOVIE_END_URL = '&apikey=14b03674'
        let O_MOVIE_FETCH_URL = `${O_MOVIE_BASE_URL}?i=${this.state.imdb}${O_MOVIE_END_URL}`;
        fetch(O_MOVIE_FETCH_URL, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => {  
                 this.setState({omdb: json})
                console.log(this.state.omdb, 'THIS IS OMDB')
        }   

    )
}

    componentDidMount() {
        this.componentWillMount()
  } 
      
  render() {    
    return ( 
      <Container>
        <Header style={{paddingTop: 20, height:100}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate(this.state.screen)}> 
              <Icon name='ios-back' />
            </Button>
          </Left>
          <Body>   
            <Title>Details</Title>
            
          </Body>
          <Right />
            <Content>
            
            </Content>
        </Header>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left> 
              
                  <Text>{this.state.tmdb.title}</Text> 
                  <Text note>{this.state.tmdb.release_date}</Text>

              </Left>
            </CardItem>
            <CardItem>
              <Body style={{height: 550}}>  
                <Image source={  
                          {uri: this.state.poster+this.state.tmdb.poster_path}
                      
                      } style={styles.canvas}/>    
                
              </Body>
            </CardItem>
            <CardItem> 
                <Body>
                <Text> 
                 {this.state.tmdb.overview}
                </Text>
                 </Body> 
            </CardItem>
            <CardItem>
            <Left>
            <View style={styles.metaleft}>
              <Image source={
                          {uri: this.state.poster+this.state.tmdb.poster_path}
                      
                      } style={styles.leftimg}/>    
                <Text style={styles.righttext}> 
                 Text
                </Text>
            </View>
            </Left>
            <Right>
              <View style={styles.metaright}>
              <Image source={
                          {uri: this.state.poster+this.state.tmdb.poster_path}
                      
                      } style={styles.rightimg}/>    
                <Text style={styles.righttext}> 
                 Text
                </Text>
            </View>
                
            </Right>
            </CardItem>
            <CardItem>
              
            </CardItem>
            <CardItem>
              
            </CardItem>  
          </Card>
        </Content>
      </Container> 
    );
  }
} 

export default MovieInfo;
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftimg: {
      width: 25,
      height: 25
  },
  rightimg: {
      width: 25,
      height: 25,
      position: 'relative',
      right: 5
  },
  metaleft: {
      flexWrap: 'wrap', 
      alignItems: 'flex-start',
      flexDirection:'row',
      position: 'relative',
      left: 20
  },
    metaright: {
       flexWrap: 'wrap', 
      alignItems: 'flex-start',
      flexDirection:'row',
      position: 'relative',
      right: 50
  },
    canvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }
});  

   