const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = '';
  }
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
  getCurrentTime() {
    return new Date().getDay();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createInitialBlock()];
  }
  createInitialBlock(){
    return new Block(0, "01/01/2017", "Initial Block", "0")
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  
  isChainValid() {
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[ i - 1]

      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let sammieCoin = new BlockChain();
sammieCoin.addBlock(new Block(1, "01/20/2018", "Sammie Block", { amount: 4 }))
sammieCoin.addBlock(new Block(2, "11/25/2018", "Sammie The Man", { amount: 10 }))

console.log(JSON.stringify(sammieCoin, null, 4));


// console.log(isChainValid ? )