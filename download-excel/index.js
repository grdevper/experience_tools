/**
 * 下载
 * @params:
 * url<string>:下载地址
 * timeout<number>: 超时时间
 * headers<object>: 自定义请求头
 * errCallback<func>: 下载失败回调函数
 * successCallback<func>: 下载成功回调函数
 * type<string>: 请求方式
 * payload<object>: 接口参数请求
 * downloading<func>: 下载中
 * */
/**
 * a标签也可以
 * 需要服务端设置:context.Response.AddHeader("Access-Control-Expose-Headers", "content-disposition");
 * 拿到文件名设置下载文件名
 * */

export const downloadByUrl = (params) => {
    const {url, headers, errCallback, type, payload, timeout, successCallback, downloading} = params;
    downloading && downloading(true);
    const _userInfo = window.sessionStorage.getItem('userInfo');
    const _type = type || 'get';
    if (!_userInfo) {
        errCallback ? errCallback('非法操作') : message.error('非法操作');
        return;
    }
    const userInfo = JSON.parse(_userInfo);
    const _headers = {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded",
        _tk: userInfo.token || "-1",
        _uid: userInfo.user_id || "-1",
        _un: encodeURIComponent(userInfo.user_name) || "-1",
        _type: userInfo.type || "-1",
        _oid: userInfo.oid || "-1",
        _org_name: userInfo._org_name || "-1",
        _menu_id: cookie.get('_menu_id') || "-1",
    };
    if (url.indexOf("/score/mall") !== -1) {
        _headers.access_key = config.mixmallAccessKey;
    }
    axios({
        url,
        method: _type,
        headers: _headers,
        params: _type.toLowerCase() === 'get' ? payload : null,
        data: _type.toLowerCase() === 'post' ? payload : null,
        timeout: timeout || 5000,
        responseType: 'blob',
    }).then((res) => {
        if(res.status === 200) {
            const blob = new Blob([res.data]);
            const objUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = objUrl;
            document.body.appendChild(link);
            link.setAttribute('download', 'test.xls');
            link.click();
            document.body.removeChild(link); //删除下载标签
            URL.revokeObjectURL(objUrl); //释放掉blob对象
            successCallback && successCallback(res.data);
        } else {
            errCallback ? errCallback('网络错误') : message.error('网络错误');
        }
        downloading && downloading(false);
    }).catch((err) => {
        downloading && downloading(false);
        errCallback ? errCallback(err) : message.error('网络错误');
    });
};
