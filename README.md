# 1. Set Up For Developer
```bash
git clone git@github.com:Sotatek-MinhNguyen4/bep20-service.git
docker-compose up
## Connect to mysql in docker and run script at /src/models/sql.sql
yarn start:dev
```
# 2. Design Api #
### 2.1. Api Register
#### POST /user/register
ID | param | type | description | example |
--- | --- | --- | --- | --- |
1 | username | string | username | ahihi
2 | password | string | password | ahihi
3 | rePassword | string | confirm password | ahihi
4 | email | string | email address | ahihi@gmail.com
#### Request Example
```bash
curl --location --request POST 'http://localhost:3000/user/register' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=ahihi' \
--data-urlencode 'password=ahihi' \
--data-urlencode 'rePassword=ahihi' \
--data-urlencode 'email=ahihi@gmail.com'
```
#### Success Response
```json
{
  "data": {
    "username": "ahihi",
    "password": "$2b$10$F9JMcQ3HDUyzJXmffxKGluGWS10OLwFUPPT2TKkobYB.9j/lodDwK",
    "email": "ahihi@gmail.com",
    "status": 0,
    "id": 1,
    "created_at": "2022-01-17T06:37:16.000Z",
    "updated_at": "2022-01-17T06:37:16.000Z"
  },
  "metadata": null
}
```

### 2.2. Api Login
#### POST /auth/login
ID | param | type | description | example |
--- | --- | --- | --- | --- |
1 | username | string | username | ahihi
2 | password | string | password | ahihi
#### Request Example
```bash
curl --location --request POST 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=ahihi' \
--data-urlencode 'password=ahihi'
```
#### Success Response
```json
{
    "id": 1,
    "username": "ahihi",
    "email": "ahihi@gmail.com",
    "status": 0,
    "failed_login_count": null,
    "type_confirm": null,
    "confirm_code": null,
    "expire_code": null,
    "created_at": "2022-01-17T06:16:41.000Z",
    "created_by": null,
    "updated_at": "2022-01-17T06:16:41.000Z",
    "updated_by": null,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFoaWhpIiwic3ViIjoxLCJpYXQiOjE2NDI0MjU1NjAsImV4cCI6MTY0MjUxMTk2MH0.pfaS5ZvjXXQjhs28dvVjbcSDtx-hxPdOW_G_zjp-Eb0"
}
```

### 2.3. Api Add Wallet To Account
#### POST /wallet
ID | param | type | description | example |
--- | --- | --- | --- | --- |
1 | signature | string | Owner wallet signature, get from metamask | 
2 | address | string | address of wallet | 0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16
#### Request Example
```bash
curl --location --request POST 'http://localhost:3000/wallet/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFoaWhpIiwic3ViIjoxLCJpYXQiOjE2NDI0MjU3MTMsImV4cCI6MTY0MjUxMjExM30.41aLDm7AxwWV0cVdeUySD5wZCbVCvDLVM4ezf_olX2E' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'signature=0x5b09096e03bb749b28ad4439e775ad176100e4ced3975b65307d70a2d32066ae56ba519e61d0af364077eae36712b80ea1e5ae799cb49503eb9bbe8fefcc6c6f1c' \
--data-urlencode 'address=0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16'
```
#### Success Response
```json
{
  "data": {
    "address": "0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16",
    "user_id": 1,
    "status": 0,
    "id": 1,
    "created_at": "2022-01-17T06:44:46.000Z",
    "updated_at": "2022-01-17T06:44:46.000Z"
  },
  "metadata": null
}
```

### 2.4. Api Add Contract To Wallet
#### POST /wallet/contract
ID | param | type | description | example |
--- | --- | --- | --- | --- |
1 | contract | string | Contract of token | 0x1F58C25FDD999a5e89f0004C0aAA8aC1751E5E50
2 | wallet | string | address of wallet | 0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16
#### Request Example
```bash
curl --location --request POST 'http://localhost:3000/wallet/contract' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFoaWhpIiwic3ViIjo1LCJpYXQiOjE2NDEzMDg3MTUsImV4cCI6MTY0MTMwODc3NX0.mBUmICCJ_Zg9XgjwO96RpY4Oh7P2t0BxVqZXjiuXe-g' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'contract=0x1F58C25FDD999a5e89f0004C0aAA8aC1751E5E50' \
--data-urlencode 'wallet=0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16'
```
#### Success Response
```json
{
  "data": true,
  "metadata": null
}
```

### 2.5. Api Get Balances
#### GET /wallet/balances
ID | param | type | description | example |
--- | --- | --- | --- | --- |
1 | address | string | address of wallet | 0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16
#### Request Example
```bash
curl --location --request GET 'http://localhost:3000/wallet/balances?address=0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFoaWhpIiwic3ViIjoxLCJpYXQiOjE2NDI0MjU3MTMsImV4cCI6MTY0MjUxMjExM30.41aLDm7AxwWV0cVdeUySD5wZCbVCvDLVM4ezf_olX2E'
```
#### Success Response
```json
{
  "data": [
    {
      "contract_address": "0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F",
      "symbol": "bnb",
      "balance": "0.98766078",
      "balance_converted": "472.4672873286"
    },
    {
      "contract_address": "0x1F58C25FDD999a5e89f0004C0aAA8aC1751E5E50",
      "symbol": "USDC",
      "balance": "999",
      "balance_converted": "999"
    }
  ],
  "metadata": null
}
```

