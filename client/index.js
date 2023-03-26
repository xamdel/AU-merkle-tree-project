const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const readline = require("readline");

const serverUrl = "http://localhost:1225";

// Set up node.js builtin readline for getting user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function for getting user input
function getInput() {
  return new Promise((resolve) => {
    rl.question(
      'Enter a name: ',
      (name) => {
        resolve(name);
      }
    );
  });
}

async function main() {
  // TODO: how do we prove to the server we're on the nice list?

  // Create a merkle tree for the nicelist
  const niceListMerkleTree = new MerkleTree(niceList);

  // console.log(`Merkle Root: ${niceListMerkleTree.getRoot()}`);

  // Get name from user
  let name = await getInput();

  // Get index of entered name
  const nameIndex = niceList.indexOf(name);

  // Generate proof and send to server
  const proof = niceListMerkleTree.getProof(nameIndex);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
  });

  console.log(gift);
  process.exit(0);
}

main();
