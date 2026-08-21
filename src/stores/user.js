import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
    state: () => {
        const userData = localStorage.getItem('userData')

        if (userData) {
            try {
                return JSON.parse(userData)
            } catch {
                localStorage.removeItem('userData')
            }
        }

        return {
            email: '',
            username: '',
        }
    },
    actions: {
        setUser(payload) {
            this.email = payload.email
            this.username = payload.username
            localStorage.setItem('userData', JSON.stringify({
                email: this.email,
                username: this.username,
            }))
        },
        logout() {
            this.email = ''
            this.username = ''
            localStorage.removeItem('userData')
        }
    },
})