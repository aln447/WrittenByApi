const express = require('express');
const { Country, Genre, StoryType, Story, User } = require('./db/mongoose.js');

// command: ..\mongo\mongodb\bin\mongod.exe --dbpath=..\mongo\mongodb-data

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Just the default page, keep lookin\'');
})

app.post('/add-country', (req, res) => {
    const newCountry = new Country(req.body);

    newCountry.save((err, country) => {
        err ? res.status(500).send(err) : res.send(JSON.stringify(country));
    })
})

app.get('/list-countries', async (req, res) => {
    const countries = await Country.find().exec();

    res.json(countries);
});

app.post('/add-genre', (req, res) => {
    const newGenre = new Genre(req.body);

    newGenre.save((err, genre) => {
        err ? res.status(500).send(err) : res.send(JSON.stringify(genre));
    })
})

app.get('/list-genres', async (req, res) => {
    const genres = await Genre.find().exec();

    res.json(genres);
});

app.post('/add-story-type', (req, res) => {
    const newType = new StoryType(req.body);

    newType.save((err, type) => {
        err ? res.status(500).send(err) : res.send(JSON.stringify(type));
    })
})

app.get('/list-story-types', async (req, res) => {
    const types = await StoryType.find().exec();

    res.json(types);
});

app.post('/add-user', (req, res) => {
    const newUser = new User(req.body);

    newUser.save((err, user) => {
        err ? res.status(500).send(JSON.stringify(err)) : res.send(JSON.stringify(user));
    })
})

app.get('/list-users', async (req, res) => {
    const users = await User.find().populate('country').populate('stories', 'username birthday').exec();

    res.json(users);
});

app.post('/add-story', (req, res) => {
    const newStory = new Story(req.body);

    newStory.save((err, story) => {
        err ? res.status(500).send(err) : res.send(JSON.stringify(story));
    })
})

app.get('/list-stories', async (req, res) => {
    const stories = await Story.find().populate('author').populate('genre').populate('type').exec();

    res.json(stories);
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
}) 