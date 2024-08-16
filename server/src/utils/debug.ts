export default function debug(message?: any, ...optionalParams: any[]) {
    if (process.env.NODE_ENV === 'development') {
        const now = new Date();
        console.log(
            `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()} - ${message}`, 
            ...optionalParams
        );
    }
}