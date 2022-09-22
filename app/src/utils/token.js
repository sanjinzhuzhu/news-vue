//存储token
export const setToken = (token) =>{
    localStorage.setItem('TOKEN',token);
};
export const getToken = (token) =>
    localStorage.getItem('TOKEN',token);


//清除本地存储的token
export const removeToken=()=>{
    localStorage.removeItem("TOKEN")
}