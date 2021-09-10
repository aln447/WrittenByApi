const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.ADDRESS, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
})


// define the country model
const countrySchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
    },
    languange: String,
});

const Country = mongoose.model('Country', countrySchema);


// define the genre mondel
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  }
});
const Genre = mongoose.model('Genre', genreSchema);

// define the storyType model
const storyTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  }
});
const StoryType = mongoose.model('StoryType', storyTypeSchema);

// define the story model
const storySchema = new mongoose.Schema({
  name: {
    type: String,
    max: 255,
    required: true,
  },
  url: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  length: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: Date,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StoryType',
    required: true,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  outClicks: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Story = mongoose.model('Story', storySchema);


const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  birthday: {
    type: Date,
   
  },
  bio: {
    type: String,
    required: false,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
  },
  stories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
  }]
});

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model('User', userSchema);
// define the user model
module.exports = { Country, Genre, StoryType, Story, User };