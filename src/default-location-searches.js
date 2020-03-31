import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-melbourne-victoria',
    predictionPlace: {
      address: 'Melbourne, Victoria, Australia',
      bounds: new LatLngBounds(
        new LatLng(-37.5112737225, 145.512528832),
        new LatLng(-38.433859306, 144.593741856)
      ),
    },
  },
  {
    id: 'default-sysney-nsw',
    predictionPlace: {
      address: 'Sydney, New South Wales, Australia',
      bounds: new LatLngBounds(
        new LatLng(-33.578140996, 151.343020992),
        new LatLng(-34.118344992, 150.520928608)
      ),
    },
  },
  {
    id: 'default-brisbane-queensland',
    predictionPlace: {
      address: 'Brisbane, Queensland, Australia',
      bounds: new LatLngBounds(
        new LatLng(-26.996844991, 153.31787024),
        new LatLng(-27.767436998, 152.668522848)
      ),
    },
  },
  {
    id: 'default-canberra-act',
    predictionPlace: {
      address: 'Canberra, Australian Capital Territory, Australia',
      bounds: new LatLngBounds(
        new LatLng(-35.147699163, 149.263643456),
        new LatLng(-35.480260417, 148.9959216)
      ),
    },
  },
  {
    id: 'default-adelaide-sa',
    predictionPlace: {
      address: 'Adelaide, South Australia, Australia',
      bounds: new LatLngBounds(
        new LatLng(-34.652564053, 138.780189824),
        new LatLng(-35.348970061, 138.44212992)
      ),
    },
  },
  {
    id: 'default-perth-wa',
    predictionPlace: {
      address: 'Perth, Western Australia, Australia',
      bounds: new LatLngBounds(
        new LatLng(-31.6244855145, 116.239023008),
        new LatLng(-32.675715325, 115.617614368)
      ),
    },
  },
  {
    id: 'default-darwin-nt',
    predictionPlace: {
      address: 'Darwin, Northern Territory, Australia',
      bounds: new LatLngBounds(
        new LatLng(-12.330059717, 131.05149984),
        new LatLng(-12.521741584, 130.815116992)
      ),
    },
  },
  {
    id: 'default-hobart-tasmania',
    predictionPlace: {
      address: 'Hobart, Tasmania, Australia',
      bounds: new LatLngBounds(
        new LatLng(-42.655375527, 147.613383232),
        new LatLng(-43.014122643, 147.133660416)
      ),
    },
  },
];
