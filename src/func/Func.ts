export const getUser = async () => {
    const res = await fetch(`/api/auth/user`, {
        method : 'GET'
    });
    const user = await res.json();
    return user;
}