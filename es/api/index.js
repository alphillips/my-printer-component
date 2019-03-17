var URL_BASE = process.env.API_HOST || '';

import { get, post, put, del, formPost } from '@react-ag-components/core/lib/api';

export function getRemotePrintTAC() {
  return get('/terms-and-conditions-ui/api/external/v1/termsAndConditions/content/nexdoc-remoteprint');
}