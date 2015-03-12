# suzuri-js
JavaScript wrapper for SUZURI API

## Install

```sh
$ npm install suzuri --save
```

## Usage

First, request SUZURI API Key from [SUZURI Developer Center](https://suzuri.jp/developer/).

```javascript
var Suzuri = require('suzuri');

var client = new Suzuri('suzuriapikey1234567890');

client.users.getSelf().then(function(data) {
    console.log(data.user);
});
```

## TODO

* Write more tests
