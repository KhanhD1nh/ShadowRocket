var obj;

try {
    obj = JSON.parse($response.body);
} catch (e) {
    obj = {};
}

if (!obj.data) obj.data = {};

obj.data.premiumAccess = true;

var body = JSON.stringify(obj).replace(/"subscription":\w+/g, '"subscription":true');

$done({
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: body
});
