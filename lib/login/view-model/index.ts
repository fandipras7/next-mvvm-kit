import { useMutation } from "@tanstack/react-query"
import { loginRepository } from "../data/repository";
import { useLoginStore } from "../store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useLogin = () => {
    const {email, password} = useLoginStore()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: () => loginRepository(email, password),
        onSuccess: () => {
            router.push("/")
            toast.success('Welcome to dashboard')
        },
        onError: ((error)=> {
            console.error(error.message, 'cek ini error')
            toast.error(error.message)
            
        })
    })

    return {
        login: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    }
}