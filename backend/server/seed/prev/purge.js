const {app} = require('./../server')
const {mongoose} = require('./../db/mongoose')
const {Niveau} = require('./../models/niveau')
const {Manifestation} = require('./../models/manifestation')
const {Danse} = require('./../models/danse')
const {Revision} = require('./../models/revision')

purgeNiveaux = () => {
  Niveau.deleteMany({}).then(() => {
    console.log("Niveaux have been purged")
  }).catch(e => console.log(e))

purgeManifestations = () => {
  Manifestation.deleteMany({}).then(() => {
    console.log("Manifestations have been purged")
  }).catch(e => console.log(e))

purgeRevisions = () => {
  revision.deleteMany({}).then(() => {
    console.log("Revisions have been purged")
  }).catch(e => console.log(e))

purgeDanses = () => {
  danse.deleteMany({}).then(() => {
    console.log("Danses have been purged")
  }).catch(e => console.log(e))

purgeNiveaux()
purgeManifestations()
purgeRevisions()
purgeDanses()
