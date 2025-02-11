export const USER_IN_COOKIE = 'hpt_user';
export const TOKEN_IN_COOKIE = 'hpt_token';


export class Service {
    BASE_URL = 'https://sys.happytrip.vn/api';
    $AuthFetch: typeof $fetch;
    constructor() {
        const token = useCookie(TOKEN_IN_COOKIE);
        this.$AuthFetch = $fetch.create({
            // headers: {
            //     "Access-Control-Allow-Origin": "*",
            //     Authorization: `Bearer ${token.value}`,
            // },
            onRequest({ request, options, error }) {
                if (token.value) {
                    // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
                    options.headers.set('Authorization', `Bearer ${token.value}`);
                }
            },
        });
    }
    
}