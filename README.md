# CSE 598: Election Voting Application DAPP using smart contracts

Team Name: CryptoCrew

Member Name:
Sesha Sailendra Devanabanda - sdevanab@asu.edu (1224516800)
Venkata Sai Manoj Pogadadanda - vpogadad@asu.edu (1225606278)
Bhanuteja Talasila - btalasi1@asu.edu (1224606981)
Nikhil Pradeep Sonavane - nsonavan@asu.edu (1225623100)

Video Demo:\*\*
insert link here

## Dependencies

Install these prerequisites to follow along with the tutorial.

- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/

## Step 1. Clone the project

`git clone https://github.com/Plorassi/voting-dapp.git`

## Step 2. Install dependencies

```
$ cd voting-dapp
$ npm install
```

## Step 3. Start Ganache

Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance.

## Step 4. Compile & Deploy Election Smart Contract

`$ truffle migrate --reset`
You must migrate the election smart contract each time your restart ganache.

## Step 5. Configure Metamask

Follow below steps after metamask extention is downloaded

- Unlock Metamask
- Connect metamask to your local Etherum blockchain provided by Ganache (port number is 7545 and chain ID is 1337).
- Import an account provided by ganache.

## Step 6. Run the Front End Application

`$ npm run dev`
Visit this URL in your browser: http://localhost:3000

If you get stuck, please reference the video demo.