### 2.6. Api Get Wallet History
#### GET /wallet/history
ID | param | type | description | example |
--- | --- | --- | --- | --- |
1 | wallet | string | address of wallet | 0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16
#### Request Example
```bash
curl --location --request GET 'http://localhost:3000/wallet/history?wallet=0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFoaWhpIiwic3ViIjoxLCJpYXQiOjE2NDI0MjU3MTMsImV4cCI6MTY0MjUxMjExM30.41aLDm7AxwWV0cVdeUySD5wZCbVCvDLVM4ezf_olX2E'
```
#### Success Response
```json
{
  "data": [
    {
      "id": "1",
      "address": "0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16",
      "blockNumber": "15390679",
      "timeStamp": "1640765702",
      "hash": "0x217ab976e8b6b9948f27f9be91403e9a7d2bdb47ebbcdbad6114790997831d40",
      "nonce": 0,
      "blockHash": "0x0ffb118caa354c8705dea6f006357ce20f9956c72abb2a21d8dd943c55f7537f",
      "from": "0x0000000000000000000000000000000000000000",
      "contractAddress": "0xc89d613cd4c93cf6543f6192158f7667a2e3a1d0",
      "to": "0x38ad43ccf0c2542fd0d95f21c90fa1c74d5c8b16",
      "value": "9223372036854775807",
      "tokenName": "MinhCoin",
      "tokenSymbol": "MC",
      "tokenDecimal": 18,
      "transactionIndex": 1,
      "gas": "1111187",
      "gasPrice": "10000000000",
      "gasUsed": "1111187",
      "cumulativeGasUsed": "1265208",
      "input": "deprecated",
      "confirmations": "552968",
      "created_at": "2022-01-17T06:30:22.000Z"
    },
    {
      "id": "2",
      "address": "0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16",
      "blockNumber": "15392055",
      "timeStamp": "1640769830",
      "hash": "0xba4d8344e45c3029187f4dd0e730019dbee752e8728819f44bbbb2a7f7621849",
      "nonce": 1,
      "blockHash": "0xc0d4daa0d7dd58681dc5ffe0280cab1f7cc31e2caeeca2a6ee17b2b0b81148eb",
      "from": "0x0000000000000000000000000000000000000000",
      "contractAddress": "0x1f58c25fdd999a5e89f0004c0aaa8ac1751e5e50",
      "to": "0x38ad43ccf0c2542fd0d95f21c90fa1c74d5c8b16",
      "value": "1000000000",
      "tokenName": "USDC",
      "tokenSymbol": "USDC",
      "tokenDecimal": 6,
      "transactionIndex": 5,
      "gas": "76032",
      "gasPrice": "10000000000",
      "gasUsed": "50688",
      "cumulativeGasUsed": "660765",
      "input": "deprecated",
      "confirmations": "551592",
      "created_at": "2022-01-17T06:30:22.000Z"
    }
  ],
  "metadata": {
    "page": 1,
    "limit": 10
  }
}
```

### 2.7. Api Delete Wallet From Account
#### DELETE /wallet
ID | param | type | description | example |
--- | --- | --- | --- | --- |
1 | address | string | address of wallet | 0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16
#### Request Example
```bash
curl --location --request DELETE 'http://localhost:3000/wallet/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFoaWhpIiwic3ViIjoxLCJpYXQiOjE2NDI0MjU3MTMsImV4cCI6MTY0MjUxMjExM30.41aLDm7AxwWV0cVdeUySD5wZCbVCvDLVM4ezf_olX2E' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'address=0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16'
```
#### Success Response
```json
{
    "data": {
        "id": 1,
        "address": "0x38AD43cCf0C2542Fd0d95F21c90fA1c74d5C8b16",
        "network": null,
        "user_id": 1,
        "status": 1,
        "created_at": "2022-01-17T06:44:46.000Z",
        "created_by": null,
        "updated_at": "2022-01-17T06:51:22.000Z",
        "updated_by": null
    },
    "metadata": null
}
```

# 3. Cron Job
### 3.1. Cron Job To Crawl Coin From CoinGekCo Support
Just need to run at one time to get rate of all coin to usd that coingecko support
```bash
yarn console:dev crawl-coingecko 
```

### 3.2. Cron Job To Crawl Coin Exchange From CoinGecko
Can set up to time for run, this job get coin that our service support and then call to coingecko to get exchange and save to redis to be used for convert token balance to usd
```bash
yarn console:dev crawl-exchange-coingecko
```

### 3.3. Cron Job To Crawl Wallet History
Can set up to time for run, this job crawl wallet history of all wallet in our service
```bash
yarn console:dev crawl-wallets-history
```