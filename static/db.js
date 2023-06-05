import { request } from './request.js';
import { deepClone } from './util.js';

export const upsert = async function (table, data) {
  data = deepClone(data);
  delete data.state;
  let response = await request(
    '/upsert/' + table,
    'POST',
    JSON.stringify(data)
  );
  console.log(response);
  return response;
};

export const getById = async function (table, id) {
  return await request('/id/' + table + '/' + id, 'GET');
};

export const getByIdProjection = async function (table, id, projection) {
  return await request('/id/' + table + '/' + id + '/' + projection, 'GET');
};

export const deleteById = async function (table, id) {
  return await request('/id/' + table + '/' + id, 'POST');
};

export const getAll = async function (table) {
  return await request('/all/' + table, 'GET');
};
