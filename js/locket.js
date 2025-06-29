const mapping = {
  "%E8%BD%A6%E7%A5%A8%E7%A5%A8": ["vip+watch_vip"],
  Locket: ["Gold"],
};

const headers =
  $request.headers["User-Agent"] || $request.headers["user-agent"];
const obj = JSON.parse($response.body);

obj.Attention =
  "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

const subscriptions = {
  is_sandbox: !1,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2003-10-16T13:00:00Z",
  purchase_date: "2003-10-16T13:00:00Z",
  store: "app_store",
};

const entitlements = {
  grace_period_expires_date: null,
  purchase_date: "2003-10-16T13:00:00Z",
  product_identifier: "com.khanhdinh.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z",
};

const match = Object.keys(mapping).find((e) => headers.includes(e));

if (match) {
  let [e, s] = mapping[match];

  if (s) {
    entitlements.product_identifier = s;
    obj.subscriber.entitlements[s] = subscriptions;
  } else {
    obj.subscriber.subscriptions["com.khanhdinh.premium.yearly"] =
      subscriptions;
    obj.subscriber.entitlements[e] = entitlements;
  }
} else {
  obj.subscriber.subscriptions["com.khanhdinh.premium.yearly"] = subscriptions;
  obj.subscriber.entitlements.pro = entitlements;
}

$done({ body: JSON.stringify(obj) });
