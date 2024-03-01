import AppDataSouruce from '../ormconfig'
import { User } from './user/user.entity'

AppDataSouruce.initialize()
  .then(async () => {
    const res = await AppDataSouruce.manager.find(User)

    console.log("🚀 AppDataSouruce.initialize():", res)
  })
