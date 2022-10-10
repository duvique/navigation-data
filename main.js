
const apiUrl = 'http://localhost:3005'
const api_token = 'a4f58ef4-2abb-46b6-ba56-740d63498d53';

const main = () => {
  const { href: url, host, protocol, pathname: endpoint } = window.location;

  postNavigation({
    session_id: getUuidCookie({ cookieName: "session_id", renew: true }),
    hash_user: getUuidCookie({ cookieName: "hash_user", age: 24 * 60 * 60 }),
    created_at: new Date().toLocaleString(),
    url,
    url_base: `${protocol}//${host}`,
    endpoint
  })
}

function postNavigation(navigation) {

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "apllication/json");
  headers.append("Authorization", `Bearer ${api_token}`)

  fetch(`${apiUrl}/navigation`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(navigation)
  })
    .then((res) => res.json())
    .then((data) => console.log(`Cadastro da navegação: ${data?.status ? "OK" : "NOK"}`) & console.log({ data }))
    .catch(err => console.log(`Erro durante o cadastro da navegação para endpoint '${navigation?.endpoint || 'não disponível'}': ${err}`))
}

function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function getUuidCookie({ cookieName, age, renew }) {
  const existingCookie = checkCookie(cookieName);

  if (existingCookie && renew) {
    createCookie(cookieName, existingCookie, age, renew);
  }
  return existingCookie || createCookie(cookieName, uuid(), age, renew)
}

function checkCookie(name) {
  var match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));

  return match ? match[2] : undefined
}

function createCookie(name, value, age, renew) {
  const maxAge = age || 5 * 60;

  if (renew) {
    createCookie(name, undefined, 0)
  }

  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/;`;

  return value;
}

window.onload = main;