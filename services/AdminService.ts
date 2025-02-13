import type { User } from "~/model/user";
import { TOKEN_IN_COOKIE } from "./Service";

class AdminService {
    /** API  */
    BASE_URL = 'https://sysdev.happytrip.vn/api/admin';
    /**
     *  Đăng nhập
     * @param phone số đien thoại
     * @param password mật khẩu
     * @returns 
     */
    async login(phone: string, password: string) {
        // khởi tạo route
        const route = useRouter();
        // trả về một promise
        return new Promise<User>((resolve, reject) => {
            $fetch<User>(`${this.BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phone, password })
            })
                .then((data) => {
                    const token = useCookie(TOKEN_IN_COOKIE);
                    token.value = data.accessToken;
                    resolve(data as User);
                    route.push('/');
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    /**
     *  Đăng xuất
     */
    logout() {
        // khởi tạo route
        const route = useRouter();
        // xóa cookie
        const token = useCookie(TOKEN_IN_COOKIE)
        token.value = '';
        // chuyển hướng về trang login
        route.push('/login');
    }
}

export default new AdminService();