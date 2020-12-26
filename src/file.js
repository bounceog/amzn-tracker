const stringify = require('csv-stringify');

const csv = (name, data, res, cols = undefined) => {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=\"' + name + '.csv\"');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');

    const opts = { header: true };
    if(typeof cols !== 'undefined') opts.columns = cols;

    stringify(data, opts)
        .pipe(res);
};

module.exports = {
    serveCsv: csv
};