## Logger

- Send logs to Kibana.
- Based on winston logger: https://github.com/winstonjs/winston

Usage: <br>

1. add the following env vars to your code base:

```.dotenv
ES_CLOUD_ID = 
ES_USERNAME = 
ES_PASSWORD = 
ES_INDEX = 
```

2. add the logger:
   <br>

#### JS

```js
const Utils = require('buyme-lib-common-utils').default;

Utils.logger().log('info', {
  message: 'Hello World',
  any_other_property: 'goes here',
});

// OR

Utils.logger().info({
  message: 'Hello World',
  any_other_property: 'goes here',
});
```

#### ES6/TYPESCRIPT

```typescript
import Utils from 'buyme-lib-common-utils';

Utils.logger().info({
  message: 'Hello World',
  any_other_property: 'goes here',
});
```

> Utils.logger() exposes Winston logger in it's core.<br>
> Any functionality available in Winston Logger, should be available after calling this function.
