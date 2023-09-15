import oauth2 from 'discord-oauth2'
import { Router } from 'express'

const oauth = new oauth2({
	clientId: [process.env.clientId],
	clientSecret: process.env.clientSecret,
	redirectUri: process.env.redirectUri
})

const url = await oauth.generateAuthUrl({ scope: ['identify'] })

export default new Router()

.get('/auth', async (req, res) => {
	if(!req?.query?.code) return res.redirect(url) 
	
	const {access_token} = await oauth.tokenRequest({
		code: req.query.code,
		grantType: 'authorization_code'
	})
	
	let user = await oauth.getUser(access_token)
	
	if(user.id != process.env.ownerId) return res.end('no')
	
	req.session.isLoggedIn = true
	
	res.redirect('/')
})

.use((req, res, next) => {
	if(req?.session?.isLoggedIn) return next()
	res.redirect(url)
})