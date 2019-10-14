const faker = require('faker')
const {ObjectID} = require('mongodb')

const {app} = require('./../server')
const {mongoose} = require('./../db/mongoose')
const {Niveau} = require('./../models/niveau')
const {Manifestation} = require('./../models/manifestation')
const {Danse} = require('./../models/danse')
const {Revision} = require('./../models/revision')

populateNiveaux = () => {
  Niveau.deleteMany({}).then(() => {

    var niveaux = []
    var logoArray = ['fa-baby', 'fa-child', 'fa-male']

    for (var i = 0; i < 3; i++) {
      var niveau = new Niveau({
        _id: new ObjectID(),
        name: faker.name.title(),
        jour: "Mardi",
        heureDebut: "19h00",
        heureFin: "20h00",
        logo: logoArray[i]
      })
      niveaux.push(niveau)
    }

    Niveau.insertMany(niveaux).then((docs) => {
      console.log('Niveaux inserted')
    }).catch(e => console.log(e))
  })
}

populateManifestations = () => {
  Manifestation.deleteMany({}).then(() => {
    var manifestations = []
    for (var i = 0; i < 20; i++) {

      var manif = new Manifestation({
        name: faker.name.title(),
        doneAt: faker.date.future(),
        city: faker.address.city(),
        domicile: false,
        zipcode: faker.address.zipCode(),
        club: faker.name.title(),
        description: faker.lorem.paragraph(),
        pdf: faker.image.imageUrl()
      })
      manifestations.push(manif)
    }
    for (var i = 0; i < 5; i++) {

      var manif = new Manifestation({
        name: faker.name.title(),
        doneAt: faker.date.future(),
        city: faker.address.city(),
        domicile: true,
        zipcode: faker.address.zipCode(),
        club: faker.name.title(),
        description: faker.lorem.paragraph(),
        pdf: faker.image.imageUrl()
      })
      manifestations.push(manif)
    }
    Manifestation.insertMany(manifestations).then((docs) => {
      console.log('Manifestations inserted')
    }).catch(e => console.log(e))
  })
}

populateDanses = () => {
  Danse.deleteMany({}).then(() => {
    Niveau.find({}).then(niveaux => {
      niveaux.forEach(niveau => {

        var dansesApprises = []
        for (var i = 0; i < 3; i++){

          var danseApprise = new Danse({
            _id: new ObjectID(),
            name: faker.name.title(),
            teachedAt: faker.date.past(),
            youtube: 'https://www.youtube.com/watch?v=nAYkXB5yoiw',
            pdf: faker.image.imageUrl(),
            revisee: false,
            _niveau: niveau,
            logo: niveau.logo
          })
          niveau._dansesApprises.push(danseApprise._id)
          dansesApprises.push(danseApprise)
        }
        niveau.save()
        Danse.insertMany(dansesApprises).then((dansesApprises) => {

          dansesApprises.forEach(danseApprise => {

            var dansesRevisees = []
            for (var i = 0; i < 3; i++) {
              var danseRevisee = {
                _id: new ObjectID(),
                name: faker.name.title(),
                teachedAt: danseApprise.teachedAt,
                youtube: 'https://www.youtube.com/watch?v=nAYkXB5yoiw',
                revisee: true,
                _niveau: danseApprise._niveau
              }
              danseApprise._dansesRevisees.push(danseRevisee)
              dansesRevisees.push(danseRevisee)
            }
            danseApprise.save()
            // Danse.insertMany(dansesRevisees)
          })
        }).catch(e => console.log(e))
      })
      console.log("Danses inserted")
    })
  })
}

populateRevision = () => {
  Revision.deleteMany({}).then(() => {
    Niveau.find({}).then(niveaux => {

      revisions = []
      logos = niveaux.map(niveau => {
        return {logo: niveau.logo, id: niveau._id}
      })
      for (var i = 0; i < 10; i++) {
        var revision = new Revision({
          _id: new ObjectID(),
          doneAt: faker.date.future(),
          niveaux: niveaux.map(niveau => niveau._id),
          logos
        })
        revisions.push(revision)
      }

      Revision.insertMany(revisions).then((docs) => {
        console.log('Revisions inserted')
    })
    })
  }).catch(e => console.log(e))
}

populateNiveaux()
populateManifestations()
populateDanses()
populateRevision()
