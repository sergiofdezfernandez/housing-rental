import { type AuthError } from '@supabase/supabase-js';
import notification from 'antd/es/notification';
import { RpcError } from '../../lib/model/domain_definitions';
import { ApiError } from 'next/dist/server/api-utils';

export function handleError(rpcError: RpcError): void {
  notification.error({
    message: rpcError.code,
    description: rpcError.info.error.data.data.reason,
  });
}

export function handleAuthError(error: AuthError): void {
  notification.error({ message: error.name, description: error.message });
}

export function handleApiError(error: ApiError): void {
  notification.error({ message: error.name, description: error.message });
}
