export default (error: any) => {
    // based on the status code we return the error
    if (error.status === 404)
        return 'Event not found.';
    if(error.status === 422)
        return 'Bad request.';
    if (error.stats === 401)
        return 'Contact the owner to access this resource.'

    return 'An error occurred.'
}
