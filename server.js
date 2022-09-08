const express = require('express');

const app = express();
const PORT = 3000;

// eslint-disable-next-line no-undef
app.use(express.static(`${__dirname}/dist`));

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}!`);
});
