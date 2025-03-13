
export const USER_IN_COOKIE = 'hpt_user';
export const TOKEN_IN_COOKIE = 'hpt_token';


export class Service {
    
    /** 'https://sys.happytrip.vn/api' */
    protected BASE_URL = process.dev ? 'https://sysdev.happytrip.vn/api' : 'https://sys.happytrip.vn/api';
    protected $AuthFetch: typeof $fetch;
    constructor() {

        const token = useCookie(TOKEN_IN_COOKIE);
        this.$AuthFetch = $fetch.create({
            onRequest({ request, options, error }) {
                if (token.value) {
                    // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
                    options.headers.set('Authorization', `Bearer ${token.value}`);
                }
            },
        });
    }

      async uploadImage(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append("category", "document");
        const res = await this.$AuthFetch(`${this.BASE_URL}/upload`, 
            { method: 'POST', body: formData });
        return res;
    }
}