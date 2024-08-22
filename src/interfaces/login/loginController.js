const { badRequest, notFound } = require("../../lib/errorResponses.js");
const jwt = require("../../lib/jwt.js");
const loginSchema = require("./loginSchema.js");

module.exports.login = async (req, res, _next) => {
  const body = JSON.parse(req.body);
  const { value, error } = loginSchema.validate(body);

  if (error) {
    return badRequest({ res, joiError: error });
  }

  /**
   * code to consult zetta api=>login to consult any informations
   * in this code, validations are necessary
   *
   * https://auth.zettabrasil.com.br/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=https://YOUR_APP/callback&state=STATE
   *
   *
   * | `response_type` | (required) Denotes the kind of credential that ZettaAuth will return (`code` or `token`). For this flow, the value must be `code`. |
   * | `client_id`     | (required) Your application's Client ID. |
   * | `redirect_uri`  | (required) The URL to which ZettaAuth will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. |
   * | `state`         | (recommended) An opaque arbitrary alphanumeric string your app adds to the initial request that Auth0 includes when redirecting back to your application. |
   *
   * ## Authentication API

Here we will demonstrate how to use the ZettaAuth authentication APIs.

### Authorization Code Flow

To begin the flow, you'll need to get the user's authorization. To authorize the
user, your app must send the user to the authorization URL.

```
https://auth.zettabrasil.com.br/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=https://YOUR_APP/callback&state=STATE
```

### Parameters

<!-- deno-fmt-ignore-start -->

| Parameter Name  | Description |
| --------------- | ----------- |
| `response_type` | (required) Denotes the kind of credential that ZettaAuth will return (`code` or `token`). For this flow, the value must be `code`. |
| `client_id`     | (required) Your application's Client ID. |
| `redirect_uri`  | (required) The URL to which ZettaAuth will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. |
| `state`         | (recommended) An opaque arbitrary alphanumeric string your app adds to the initial request that Auth0 includes when redirecting back to your application. |

<!-- deno-fmt-ignore-end -->

### Response

If all goes well, you'll receive an `HTTP 302` response. The authorization code
is included at the end of the URL:

```
HTTP/1.1 302 Found
Location: https://YOUR_APP/callback?code=AUTHORIZATION_CODE&state=xyzABC123
```

### Request tokens

Now that you have an Authorization Code, you must exchange it for tokens. Using
the extracted Authorization Code (`code`) = require(the previous step, you will need
to `POST` to the token URL.

```js
const request = new Request("https://auth.zettabrasil.com.br/api/oauth/token", {
  method: "post",
  headers: new Headers({
    "content-type": "application/json",
  }),
  body: JSON.stringify({
    "client_id": YOUR_CLIENT_ID,
    "client_secret": YOUR_CLIENT_SECRET,
    "code": YOUR_AUTHORIZATION_CODE,
    "grant_type": "authorization_code",
    "redirect_uri": "https://YOUR_APP/callback",
  }),
});
const response = await fetch(request);
```

### Parameters

<!-- deno-fmt-ignore-start -->

| Parameter Name  | Description |
| --------------- | ----------- |
| `grant_type`    | Set this to `authorization_code`. |
| `code`          | The `authorization_code` retrieved in the previous step of this tutorial. |
| `client_id`     | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. |
| `redirect_uri`  | The valid callback URL set in your Application settings. This must exactly match the `redirect_uri` passed to the authorization URL in the previous step of this tutorial. Note that this must be URL encoded. |

<!-- deno-fmt-ignore-end -->

### Response

```json
{
  "access_token": "eyJz93a...k4laUWw",
  "expires_in": 21600,
  "refresh_token": "1d5c1f2d...7fcfee94",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "bearer"
}
```
   *
   */

  const loginFail = await _localLoginValidate(value, res)
  if (loginFail) {
    return loginFail;
  }

  const payloadToTokenize = {
    access: "client",
    ...value,
  };

  const token = jwt.signToken(payloadToTokenize);

  return res.send({ message: "login successfully", token });
};

const _localLoginValidate = (body, res) => {
  if (body.username !== "admin@admin.com") {
    return notFound({ message: "user not found", res });
  }

  if (body.password !== "admin") {
    return notFound({ message: "password incorrect", res });
  }

  return false;
};
