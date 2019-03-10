import React, {Component} from 'react';

import Hoc from '../components/hoc';
import Container from '../components/channelListContainer';
import Item from '../components/channelListItem';

class Channel extends Component {
   constructor(props) {
      super(props);
      this.state = {
         channels: [],
      }
      console.log('state', this.state);
   }
   componentDidMount() {
      fetch(`http://localhost:3001/channel-details/${window.location.pathname.split("/")[2]}`)
         .then(response  => response.json())
         .then(response => {
            console.log('clicked', response);
            this.setState({
               channels: response,
               // loading: state.loading ? false : false
         });
      });
   }

   render() {
      return(
         <Hoc>
            <div className="App">
               <Container>
                  { 
                     this.state.channels.map(channel => (
                     <Item 
                        key={channel._id}
                        ChannelName={channel.ChannelName}
                        Rank={channel.Rank}
                        Subscribers={channel.Subscribers}
                        VideoViews={channel.VideoViews} 
                        id={channel._id}
                        showDetails={false}/>
                     ))
                  }
               </Container>
            </div>
         </Hoc>
      )
   }
}

export default Channel;