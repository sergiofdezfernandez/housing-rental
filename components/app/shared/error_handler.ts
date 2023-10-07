import notification from "antd/es/notification";

export default function handleError(rpcError: RpcError) {
    notification.error({ message: rpcError.message, description: rpcError.data.message });
}

interface RpcError {
    code: string
    data: {
        code: number
        data: string
        message: string
    }
    message: string
}