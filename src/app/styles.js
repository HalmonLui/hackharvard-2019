import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  preview: {
    alignSelf: "center",
    height: winHeight,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: 70,
    right: 0,
    bottom: 0
  },
  title: {
    textAlign: "center",
    color: "black",
    fontSize: 50,
    fontWeight: "bold"
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
  infoContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: "lightgray",
    opacity: 0.7
  },
  info: {
    color: "white",
    margin: 5,
    fontSize: 20
  }
});
