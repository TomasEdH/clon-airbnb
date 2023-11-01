const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcryptjs');
const UserModel = require('./models/user');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const fs = require('fs');
const path = require('path'); // Importa el módulo path
const multer = require('multer')
const Place = require('./models/place.js'); 
const Booking = require('./models/booking');

//dotenv nos permite cargar las variables de entorno .env en nuestra aplicación
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'poiakdoljakdfh7w2213d';

app.use(cookieParser());
app.use(express.json());
// app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Asegura la correcta ubicación de las imágenes
app.listen(1233);

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URL);


app.get('/test', (req, res) => {
  res.json('test ok ok');
});



app.post('/register', async (req, res) => {
  // Registramos el usuario con los datos requeridos
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(user);
  } catch (error) {
    res.status(422).json(error);
  }
});



app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Validamos que el email del usuario exista
  const user = await UserModel.findOne({ email });
  if (user) {
    const passValid = bcrypt.compareSync(password, user.password);
    if (passValid) {
      // Creamos un token para el usuario usando su id y email para que se agregue a las cookies y retorne un objeto con estas propiedades
      jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (error, token) => {
        if (error) throw error;
        res.cookie('token', token).json(user);
      });
    } else {
      res.status(422).json('password is not valid');
    }
  } else {
    res.json('not found');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, data) => {
      if (error) throw error;
      const { name, email, _id } = await UserModel.findById(data.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});


// Configura la cookie para que expire en el pasado para eliminarla
app.post('/logout', (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  res.json(true);
});



// toda esta parafernalia nos sirve para subir fotos desde url con axios y la libreria fs
app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;

  if (!link) {
    return res.status(400).json({ error: 'URL is required' });
  }
  try {
    const response = await axios.get(link, { responseType: 'stream' });
    const newName = '/photo' + Date.now() + '.jpg'; // Corrige la construcción del nombre de archivo
    const dest = fs.createWriteStream(path.join(__dirname, 'uploads', newName)); // Utiliza path.join

    response.data.pipe(dest);
    // Solo capturamos el nombre nuevo que le dimos
    res.json(newName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image download failed' });
  }
});


const photosMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleware.array('photos ', 50), (req, res) => {

  const uploadedFiles = []
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i]
    const parts = originalname.split('.')
    const extension = parts[parts.length - 1]
    const newPath = path + '.' + extension
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath.replace("uploads\\", '/'))
  }
  res.json(uploadedFiles)
})


app.post('/places', (req, res) => {
  const { token } = req.cookies
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price } = req.body

  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;
    const place = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    })
    console.log(place)
    res.json(place)
  })


})


app.get('/places/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Place.findById(id))
})


app.put('/places', async (req, res) => {
  const { token } = req.cookies
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price
  } = req.body

  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    const place = await Place.findById(id)
    if (error) {
      console.error(error);
      return res.status(401).json({ error: 'Token verification failed' });
    }
    if (userData.id === place.owner.toString()) {
      console.log(place.photos)
      place.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
      })
      place.save()
      res.json('ok')
    }
  });
})

app.get('/places', async (req, res) => {
  res.json(await Place.find())
})

// esta funcion hace la verificacion de los tokens y cookies,
// lo ponemos en una funcion para hacer uso de buenas praticas
function getUserDataFromReq(req){

  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (error, userData) => {
      if(error) throw error
      resolve(userData)
    })

  })
}

app.post('/bookings', async (req, res) => {

  const userData = await getUserDataFromReq(req)
  const {
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phoneNumber,
    price } = req.body

    //una alternativa a async/await
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phoneNumber,
    price
  }).then((data) => {
    res.json(data)
  }).catch((error) => {
    throw error
  })
})

app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req)
    res.json(Booking.find({user: userData.id}))
}) 