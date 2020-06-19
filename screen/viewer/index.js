import React from 'react';
import {
    View,
    Button,
    Text,
    TextInput,
    Dimensions
} from 'react-native';
import RNBambuserPlayer from 'react-native-bambuser-player';
import Axios from 'axios';

export default class Viewer extends React.Component {

    constructor(props) {
        super(props)

        this.applicationId = 'DKnr7Khl40G4kCprIRpRRw';
        this.token = 'WkVaPPfYhofJn4YjYgUPFy';

        this.state = {
            views: 0,
            isPaused: false,
            isStreamStart: false,
            isNotSetBroadcastId: true,
            broadcastId: '',
            broadcastDetail: null
        }
    }

    _getBroadcastDetail = () => {
        Axios.get('https://api.bambuser.com/broadcasts/' + this.state.broadcastId, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.bambuser.v1+json',
            'Authorization': 'Bearer ' + this.token
          }
        }).then((response) => {
          if(response.status == 200) {
            this.setState({
                broadcastDetail: response.data
              });
              console.log(response.data);
          } else {
              this.setState({
                isNotSetBroadcastId: true,
                broadcastId: '',
                broadcastDetail: null
              })
              alert("Error");
          }
        }).catch((err) => {
            this.setState({
                isNotSetBroadcastId: true,
                broadcastId: '',
                broadcastDetail: null
              })
              alert("Error");
        });
      }

    renderPlayer = () => {
        console.log(this.state.broadcastDetail.resourceUri)
        return (
            <View style={{ flex: 1 }}>
                <RNBambuserPlayer
                    style={{ flex: 1 }}
                    applicationId={this.applicationId}
                    ref={ref => { this.myPlayerRef = ref; }}
                    resourceUri={this.state.broadcastDetail.resourceUri}
                    onReady={() => {
                        console.log('Player ready');
                    }}
                    onLoading={() => {
                        console.log('Player loading');
                    }}
                    onPlaybackError={() => {
                        console.log('Playback error')
                    }}
                    onTotalViewerCountUpdate={(total) => {
                        this.setState({
                            views: total
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
                        !this.state.isStreamStart ?
                            <Button
                                title={'Start Streaming'}
                                onPress={() => {
                                    this.myPlayerRef.play();
                                    this.setState({
                                        isStreamStart: true
                                    });
                                }}
                            /> :
                            <View style={{
                                flex: 1,
                                flexDirection: 'row'

                            }}>
                                <Button
                                    title={'Stop Broadcast'}
                                    onPress={() => {
                                        this.myPlayerRef.stop();
                                        this.props.navigation.navigate('Home')
                                    }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Button
                                        title={this.state.views + ' Views'}
                                    />
                                </View>
                            </View>
                    }
                </View>
            </View>
        )
    }

    render = () => {
        return (
            <>
                {
                    this.state.isNotSetBroadcastId ?
                        <View>
                            <View style={{ padding: 10 }}>
                                <TextInput
                                    style={{ height: 40, borderBottomWidth: 1, }}
                                    placeholder={'Insert broadcast id'}
                                    onChangeText={text => {
                                        this.setState({
                                            broadcastId: text
                                        })
                                    }}
                                    value={this.state.broadcastId}
                                />
                                <View style={{ marginTop: 10 }}>
                                    <Button
                                        title={'Join'}
                                        disabled={this.state.broadcastId.length < 1}
                                        onPress={() => {
                                            this.setState({
                                                isNotSetBroadcastId: false
                                            });
                                            this._getBroadcastDetail();
                                        }}
                                    />
                                </View>
                            </View>
                        </View> : this.state.broadcastDetail ? this.renderPlayer() : <Text style={{ alignSelf: 'center' }}>Loading...</Text>
                }
            </>
        );
    }
}