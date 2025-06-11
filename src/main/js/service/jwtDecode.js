export function jwtDecode(t) {
    let encoded = t.split('.');
    let token = {
      header: JSON.parse(window.atob(encoded[0])),
      payload: JSON.parse(window.atob(encoded[1]))
    };
    return (token);
  }