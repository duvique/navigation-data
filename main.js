
const apiUrl = 'http://localhost:3005'

const main = () => {
  const session_id = uuid()
  const hash_user = uuid()

  const { href: url, host, protocol, pathname: endpoint } = window.location;
  const url_base = `${protocol}//${host}`

  console.group('URLS');
  console.log({ url });
  console.log({ url_base });
  console.log({ endpoint });
  console.groupEnd();

  postNavigation({
    session_id,
    hash_user,
    created_at: new Date().toLocaleString(),// Now().toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " "),
    url,
    url_base,
    endpoint
  })


}

function postNavigation(navigation) {

  const headers = new Headers();
  headers.append("Content-Type", "apllication/json");
  headers.append("Accept", "apllication/json");

  fetch(`${apiUrl}/navigation`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(navigation)
  })
    .then(async (res) => {
      const response = await res.json();
      console.group("Response")
      console.log(response);
      console.groupEnd()

      return response;
    })
    .then((response) => console.log(`Cadastro da navegação: ${response?.status ? "OK" : "NOK"}`) && console.log({ response }))
    .catch(err => console.log(`Erro no cadastro de navegação: ${err}`))
}

function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


window.onload = main;

