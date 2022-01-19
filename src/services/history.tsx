import { FetchObject, GameObject } from "../types";
import axios from 'axios';

export const fetchMatchHistory = async (cursorUrl: string): Promise<FetchObject> => {
  const response = await axios.get<FetchObject>(cursorUrl);

  const cursor: string = response.data.cursor;
  const data: Array<GameObject> = response.data.data;

  return { cursor, data };
};