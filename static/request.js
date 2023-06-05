import Cookies from 'js-cookie';
export async function request(path, method, data, header) {
  const { backendUrl } = useRuntimeConfig().public;
  const sessionToken = Cookies.get('sessionToken') || null;
  let config = {
    method: method,
    body: data,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + sessionToken?.value,
    },
    data: data,
  };
  if (header) {
    config.headers = { ...config.headers, ...header };
  }
  console.log(backendUrl + path, config);
  return await useFetch(backendUrl + path, config);
}
