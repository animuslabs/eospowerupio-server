// import requests from 'requests'
// const url = "https://discord.com/api/v8/applications/<my_application_id>/commands"

// const json = {
//   "name": "blep",
//   "description": "Send a random adorable animal photo",
//   "options": [
//     {
//       "name": "animal",
//       "description": "The type of animal",
//       "type": 3,
//       "required": True,
//       "choices": [
//         {
//           "name": "Dog",
//           "value": "animal_dog"
//         },
//         {
//           "name": "Cat",
//           "value": "animal_cat"
//         },
//         {
//           "name": "Penguin",
//           "value": "animal_penguin"
//         }
//       ]
//     },
//     {
//       "name": "only_smol",
//       "description": "Whether to show only baby animals",
//       "type": 5,
//       "required": False
//     }
//   ]
// }

// // # For authorization, you can use either your bot token
// const headers = {
//   "Authorization": "Bot 123456"
// }

// // # or a client credentials token for your app with the applications.commands.update scope
// // const headers = {
// //   "Authorization": "Bearer abcdefg"
// // }

// r = requests.post(url, headers = headers, json = json)
