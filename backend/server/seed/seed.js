const faker = require('faker')
const {
  ObjectID
} = require('mongodb')

const {
  app
} = require('./../server')
const {
  mongoose
} = require('./../db/mongoose')
const etapes = require('./etapes.json')
const equipes = require('./equipes.json')

var {
  Parcours
} = require('./../models/parcours')
var {
  Etape
} = require('./../models/etape')
var {
  Equipe
} = require('./../models/equipe')
var {
  Participant
} = require('./../models/participant')
var {
  Ecole
} = require('./../models/ecole')


ecoles = [{
    name: "ENSIMAG",
    color: "green lighten-1",
  },
  {
    name: "PAGORA",
    color: "orange lighten-2",
  },
  {
    name: "GI",
    color: "blue lighten-3",
  },
  {
    name: "EUCUBE",
    color: "blue darken-3",
  },
  {
    name: "PHELMA",
    color: "red ",
  }
]
parcours = [
  'Parcours 1',
  'Parcours 2',
  'Parcours 3'
]

populateEcoles = () => {
  Ecole.deleteMany({}).then(() => {
    Ecole.insertMany(ecoles).then(ecoles => {
      console.log('Ecoles insterted');
      // callback()
    })
  }).catch(e => console.log(e))
}



// populateEtapes = () => {
//   Etape.deleteMany({}).then(() => {
//     // Parcours.find({}).then(parcours => {
//     for (var i = 0; i < etapes.length; i++) {
//       var etape = Etape({
//         name: etapes[i].name,
//         description: etapes[i].description,
//         code: 'bda',
//         adresse: etapes[i].adresse,
//         indexParcours: etapes[i].index_parcours
//         // parcours: parcours[etapes[i].index_parcours]
//       })
//       etape.save().then().catch(e => console.log(e))
//       // Etape.find({}).then(etapes => {
//       //   for (var i = 0; i < etapes.length; i++) {
//       //     var parc = parcours[etapes[i].index_parcours]
//       //     if (parc.etapes) {
//       //       parc.etapes.push(etapes[i]._id)
//       //     } else {
//       //       parc.etapes = [etapes[i]._id]
//       //     }
//       //     parc.save().then().catch(e => console.log(e))

//       //   }
//       // })
//     }
//     // for (var i = 0; i < parcours.length; i++) {
//     //   parcours[i].save().catch(e => console.log(e))
//     // }
//     console.log('Etapes inserted')
//     // })
//   }).catch(e => console.log(e))
// }
populateParcours = () => {
  options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  // Parcours.deleteMany({}).then(() => {
  // Etape.find({}).then(etapes => {
  for (var i = 0; i < parcours.length; i++) {
    var parc = new Parcours({
      name: parcours[i],
      etapes: [],
      index: i
    })

    for (j = 0; j < etapes.length; j++) {
      if (etapes[j].index_parcours == i) {
        parc.etapes.push({
          name: etapes[j].name,
          description: etapes[j].description,
          code: etapes[j].mdp,
          // code: 'bda',
          adresse: etapes[j].adresse,
        })
      }
    }

    Parcours.findOneAndUpdate({
        name: parcours[i]
      }, {
        name: parc.name,
        index: parc.index,
        etapes: parc.etapes

      },
      options
    ).then().catch(e => console.log(e))
    // parc.save().then().catch(e => console.log(e))
  }
  Parcours.find({}).then(parcours => {
    parcours.sort((a, b) => a.index < b.index)
    for (var i = 0; i < equipes.length; i++) {
      Equipe.findOneAndUpdate({
          name: equipes[i].nomequipe,
        }, {
          name: equipes[i].nomequipe,
          _parcours: parcours[equipes[i].parcours]
        },
        options
      ).then().catch(e => console.log(e))

    }
  })

  // })
  // })
  console.log('Parcours inserted')

}


async function seed() {
  // populateEtapes()
  populateEcoles()
  populateParcours()

}
seed()

// populateEcoles(populateParcours)
// populateParcours(populateEtapes)
// populateEtapes()
// populateEquipes()
// populateParticipants()

// var select = 2
//
// switch (select) {
//   case 0:
//     populateParcours()
//     populateEtapes()
//     break
//   case 1:
//     populateEcoles()
//     populateEquipes()
//     break
//   default:
//     populateParticipants()
// }

// populateParcours = (callback = populateEtapes) => {
//   Parcours.deleteMany({}).then(() => {

//     var parcoursArray = []

//     for (var i = 0; i < 5; i++) {
//       var parcours = new Parcours({
//         _id: new ObjectID(),
//         name: faker.name.title(),
//         _etapes: []
//       })
//       parcoursArray.push(parcours)
//     }

//     Parcours.insertMany(parcoursArray).then((docs) => {
//       console.log('Parcours inserted')
//       callback()
//     }).catch(e => console.log(e))
//   })
// }

// populateEtapes = () => {
//   Etape.deleteMany({}).then(() => {

//     Parcours.find({}).then(parcours => {
//       parcours.forEach(parcours => {



//         var etapes = []
//         for (var i = 0; i < 2; i++) {

//           var etape = new Etape({
//             _id: new ObjectID(),
//             name: faker.name.title(),
//             description: faker.lorem.paragraph(),
//             code: "bda",
//             lieu: faker.company.companyName(),
//             codePromo: faker.lorem.sentence(),

//           })

//           etapes.push(etape)
//         }

//         for (var i = 0; i < 1; i++) {
//           etapes[i].prochaineEtape = etapes[i + 1]._id
//         }
//         parcours._etapes = etapes

//         parcours.save()
//         Etape.insertMany(etapes).then((etapes) => {})
//       })
//       console.log("Etapes inserted")
//       // callback()
//     }).catch(e => console.log(e))
//   })
// }

// populateEquipes = (callback = populateParticipants) => {
//   Equipe.deleteMany({}).then(() => {

//     Parcours.find({}).then(parcours => {
//       parcours.forEach(parcours => {

//         var equipes = []
//         for (var i = 0; i < 5; i++){

//           var equipe = new Equipe({
//             _id: new ObjectID(),
//             name: faker.name.title(),
//             _parcours: parcours
//           })

//           // parcours._equipes.push(equipe._id)
//           equipes.push(equipe)
//         }
//         // parcours._equipeInitiale = equipes[0]._id
//         // equipe
//         // parcours.save()


//         Equipe.insertMany(equipes).then((equipes) => {

//         }).catch(e => console.log(e))
//       })
//       console.log("Equipes inserted")
//       callback()
//     })
//   })
// }

// populateParticipants = () => {

//   Participant.deleteMany({}).then(() => {
//     Equipe.find({}).then(equipes => {
//       // console.log(equipes)
//       Ecole.find({}).then(ecoles => {

//         equipes.forEach(equipe => {

//           var participants = []
//           for (var i = 0; i < 5; i++){

//             var participant = new Participant({
//               _id: new ObjectID(),
//               nom: faker.name.lastName(),
//               prenom: faker.name.firstName(),
//               ecole: ecoles[i],
//               _equipe: equipe._id
//             })
//             equipe._participants.push(participant)
//             participants.push(participant)
//           }
//           equipe.save()
//           Participant.insertMany(participants)
//         })
//         console.log("Participant inserted")

//       })
//       })
//     }).catch(e => console.log(e))
// }