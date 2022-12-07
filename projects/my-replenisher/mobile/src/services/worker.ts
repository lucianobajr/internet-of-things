import axios from "axios";

const worker  = axios.create({
  baseURL:"https://worker.luciano-alcantara.workers.dev"
})

export { worker };