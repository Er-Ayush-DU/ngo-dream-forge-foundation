## hash generater

`bash`

node -e "
>> const bcrypt = require('bcryptjs');
>> bcrypt.hash('ayush123', 12).then(h => console.log('HASH:', h));
>> "

