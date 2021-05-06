const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost/first_test_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Connection Successful...");
    })
    .catch((err) => {
        console.log(err);
    });

const playlistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        // lowercase: true
        uppercase: true,
        trim: true,
        minLength: [2, "Name should be 2 or more characters"],
        maxLength: [10, "Name should be 10 or less characters"]
    },
    type: {
        type: String,
        enum: ["Front End", "Back End", "DataBase"]
    },
    videos: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Video must be greater than zero.");
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address");
            }
        }
    },
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
});

const Playlist = mongoose.model('first_test_collection', playlistSchema);

const createDocument = async() => {
    try {
        // const ourPlaylist1 = new Playlist({
        //     name: 'Angular JS',
        //     type: 'Front End',
        //     videos: 41,
        //     active: true
        // });

        // const ourPlaylist2 = new Playlist({
        //     name: 'Node JS',
        //     type: 'Back End',
        //     videos: 39,
        //     active: true
        // });

        // const ourPlaylist3 = new Playlist({
        //     name: 'MongoDB',
        //     type: 'DataBase',
        //     videos: 26,
        //     active: true
        // });

        const ourPlaylist1 = new Playlist({
            name: '                 JavaScript                  ',
            type: 'Front End',
            videos: 10,
            email: 'jig@gh.com',
            active: true
        });

        // const result = await Playlist.insertMany([ourPlaylist1, ourPlaylist2, ourPlaylist3]);
        const result = await Playlist.insertMany([ourPlaylist1]);

        console.log(result);

    } catch (err) {
        console.log(err);
    }
}

createDocument();

const getDocument = async() => {
    try {
        // const result = await Playlist.find();
        const result = await Playlist.find({ type: 'Front End' }).select({ _id: 0, name: 1 }).limit(1).skip(1);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};
// getDocument();

const comparisonDocument = async() => {
    try {
        // const result = await Playlist.find();
        // const result = await Playlist.find({ 'videos': { $eq: 26 } }).select({ _id: 0, name: 1 });       // equal to
        // const result = await Playlist.find({ 'videos': { $ne: 26 } }).select({ _id: 0, name: 1 });       // not equal to  
        // const result = await Playlist.find({ 'videos': { $gt: 41 } }).select({ _id: 0, name: 1 });       // greater than
        // const result = await Playlist.find({ 'videos': { $gte: 41 } }).select({ _id: 0, name: 1 });      // greater than or equal to
        // const result = await Playlist.find({ 'videos': { $lt: 41 } }).select({ _id: 0, name: 1 });       // less than
        // const result = await Playlist.find({ 'videos': { $lte: 41 } }).select({ _id: 0, name: 1 });      // less than or equal to   
        // const result = await Playlist.find({ 'type': { $in: ['Back End', 'DataBase'] } }).select({ _id: 0, name: 1 });      // in array
        // const result = await Playlist.find({ 'type': { $nin: ['Back End', 'DataBase'] } }).select({ _id: 0, name: 1 });     // not in array

        console.log(result);
    } catch (err) {
        console.log(err);
    }
};
// comparisonDocument();

const logicalDocument = async() => {
    try {
        // const result = await Playlist.find();
        // const result = await Playlist.find({ $and: [{ type: 'Front End' }, { videos: { $gt: 50 } }] }).select({ _id: 0, name: 1 });
        // const result = await Playlist.find({ $or: [{ type: 'Front End' }, { active: true }] }).select({ _id: 0, name: 1 });
        // const result = await Playlist.find({ videos: { $not: { $gt: 41 } } }).select({ _id: 0, name: 1 });
        // const result = await Playlist.find({ $nor: [{ type: 'Back End' }, { active: true }] }).select({ _id: 0, name: 1 });

        console.log(result);
    } catch (err) {
        console.log(err);
    }
};
// logicalDocument();

const count_sort_Document = async() => {
    try {
        // const result = await Playlist.find();
        // const result = await Playlist.find({ $and: [{ type: 'Front End' }, { videos: { $gt: 50 } }] }).select({ _id: 0, name: 1 }).countDocuments();
        // const result = await Playlist.find().select({ _id: 0, name: 1 }).sort({ name: 1 })
        const result = await Playlist.find().select({ _id: 0, name: 1 }).sort({ name: -1 })

        console.log(result);
    } catch (err) {
        console.log(err);
    }
};
// count_sort_Document();

const updateDocument = async(_id) => {
    try {
        // const result = await Playlist.updateOne({ _id }, { $set: { name: 'Mongo DB' } });
        // const result = await Playlist.updateMany({ _id }, { $set: { name: 'Mongo_DB' } });
        const result = await Playlist.findByIdAndUpdate({ _id }, { $set: { name: 'MongoDB' } }, { new: true });

        console.log(result);
    } catch (err) {
        console.log(err);
    }
};
// updateDocument('607c41e5c2c0e2273cc5851a');

const deleteDocument = async(_id) => {
    try {
        // const result = await Playlist.deleteOne({ _id }, { $set: { name: 'Mongo DB' } });
        // const result = await Playlist.deleteMany({ _id }, { $set: { name: 'Mongo_DB' } });
        const result = await Playlist.findByIdAndDelete({ _id });

        console.log(result);
    } catch (err) {
        console.log(err);
    }
};
// deleteDocument('607c41e5c2c0e2273cc5851a');