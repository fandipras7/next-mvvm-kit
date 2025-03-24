import { apiClient } from "@/services/api/apiClient"

export const loginRepository =  async (email: string, password: string) => {
    
    return  await apiClient("/api/login", "POST", {email, password})
}