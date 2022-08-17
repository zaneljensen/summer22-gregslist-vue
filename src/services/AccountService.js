import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { server } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await server.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }


  async editAccount(accountData) {
    const res = await server.put('/account', accountData)
    let account = new Account(res.data)
    AppState.account = account
  }

}

export const accountService = new AccountService()
