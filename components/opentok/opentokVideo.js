/*global OT:false*/
import React, {Component} from 'react';

class OpentokVideo extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._initOT();
    }

    _initOT() {
        var sessionId = this.props.sessionId;
        var token = this.props.token;
        var apiKey = this.props.apiKey;
        var session = OT.initSession(apiKey, sessionId);

        switch(this.props.type) {
            case 'publish':
                this.publish(session, token);
                break;
            case 'subscribe':
                this.subscribe(session, token);
                break;
            default:
                console.error(this.props.type,
                    ' is an unknown opentok action type. Must be either publish or subscribe.');
        }
    }

    publish(session, token) {
        var publisherVideo = document.querySelector('#publisher-video'),
        mockPublisherEl = document.createElement('div'),
        publisher = OT.initPublisher(mockPublisherEl, function(err) {
            if (!err) {
                // Let's put the publisher into my own custom video element
                var pubVid = mockPublisherEl.querySelector('video');
                publisherVideo.src = pubVid.src;
                if (pubVid.mozSrcObject !== void 0) {
                    publisherVideo.mozSrcObject = pubVid.mozSrcObject;
                }
                publisherVideo.play();
            }
        });

        // connect and publish to opentok session
        session.connect(token, function(err) {
            if (!err) {
                session.publish(publisher);
            }
        });
    }

    subscribe(session, token) {

        // connect to opentok session
        session.connect(token, function(err) {
            if (err) {
                console.error('unable to connect to opentok session.');
            }
        });

        session.on({
            streamCreated: function(event) {
                var mockSubEl = document.createElement('div');
                session.subscribe(event.stream, mockSubEl, function(err) {
                    if (!err) {
                        // Create a new video element and put it in the DOM
                        var subVid = mockSubEl.querySelector('video'),
                        subscriberVideo = document.createElement('video');
                        subscriberVideo.setAttribute('id', event.stream.id);
                        var vidContainer = document.getElementById('opentok-container');
                        vidContainer.appendChild(subscriberVideo);

                        // Set the src of our video element
                        if (subVid.mozSrcObject !== void 0) {
                            // Firefox
                            subscriberVideo.mozSrcObject = subVid.mozSrcObject;
                        } else {
                            // Chrome
                            subscriberVideo.src = subVid.src;
                        }
                        subscriberVideo.play();
                    }
                });
            },
            streamDestroyed: function(event) {
                // Clean up video element
                console.log('streamDestroyed');
                var vidContainer = document.getElementById('opentok-container');
                var subscriberVideo = document.getElementById(event.stream.id);
                vidContainer.removeChild(subscriberVideo);
            }
        });
    }

    render() {
        var pubVid;
        if (this.props.type === 'publish') {
            pubVid = <video id="publisher-video"></video>;
        }

        return (
            <div>
                <h1>Yeah</h1>
                <div id="opentok-container">
                    {pubVid}
                </div>
            </div>
        );
    }
}

export default OpentokVideo;
