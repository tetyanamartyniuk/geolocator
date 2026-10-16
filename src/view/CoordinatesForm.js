import { Form } from './components/Form.js';

import { COORDINATE_PATTERN, MIN_COORDINATE_DECIMALS } from '../utils/coordinates.js';

const coordinateHint = `Use a dot and at least ${MIN_COORDINATE_DECIMALS} decimal places`;

const coordinateField = (name, label, placeholder) => ({
  name,
  label,
  placeholder,
  pattern: COORDINATE_PATTERN,
  title: coordinateHint,
  required: true,
});

export const CoordinatesForm = ({ onSubmit }) => Form({
  title: 'Current coordinates',
  submitLabel: 'Get my location',
  onSubmit,
  fields: [
    coordinateField('latitude', 'Latitude', '50.4501'),
    coordinateField('longitude', 'Longitude', '30.5234'),
  ],
});

