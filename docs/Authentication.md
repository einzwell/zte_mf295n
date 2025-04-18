# ZTE MF295N / Authentication

## Credentials

The router comes with the default password `admin`. No username is required.

When logging in, the password is first hashed with SHA256, concatenated with [`LD`](#ld--rd-tokens), and then hashed with 
SHA256 again:

```javascript
var password_hash = SHA256(SHA256(password) + LD);
```

For ZTE's implementation of SHA256, see [`src/js/util.js`](./../src/js/util.js).

### Authentication

You usually need to provide one of these tokens in order to send `POST` requests to `/goform/goform_set_cmd_process`:

- `LD`
- `RD`
- `AD`

All of these tokens are single-use, meaning you can't reuse them.

Additionally, to send `GET` requests to `/goform/goform_get_cmd_process`, you need to provide `_=${unix_timestamp}`
in the request parameter, where `unix_timestamp` is the current Unix timestamp in milliseconds.

#### `LD` & `RD` Tokens

To obtain the `LD` token, you need to make a `GET` request to `/goform/goform_get_cmd_process`:

```bash
curl 'https://192.168.1.1/goform/goform_get_cmd_process?isTest=false&cmd=LD&_=${unix_timestamp}' \
--header 'Referer: https://192.168.1.1/index.html'
```

Similarly, the `RD` token is obtained by sending a `GET` request to `/goform/goform_get_cmd_process` as well:

```bash
curl 'https://192.168.1.1/goform/goform_get_cmd_process?isTest=false&cmd=RD&_=${unix_timestamp}' \
--header 'Referer: https://192.168.1.1/index.html'
```

#### `AD` Token

The `AD` token is different from `LD` and `RD`, in that you must calculate it
instead of obtaining it from the router. You need the following values beforehand:

- `WA_INNER_VERSION` (a.k.a. the router's firmware version)
- `CR_VERSION`<sup>[[1]](#note-1)</sup>
- [`RD`](#ld--rd-tokens)

The token is calculated as follows:

```javascript
var AD = SHA256(SHA256(WA_INNER_VERSION + CR_VERSION) + AD);
```

<sup><a name="note-1">[1]</a></sup> I'm not certain of what `CR_VERSION` is supposed to represent; my router returns an empty string when 
requested via `/goform/goform_get_cmd_process`.