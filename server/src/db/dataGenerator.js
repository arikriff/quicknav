import { parse } from 'csv-parse'
import { importGtfs } from 'gtfs';

const config = {
  sqlitePath: './gtfs',
  agencies: [
    {
      url: '../../../../gtfs',
      exclude: ['shapes'],
    },
  ],
};

importGtfs(config)
  .then(() => {
    console.log('Import Successful');
  })
  .catch((err) => {
    console.error(err);
  });'