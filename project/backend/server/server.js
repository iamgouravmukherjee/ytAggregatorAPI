const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

//mongoose promise use global promise
mongoose.Promise = global.Promise;

// express setup
const port = process.env.PORT || 3001;
const app = express()

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
    
}))
//middleware
app.use(bodyParser.json())

//MongoDB setup
mongoose.connect('mongodb+srv://myUser:Nicework67@cluster0-7472x.mongodb.net/ytData?retryWrites=true',{ useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!')
});



//Schema 
let YouTubeChannelSchema = new mongoose.Schema({
    "Rank": String,
    "Grade": String,
    "ChannelName": String,
    "VideoUploads": String,
    "Subscribers": String,
    "VideoViews": String
  });

//Model
let YouTubeChannel = mongoose.model('YouTubeChannel', YouTubeChannelSchema);


app.get('/channel-details/:id', (req,res)=>{
    YouTubeChannel.find({_id:req.params.id})
    .then(doc=>{
         console.log(doc);
         res.send(doc);
    })
    .catch(e=>{
        res.send(e);
    })
});

app.get('/top-yt-channels', (req, res)=>{

    let limit = 10;
    let skip = 0;


    YouTubeChannel.count().then(count=>{
        return YouTubeChannel.find({},null,{ skip: skip,limit: limit})
                .then(docs=>{
                    
                    res.send({data: docs,page:req.params.page,skip:skip,count:count});
            
                })
        })
    .catch(e=>{
        res.send(e)
    })
});

app.get('/top-yt-channels/:page', (req, res)=>{
   
    let page = req.params.page>0? req.params.page-1: 0;
    let limit = 10;
    let skip = limit*page;

    YouTubeChannel.countDocuments().then(count=>{
       if(skip >= count){
           return res.status(404).send('No more data to show')
       }

        return YouTubeChannel.find({},null,{ skip: skip,limit: limit})
                .then(docs=>{
                    
                    res.send({data: docs,page:req.params.page,skip:skip,count:count});
            
                })
        })
    .catch(e=>{
        res.send(e)
    })
});


app.get('/search/:q', (req, res)=>{

    let searchQuery = req.params.q;

    let limit = 10;
    let skip = 0;
   
    YouTubeChannel.find({ChannelName:{$regex: searchQuery, $options:'i'}}).count()
    .then(count=>{
    return YouTubeChannel.find({ChannelName: { $regex: searchQuery, $options: 'i' }},null,{ skip: skip,limit: limit})
        .then(docs=>{
            res.send({data: docs,page:req.params.page,skip:skip,count:count})
        })
    })
    .catch(e=>{
        res.send(e);
    })
})

app.get('/search/:q/:p', (req, res)=>{

    let searchQuery = req.params.q;
    let page = req.params.p>0? req.params.p-1: 0;
    let limit = 10;
    let skip = limit*page;

    YouTubeChannel.find({ChannelName:{$regex: searchQuery, $options:'i'}}).count()
    .then(count=>{
        if(skip >= count){
            return res.status(404).send('No more data to show')
        }
    return YouTubeChannel.find({ChannelName: { $regex: searchQuery, $options: 'i' }},null,{ skip: skip,limit: limit})
        .then(docs=>{
            res.send({data: docs,page:req.params.page,skip:skip,count:count})
        })
    })
    .catch(e=>{
        res.send(e);
    })
})



// app port 
const server = http.createServer(app);
  
server.listen(port, () => {
 console.log(`Server running at ${port}/`);
});