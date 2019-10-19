import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  preview: {
    alignSelf: "center",
    height: winHeight * 0.5,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: 100,
    right: 0,
    bottom: 100
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    margin: 10,
    padding: 20
  },
  cameraContainer: {
    height: winHeight * 0.5
  },
  button: {
    width: winWidth * 0.5,
    backgroundColor: "lightblue",
    color: "white",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  info: {
    margin: 5,
    fontSize: 20
  }
});
