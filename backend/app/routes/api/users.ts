import router from 'express'

import { registerController, loginController, tokenInfoController, unsubscribeController, registerValidation } from '../../controllers/users'

require('dotenv').config()

router.post('/register', registerValidation, async (req, res) => {
  await registerController(req, res)
})

router.post('/login', async (req, res) => {
  await loginController(req, res)
})

router.post('/tokeninfo', async (req, res) => {
  await tokenInfoController(req, res)
})
router.post('/unsubscribe', async (req, res) => {
  await unsubscribeController(req, res)
})

export default router
