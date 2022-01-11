import { FetchObject, GameObject } from "../types"
import axios from 'axios'

const fetchMatchHistory = async (cursorUrl: string): Promise<FetchObject> => {
  const response = await axios.get(cursorUrl)

  const cursor: string = response.data.cursor
  const data: Array<GameObject> = response.data.data

  return { cursor, data }
}

export default fetchMatchHistory