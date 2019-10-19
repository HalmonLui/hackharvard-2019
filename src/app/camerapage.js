import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

import styles from "./styles";

export default class CameraPage extends React.Component {
  camera = null;

  state = {
    hasCameraPermission: null
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission =
      camera.status === "granted" && audio.status === "granted";

    this.setState({ hasCameraPermission });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <View>
        <Text style={styles.title}>アニメCam</Text>
        <Camera style={styles.preview} ref={camera => (this.camera = camera)} />
        <View style={styles.cameraContainer}></View>
        <TouchableOpacity style={styles.button}>
          <Text>Find Anime</Text>
        </TouchableOpacity>
        <Text style={styles.info}>{this.state.status}</Text>
        <Text style={styles.info}>Anime: {this.state.anime}</Text>
        <Text style={styles.info}>Episode: {this.state.episode}</Text>
        <Text style={styles.info}>Time: {this.state.time}</Text>
        <Text style={styles.info}>Confidence: {this.state.confidence}</Text>
      </View>
    );
  }
}
