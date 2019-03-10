import React, { Component } from 'react';

import Hoc from '../components/hoc';
import Container from '../components/channelListContainer';
import Item from '../components/channelListItem';
import Navbar from '../components/navbar';


class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         channels: [],
         searchedChannels: [],
         page: 1,
      }
      console.log('state', this.state);
   }
   componentDidMount() {
         fetch(`http://localhost:3001/top-yt-channels/${this.state.page}`)
         .then(response  => response.json())
         .then(response => {
            console.log(response.data)
            this.setState(state => ({
               channels: response.data,
               searchedChannels: response.data,
               loading: state.loading ? false : false
            }));
         });
      }
      handleInput = (event) => {
         if(event.target.value.length > 3) {
            fetch(`http://localhost:3001/search/${event.target.value}`)
            .then(response  => response.json())
            .then(response => {
               console.log('searched', response.data)
               this.setState(state => ({
                  searchedChannels: response.data
               }));
            });
         } else {
            this.setState(state => ({
               searchedChannels: state.channels
            }));
         }
      }
   render() {
      return(
         <Hoc>
            <div className="App">
            <Navbar input={this.handleInput}/>
            <h6 className="border-bottom border-gray pb-2 mb-3">Top Channels</h6>
            <Container>
               { 
                  this.state.searchedChannels.map(channel => (
                  <Item 
                     key={channel._id}
                     ChannelName={channel.ChannelName}
                     Rank={channel.Rank}
                     Subscribers={channel.Subscribers}
                     VideoViews={channel.VideoViews}
                     id={channel._id} 
                     showDetails={true}/>
                  ))
               }
            </Container>
            </div>
         </Hoc>
      )
   }
}

export default Home;