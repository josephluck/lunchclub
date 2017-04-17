import firebase from 'firebase'

require('firebase/auth')
require('firebase/database')

firebase.initializeApp({
  apiKey: 'AIzaSyAS5WO9L-1ViaPPJqTauQvyKMDxQUsDtnY',
  authDomain: 'lunchclub-ade38.firebaseapp.com',
  databaseURL: 'https://lunchclub-ade38.firebaseio.com',
  projectId: 'lunchclub-ade38',
  storageBucket: 'lunchclub-ade38.appspot.com',
  messagingSenderId: '1025266352385',
})

export default firebase
