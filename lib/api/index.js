'use strict';

exports.__esModule = true;
exports.getRemotePrintTAC = getRemotePrintTAC;

var _api = require('@react-ag-components/core/lib/api');

var URL_BASE = process.env.API_HOST || '';

function getRemotePrintTAC() {
  return (0, _api.get)('/terms-and-conditions-ui/api/external/v1/termsAndConditions/content/nexdoc-remoteprint');
}