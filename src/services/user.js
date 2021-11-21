import { requestGet, requestPut, requestPost } from '../utils/request'

export async function testApi(payload) {
  return requestPost('https://qqlykm.cn/api/yan/gc.php', payload)
}
