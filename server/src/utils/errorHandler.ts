export function errorHandler(err: any) {
  let statusCode;
  let ErrString = '';
  if (err.code === 11000 && err.keyPattern && err.keyValue) {
    const keyPattern = Object.keys(err.keyPattern)[0];
    const keyValue = err.keyValue[keyPattern];
    return `Duplicate ${keyPattern} '${keyValue}' entered. Please try adding a new one.`;
  }
  if (err.name === 'CastError') {
    return 'Invalid id entered';
  }
  if (err.name === 'ValidationError') {
    statusCode = 400;
    Object.keys(err.errors).forEach((key, i) => {
      ErrString += err.errors[key].message;
      ErrString += ', ';
    });
    let slicedErrorString = ErrString.slice(0, -2);
    return slicedErrorString;
  }
  return err.message;
}
