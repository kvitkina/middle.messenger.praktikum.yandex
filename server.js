const express = require('express');
const history = require('express-history-api-fallback');

const app = express();
const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-undef
app.use(express.static(`${__dirname}/dist`));
app.use(history('dist/index.html', { root: __dirname }));

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}!`);
});
