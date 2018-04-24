import { SET_MONUMENTS, SET_PHOTOS } from '../constants/monument';

// const api = (endpoint = 'monuments') => `https://unesco-api.balek.io/api/${endpoint}`;
//const api = (endpoint = 'monuments') => `api/${endpoint}`;
const api = (endpoint = 'monumenti') => `http://localhost:3000/${endpoint}/`;
const req = (url: string, method = 'GET', body?: any) => new Request(url, {
  method,
  headers: new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8'
  }),
  body
});

// const selectedFields = [
//   'id',
//   'latitude',
//   'longitude',
//   'site',
//   'image_url',
//   'category',
//   'states',
//   'date_inscribed'
// ];

//views_gte=10&views_lte=20

const buildMonumentsUrl = (bounds: number[]) => (
//  `${api()}?select=${selectedFields.join(',')}` //tslint:disable-line
  `${api()}?latitude_gte=${bounds[0]}&latitude_lte=${bounds[2]}&longitude_gte=${bounds[1]}&longitude_lte=${bounds[3]}` //tslint:disable-line
);


const setMonuments = (data: any) => ({
  type: SET_MONUMENTS,
  payload: data
});

const setPhotos = (data: any, id: string) => ({
  type: SET_PHOTOS,
  payload: data,
  id
});

export const getMonuments = (bounds : number[]) => (dispatch: any) => (
  fetch(req(buildMonumentsUrl(bounds)))
    .then(res => res.json())
    .then((data) => dispatch(setMonuments(data)))
);

export const fetchMonument = (id: string) => (dispatch: any) => (
  Promise.all([
    fetch(req(`${api()}?id=${id}`)).then(res => res.json()),
    fetch(req(`${api('pictures')}?monument_id=${id}`)).then(res => res.json())
  ]).then(([ monument, photos ]: any) => {
    dispatch(setMonuments(monument));
    dispatch(setPhotos(photos, id));
  })
);
