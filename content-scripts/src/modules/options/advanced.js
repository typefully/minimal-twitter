import addStyles from "../utilities/addStyles";

// Function to change user edited CSS
export const changeCSSTextEdited = (cssTextEdited) => {
  if (cssTextEdited) addStyles("mt-cssTextEdited", cssTextEdited);
  return;
};
