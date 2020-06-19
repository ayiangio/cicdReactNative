import React from 'react';
import {
    View,
    Button,
} from 'react-native';

import RNBambuserBroadcaster from 'react-native-bambuser-broadcaster';

class Broadcaster extends React.Component {

    constructor(props) {
        super(props);

        this.applicationId = 'DKnr7Khl40G4kCprIRpRRw';
        this.state = {
            isCameraReady: false,
            isBroadcastStart: false,
            isRunStream: false,
            broadcastId: null
        }
    }

    render = () => {
        return (
            <View style={{
                flex: 1,
            }}>
                <RNBambuserBroadcaster
                    style={{ flex: 1 }}
                    applicationId={this.applicationId}
                    ref={ref => { this.myBroadcasterRef = ref; }}
                    onBroadcastStarted={() => {
                        console.log('Started');
                        this.setState({
                            isRunStream: true
                        })
                    }}
                    onBroadcastIdReceived={(broadcastId) => {
                        console.log('Received broadcast id', broadcastId);
                        this.setState({
                            broadcastId: broadcastId
                        })
                    }}
                    onBroadcastError={(errorCode, errorMessage) => {
                        console.log('Error with code ' + errorCode, errorMessage);
                    }}
                    onStartBroadcastNotReady={() => {
                        console.log('Broadcast not ready yet')
                    }}
                    onCameraReady={(hasZoom, hasTorch, canSwitchCamera) => {
                        console.log('Camera is ready')
                        this.setState({
                            isCameraReady: true
                        })
                    }}
                    onBroadcastStopped={() => {
                        console.log('Broadcast stopped')
                        this.setState({
                            isRunStream: false,
                            isBroadcastStart: false,
                            broadcastId: null
                        })
                    }}
                />

                <View
                    style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        bottom: 50
                    }}
                >
                    {
                        !this.state.isBroadcastStart ?
                            <Button
                                title={'Start Broadcast'}
                                disabled={!this.state.isCameraReady}
                                onPress={() => {
                                    this.myBroadcasterRef.startBroadcast();
                                    this.setState({
                                        isBroadcastStart: true
                                    });
                                }}
                            /> :
                            <View style={{
                                flex: 1,
                                flexDirection: 'column'
                            }}>
                                <Button
                                    title={'Finish Broadcast'}
                                    disabled={!this.state.isRunStream}
                                    onPress={() => {
                                        this.myBroadcasterRef.stopBroadcast();
                                    }}
                                />
                                <View style={{ marginTop: 10 }}>
                                    <Button
                                        title={this.state.broadcastId == null ? 'Loading Broadcast ID' : this.state.broadcastId}
                                        onPress={() => {
                                            alert(this.state.broadcastId);
                                        }}
                                    />
                                </View>
                            </View>
                    }
                </View>
            </View>
        )
    }
}

export default Broadcaster;