const mongoose = require("mongoose");
const validator = require("validator");

//connection create (if database exist then perfect otherwise create new database)
mongoose
  .connect("mongodb://127.0.0.1:27017/ashish", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection established successfully..!");
  })
  .catch((err) => {
    console.log(err);
  });

//schema
//schema define the structure of the document , default value and validator

const playlistSchema = new mongoose.Schema({
  name: String,
  email: {
   type : String,
   required : true,
   unique : true,
   validate(value) {
     if(!validator.isEmail(value)){
       throw new Error("Please insert Valid Email")
     }
   }
  },
  age: Number,
  bio: String,
  handicap: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Playlist = new mongoose.model("Playlist", playlistSchema);

const createDocument = async () => {
  try {
    const mongoPlaylist = new Playlist({
      name: "Mongo",
      email: "mongo@gmail.com",
      age: 12,
      bio: "database",
      handicap: false,
    });

    const mongoosePlaylist = new Playlist({
      name: "Mongoose",
      email: "mongoose@gmail.com",
      age: 12,
      bio: "database",
      handicap: false,
    });

    const vuePlaylist = new Playlist({
      name: "Vue",
      email: "vue@gmail.com",
      age: 12,
      bio: "For use one page application",
      handicap: false,
    });

    const result = await Playlist.insertMany([
      mongoPlaylist,
      mongoosePlaylist,
      vuePlaylist,
    ]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// createDocument();

const getDocument = async () => {
  try {
    const result = await Playlist.find({ age: { $gt: 5 } });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// getDocument();

const updateDocument = async (_id) => {
  try{
    const result =  await Playlist.updateOne({_id} , {
        $set : {name : "Express Js"}
    })

    console.log(result)
  }catch(err){
    console.log(err)
  }
};

updateDocument("610d0ea78359f22710ab0e21");


const deleteDocument = async (_id) => {
    try{
        const result = await Playlist.deleteOne({_id})

        console.log(result)

    }catch(err){
        console.log(err)
    }
}
// deleteDocument("610d0c194ce6ce285c8ac477")
