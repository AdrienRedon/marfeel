'use strict';

const express = require('express');
const path = require('path');
const app = express();

app.use('/web', express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});