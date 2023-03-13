const asyncHandler = (fn) => async (request, response, next) => {
  try {
    return await Promise.resolve(fn(request, response, next));
  } catch (error) {
    console.log(error);
    response.render('error', { error });
  }
};

export default asyncHandler;
