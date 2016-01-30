# Opentok React
## A basic react js component for Opentok.

This wraps the opentok client-side js library into a React component (with ES6-style syntax).

#### Add opentok.min.js to your html, above where your react js bundle is included:

```
<script src="https://static.opentok.com/v2/js/opentok.min.js"></script>
```

Set your API key, session ID, and tokens in `components/constants/opentokSettings.js`.  You can create a test session and tokens from the Opentok dashboard. (For creating sessions and tokens dynamically, you'll need to create a server-side session and token creation API using one of the Opentok server SDKs, which is beyond the scope of this example).

#### Publishing a video/audio stream

Create a component, e.g. `ChatPublisher`:

```
import React, {Component} from 'react';
import OpentokVideo from '../opentok/opentok';
import OpentokSettings from '../constants/opentokSettings';

class ChatPublisher extends Component {
    render() {
        return (
            <div>
                <h1>Your Video is published to the session</h1>
                <OpentokVideo
                     type='publish'
                     apiKey={OpentokSettings.API_KEY}
                     sessionId={OpentokSettings.SESSION_ID}
                     token={OpentokSettings.TOKEN_PUB}
                     />
            </div>
        );
    }
}

export default ChatPublisher;
```

#### Subscribing to streams

Create another component, e.g. `ChatSubscriber`:

```
import React, {Component} from 'react';
import OpentokVideo from '../opentok/opentok';
import OpentokSettings from '../constants/opentokSettings';

class ChatSubscriber extends Component {
    render() {
        return (
            <div>
                <h1>Published videos in this Session</h1>
                <OpentokVideo
                     type='publish'
                     apiKey={OpentokSettings.API_KEY}
                     sessionId={OpentokSettings.SESSION_ID}
                     token={OpentokSettings.TOKEN_SUB}
                     />
            </div>
        );
    }
}

export default ChatSubscriber;
```

