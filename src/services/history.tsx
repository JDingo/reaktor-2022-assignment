import { FetchObject, GameObject } from "../types";
import axios from 'axios';

const baseUrl = 'https://jdingo-reaktor-proxy.herokuapp.com';

export const fetchMatchPage = async (cursorUrl: string): Promise<FetchObject> => {
  const response = await axios.get<FetchObject>(process.env.NODE_ENV === 'development' ? cursorUrl : baseUrl + cursorUrl);

  const cursor: string = response.data.cursor;
  const data: Array<GameObject> = response.data.data;

  return { cursor, data };
};