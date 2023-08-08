const url = process.env.NEXT_PUBLIC_URL
const important = process.env.NEXT_PUBLIC_IMPORTANT
export const baseURL = chooseUrl()

function chooseUrl() {
  let baseURL
  if (url == "qa") {
    baseURL = "https://wayfinder-api-qa.cbssports.com"
  }
  else {
    baseURL = "https://wayfinder-api.cbssports.com"
  }
  return baseURL
}