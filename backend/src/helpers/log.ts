import 'dotenv/config'
export const log = (msg: any) => {
  if (process.env.NODE_ENV === 'dev') {
    console.log(msg)
  }}
