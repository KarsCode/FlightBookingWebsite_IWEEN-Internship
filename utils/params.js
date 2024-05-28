export const getUrlParams = (location) => {
    const searchParams = new URLSearchParams(location.search);
    return {
        origin: searchParams.get('origin'),
        destination: searchParams.get('destination'),
        onwarddate: searchParams.get('onwarddate'),
        returndate: searchParams.get('returndate'),
        numadults: searchParams.get('numadults'),
        numchildren: searchParams.get('numchildren'),
        numinfants: searchParams.get('numinfants'),
        prefclass: searchParams.get('prefclass'),
        sessiontoken: searchParams.get('sessiontoken')
    };
};