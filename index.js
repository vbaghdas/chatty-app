const app = require('express')();
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth_routes');
const apiRouter = require('./routes/api_routes');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
const PORT = process.env.PORT || 5000;

require('./services/chat');

mongoose.connect(keys.db_connect, {
    useMongoClient: true
});

app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

authRouter(app);
apiRouter(app);

app.listen(PORT, (err) => {
    if(err) return console.log('Error Starting Server');

    console.log('Server running at localhost: ' + PORT)
})