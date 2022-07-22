import axios from "axios";

export const randomImage = async () => {
  try {
    const ressponse = await axios.get(
      "https://dog.ceo/api/breeds/image/random"
    );
    return ressponse.data.message;
  } catch (error) {
    console.log(error);
  }
};
