const Emitter = require('events');

const myemitter= new Emitter()

// // listening
// myemitter.on('somename',(data)=>{
//     console.log(data);

// })


// // define
// myemitter.emit('somename',{
//     name:'sanket',
// })

class Auth extends Emitter{
    register(username){
        console.log('register succssfully');
        this.emit('register',username)
    }
}

const auth =new Auth()


auth.on('register',(data)=>{
    
    console.log(`sending email to ${data}`);
})

auth.register('sanketkothiya');