import { AuthApiError, AuthError } from "@supabase/supabase-js";
import notification from "antd/es/notification";

interface RpcError {
    code: string
    data: {
        code: number
        data: string
        message: string
    }
    message: string
}

export function handleError(rpcError: RpcError) {
    notification.error({ message: rpcError.message, description: rpcError.data.message });
}

export function handleSignUpError(error: AuthError) {
    notification.error({ message: error.name, description: error.message })
}

export function handleInsertDataError(error:any){
    notification.error({ message: error.name, description: error.message })
}

