import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

import styles from "./styles";

export default class CameraPage extends React.Component {
  camera = null;

  state = {
    hasCameraPermission: null,
    status: null,
    anime: null,
    episode: null,
    time: null,
    confidence: null,
    photo: null
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission =
      camera.status === "granted" && audio.status === "granted";

    this.setState({ hasCameraPermission });
  }

  snap = async () => {
    if (this.camera) {
      this.setState({ status: "Taking photo..." });
      let photo = await this.camera.takePictureAsync(
        (options = { quality: 0.9, base64: true })
      );

      this.setState({ status: "Saving photo...", photo: photo });

      //console.log(photo.base64);
      let formData = new FormData();
      formData.append("image", photo.base64);
      formData.append("type", "base64");

      this.setState({ status: "Uploading photo..." });
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: "Client-ID 975dcffbf8a2e52" // add your Imgur App ID here
        },
        body: formData
      });

      let response_body = await response.json(); // get the response body
      console.log("GOT StuFF");
      console.log(response_body.data.link);
      this.getAnime(response_body.data.link);
    }
  };

  async getAnime(link) {
    this.setState({ status: "Analyzing photo..." });
    getlink = "http://127.0.0.1:5000/anime/" + link;
    console.log("The link is: " + getlink);
    const response = await fetch(
      "https://trace.moe/api/search?url=" + link
    ).catch(function(error) {
      console.log("Fetch error!!!!!" + error.message);
    });
    console.log("got link");
    let response_body = await response.json().catch(function(error) {
      console.log("Error getting response body!" + error.message);
    }); //get response body
    let confidence =
      String(Math.round(response_body.docs[0].similarity * 100 * 10) / 10) +
      "%";
    var minutes = Math.floor(response_body.docs[0].at / 60);
    var seconds = response_body.docs[0].at - minutes * 60;
    var time = String(minutes) + ":" + String(Math.round(seconds * 10) / 10);
    this.setState({
      status: "Analyzed!",
      anime: response_body.docs[0].title_english,
      episode: response_body.docs[0].episode,
      time: time,
      confidence: confidence
    });
    console.log(response_body.docs[0].title_english);
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
        <TouchableOpacity style={styles.button} onPress={this.snap}>
          <Text>Find Anime</Text>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{this.state.status}</Text>
          <Text style={styles.info}>Anime: {this.state.anime}</Text>
          <Text style={styles.info}>Episode: {this.state.episode}</Text>
          <Text style={styles.info}>Time: {this.state.time}</Text>
          <Text style={styles.info}>Confidence: {this.state.confidence}</Text>
        </View>
      </View>
    );
  }
}
