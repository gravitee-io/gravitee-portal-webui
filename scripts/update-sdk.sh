#!/bin/bash
pushd projects/portal-webclient-sdk

npx @openapitools/openapi-generator-cli generate \
-i ../../../gravitee-management-rest-api/gravitee-rest-api-portal/gravitee-rest-api-portal-rest/src/main/resources/openapi.yaml \
-g typescript-angular \
-o src/lib/ \
-puseSingleRequestParameter=true

popd
