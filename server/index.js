const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'eae5c5fb1e590005bc3115640f6d93ef14a5c3df6a42e51d6bc3425f9a3d91d9';

const futuramaRobotSantaQuotes = ["You've been very naughty. Very naughty indeed!", "Ho, ho, ho. It's time to get jolly on your naughty asses!", "I'm going to shove coal so far up your stocking you'll be coughing up diamonds!"]

function getRandomQuote() {
  const index = Math.floor(Math.random() * futuramaRobotSantaQuotes.length);
  return futuramaRobotSantaQuotes[index];
}

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { name, proof } = req.body;

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You get a pogo stick!");
  }
  else {
    res.send(getRandomQuote());
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
