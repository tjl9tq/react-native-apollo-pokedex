import { StyleSheet, View, Text } from "react-native";

const whiteTextTypes = ["poison", "fire", "water", "bug"];

const getBackGroundColors = (type: string) => {
  switch (type) {
    case "flying":
      return ["#bdb9b8", "#3dc7ef"];
    case "ground":
      return ["#ab9842", "#f7de3f"];
    case "grass":
      return ["#9bcc50"];
    case "poison":
      return ["#b97fc9"];
    case "fire":
      return ["#fd7d24"];
    case "water":
      return ["#4592c4"];
    case "bug":
      return ["#729f3f"];
    case "normal":
      return ["#a4acaf"];
    case "fairy":
      return ["#fdb9e9"];
    default:
      return ["#a4acaf"];
  }
};

const TypeBadge = ({ type }: { type: string }) => {
  const backgroundColors = getBackGroundColors(type);

  return (
    <View style={[styles.typeBadge, { backgroundColor: backgroundColors[0] }]}>
      {!!backgroundColors[1] && (
        <View
          style={{
            width: "100%",
            height: "50%",
            backgroundColor: backgroundColors[1],
            position: "absolute",
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          }}
        />
      )}
      <Text
        style={[
          styles.typeText,
          whiteTextTypes.includes(type) && styles.whiteText,
        ]}
      >
        {type}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  typeBadge: {
    maxWidth: 110,
    marginRight: 3,
    textTransform: "none",
    textAlign: "center",
    borderRadius: 5,
  },
  typeText: {
    fontSize: 11,
    lineHeight: 18,
    paddingHorizontal: 18,
    textTransform: "capitalize",
  },
  whiteText: {
    color: "white",
  },
});

export default TypeBadge;
