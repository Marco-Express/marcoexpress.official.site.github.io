# Get Started Example Firebase Messaging

- Clone repository

```sh
git clone https://github.com/MicheleDeF/firebase_messaging.git
```
- Edit init.js with your credential firebase 

```sh
var firebaseConfig= 
{ 
  apiKey:"<Api-Key>", 
  authDomain:"<ID-Project>.firebaseapp.com", 
  databaseURL:"https://<ID-Project>.firebaseio.com", 
  projectId:"<ID-Project>", 
  storageBucket:"<ID-Project>.appspot.com", 
  messagingSenderId:"<ID-Sender>", 
  appId:"<App-Id>", 
  measurementId:"<Measurement-ID>" 
};
```
- Edit manifest.json with yuor sender id
```sh
{
  "//_comment1": "Some browsers will use this to enable push notifications.",
  "//_comment2": "It is the same for all projects, this is not your project's sender ID",
  "gcm_sender_id": "<Sender id>"
}
```
- Follow the instructions on how to proceed from [link][help]


 [help]: <https://www.ilblogdiunprogrammatore.it/43645-integrazione-di-firebase-cloud-messaging-fcm-in-un-applicazione-web.html>
