# NOTE: Please follow [this Opentok forum post](https://support.tokbox.com/hc/en-us/community/posts/205548756-How-to-use-OpenTok-with-React-) for changes not reflected in this repo

# Opentok React
## A basic react js component for Opentok webRTC.

This wraps the opentok client-side js library into a React component (with ES6-style syntax), based on [suggestions made in the Tokbox forum](https://forums.tokbox.com/discussion-and-questions/tokbox-react-js-flux-t47278). Very basic functionality at this point and I am new to React, so please feel free to provide corrections, suggestions, PRs, etc...

##### 1. Add opentok.min.js to your html, above where your react js bundle is included:

```html
<script src="https://static.opentok.com/v2/js/opentok.min.js"></script>
```

Set your API key, session ID, and tokens in `components/constants/opentokSettings.js`.  You can create a test session and tokens from the Opentok dashboard. (For creating sessions and tokens dynamically, you'll need to create a server-side session and token creation API using one of the Opentok server SDKs, which is beyond the scope of this example).

##### 2. Publishing a video/audio stream

Create a component, e.g. `ChatPublisher`:

```javascript
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

##### 3. Subscribing to streams

Create another component, e.g. `ChatSubscriber`:

```javascript
import React, {Component} from 'react';
import OpentokVideo from '../opentok/opentok';
import OpentokSettings from '../constants/opentokSettings';

class ChatSubscriber extends Component {
    render() {
        return (
            <div>
                <h1>Published videos in this Session</h1>
                <OpentokVideo
                     type='subscribe'
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

The only difference between the two is the token used (subscriber-specific token for subscribing) and the `type` prop setting.  You could thus build a much more DRY component.
