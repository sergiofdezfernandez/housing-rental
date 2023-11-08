import { type AuthError } from '@supabase/supabase-js';
import notification from 'antd/es/notification';
import { RpcError } from '../../../lib/model/domain_definitions';
import { ApiError } from 'next/dist/server/api-utils';

export function handleError(rpcError: RpcError): void {
  notification.error({
    message: rpcError.message,
    description: rpcError.data.message,
  });
}

export function handleAuthError(error: AuthError): void {
  notification.error({ message: error.name, description: error.message });
}

export function handleApiError(error: ApiError): void {
  notification.error({ message: error.name, description: error.message });
}
