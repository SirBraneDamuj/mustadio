const imageUrlBase = 'https://mustadio-images.s3.amazonaws.com';
const url = (path) => `${imageUrlBase}/${path}`;

export default {
    icons: url('icons'),
    items: url('items'),
    maps: url('maps'),
    units: url('units'),
    zodiac: url('zodiac'),
};