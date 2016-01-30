# Opentok React
Basic reactjs component for Opentok


Add opentok.min.js to your html, preferably before your react js bundle.

```
  <script src="https://static.opentok.com/v2/js/opentok.min.js"></script>
```


```
import React, {Component} from 'react';
import OpentokVideo from '../opentok/opentok';
import OpentokSettings from '../constants/opentokSettings';

class VenuePage extends Component {
    render() {
        return (
            <div>
                <h1>Venue</h1>
                <OpentokVideo
                     type='publish'
                     apiKey={OpentokSettings.API_KEY}
                     sessionId={OpentokSettings.SESSION_ID}
                     token={OpentokSettings.TOKEN_PUBLISHER}
                     />
            </div>
        );
    }
}

export default VenuePage;
```
