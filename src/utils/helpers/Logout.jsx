

export function Logout() {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken;

  if (!token) {
    localStorage.removeItem("token");
    window.location.href = "/auth-login";
  }

  return <></>;
}
