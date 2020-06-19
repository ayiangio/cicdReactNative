import React from 'react';
import {
  View,
  Button
} from 'react-native';

export default class Home extends React.Component {
    render = () => {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 20
              }}>
                <View>
                  <Button
                    title={"Enter as Broadcaster"}
                    onPress={() => {
                      this.props.navigation.navigate('Broadcaster')
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10
                  }}
                >
                  <Button
                    title={"Enter as Viewer"}
                    onPress={() => {
                      this.props.navigation.navigate('Viewer')
                    }}
                  />
                </View>
              </View>
        )
    }
}