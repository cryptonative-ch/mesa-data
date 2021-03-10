# Mesa Data

A repo of tools to create auctions and auction bids on Mesa.

# Installation

## Dependencies

Clone this repo, and install dependencies via NPM

```
npm i
```

## Setup Contract Factories

Contract factories are built from the contracts in `contracts`. Make sure to run `setup` script:

```
$ npm run setup
```

This will compile the contracts, build the artifacts, extract the abis and then create typed contract factories.

## Setup ENV

Create a copy of `.env.sample` named `.env`

```
$ cp .env.sample .env
```

Make sure the first 10 accounts of the mnemonic phrase has 10 ETH each on the network you're deploying the bot to.

## Run the bot

WIP
