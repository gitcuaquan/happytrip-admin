import { TOKEN_IN_COOKIE } from "~/services/Service"

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie(TOKEN_IN_COOKIE);
    if (!token.value) {
        return navigateTo('/login');
    }
})
