import axios from 'axios';

let appKey = '0626471390b7bc51bd33043d67de09f56bdc4c3743284e5c65cbe282c738e795';

export default function api(url, data) {
	let timestamp = Date.now();

	return axios
		.post(`https://mock.biaoyansu.com/api/1/${url}`, data, {
			headers : {
				'BIAO-MOCK-APP-KEY'   : appKey,
				'BIAO-MOCK-TIMESTAMP' : timestamp,
				'BIAO-MOCK-SIGNATURE' : sign(appKey, timestamp)
			}
		})
		.then((r) => {
			return r.data;
		});
}

/**
     * 签名
     * @param appKey 应用的键，可在应用管理中拿到：https://mock.biaoyansu.com/app
     * @param timestamp 时间戳
     * @return {string}
     */
function sign(appKey, timestamp) {
	return btoa(appKey + timestamp);
}
