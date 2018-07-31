'use strict'

const db = require('../server/db')
const {Dinosaurs} = require('../server/db/models')
const {User} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const dinos = await Promise.all([
    Dinosaurs.create({
      name: 'Barney',
      price: 100,
      description:
        'Barney is a purple and green Tyrannosaurus in stuffed animal likeness, who comes to life through a child\'s imagination. His theme song is "Barney is a Dinosaur," whose tune is based on "Yankee Doodle". Barney often quotes things as being "Super dee-duper". Episodes frequently end with the song "I Love You", sung to the tune of "This Old Man", which happens to be one of Barney\'s favorite songs. Despite being a carnivorous type dinosaur, Barney likes many different foods such as fruits and vegetables, but his main favorite is a peanut butter and jelly sandwich with a glass of milk. He also loves marching bands and parades. He also has a slight northeastern accent.',
      imageUrl:
        'https://lh3.googleusercontent.com/GJW5UjCfgVWlp5uM2YQ_fBZVaG2x5oP45l_JmcjNQ0Xu7rXaWmibwJmDLuve3RSj6ofGBTBI0_8rXfLReoA'
    }),
    Dinosaurs.create({
      name: 'B.J.',
      price: 50,
      description:
        'B.J. is a seven-year-old yellow Protoceratops, B.J. has been on the show since September 27, 1993. He is the older brother of Baby Bop, whom he frequently calls "Sissy", but calls her by her name on rare occasions. He sings the song "B.J.\'s Song" about himself. He wears a red baseball cap and red sneakers. He lost his hat in the episode "Hats Off to B.J.!", and sometimes says things to hide his fears (for example, in the episode "Barney\'s Halloween Party", he was shocked by the paper spiders and after learning they were fake, he said "I knew that, sort of"). Pickles are his favorite food and he has tried them in various ways, such as on pizza.',
      imageUrl:
        'https://statici.behindthevoiceactors.com/behindthevoiceactors/_img/chars/bj-barneys-night-before-christmas-4.12.jpg'
    }),
    Dinosaurs.create({
      name: 'Velociraptor',
      price: 400000000,
      description: "Velociraptor (/vɪˈlɒsɪræptər/; meaning 'swift seizer' in Latin) is a genus of dromaeosaurid theropod dinosaur that lived approximately 75 to 71 million years ago during the later part of the Cretaceous Period. Two species are currently recognized, although others have been assigned in the past. The type species is V. mongoliensis; fossils of this species have been discovered in Mongolia. A second species, V. osmolskae, was named in 2008 for skull material from Inner Mongolia, China.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Velociraptor_Restoration.png/220px-Velociraptor_Restoration.png",
      expirationDate: new Date(Date.now() + 120000)
    }),
    Dinosaurs.create({
      name: 'Baby Bop',
      price: 50,
      description:
        'Baby Bop is a green Triceratops, who was originally two years old, but turned three in "Look at Me, I\'m 3!"". Baby Bop has been on the show since July 29, 1991. She made her debut in the video "Barney in Concert". She wears a pink bow and pink ballet slippers, and carries a yellow security blanket. She sings the song "My Yellow Blankey" to show how much her security blanket means to her. She likes to eat macaroni and cheese and pizza. She is the younger sister of B.J..',
      imageUrl:
        'https://vignette.wikia.nocookie.net/universalstudios/images/e/e7/Baby_Bop_Sprite_HD.png/revision/latest?cb=20170421214542'
    })
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${dinos.length} dinosaurs`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
