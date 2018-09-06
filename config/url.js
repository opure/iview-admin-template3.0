import env from './env'

const DEV_URL = 'http://localhost:8111/api/v2'
const PRO_URL = 'http://localhost:8111/api/v2'

export default env === 'development' ? DEV_URL : PRO_URL
