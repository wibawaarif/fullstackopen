const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const url = `mongodb+srv://arif-fullstackopen:${process.argv[2]}@cluster0.bblhuoo.mongodb.net/test`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const insertData = async (name, number) => {
  const person = new Person({ name, number });
  await person.save();
  console.log(`added ${name} number ${number} to phonebook`);
  mongoose.connection.close()
};

const fetchAllData = async () => {
  const people = await Person.find();
  console.log('phonebook:');
  people.map(x => console.log(`${x.name} ${x.number}`))
  mongoose.connection.close()
};

if (process.argv.length === 3 ) {
  fetchAllData()
} else {
  insertData(process.argv[3], process.argv[4]);
}
