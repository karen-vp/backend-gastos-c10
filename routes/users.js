/* Importing the express module and creating an instance of it. */
const express = require('express')
const app = express.Router()
const Usuario = require('../models/Usuario') // NUESTRO MODELO PARA PERMITIR GENERAR O MODIFICAR USUARIOS CON LA BASE DE DATOS
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/authorization')

app.get('/obtener', async (req, res) => {
	try {
		const usuarios = await Usuario.find({})
		res.json({usuarios})
	} catch (error) {
		res.status(500).json({ msg: 'Hubo un error obteniendo los datos' })
	}
})

// CREAR UN USUARIO JWT
app.post('/crear', async (req, res) => {
	const { username, email, password } = req.body // OBTENER USUARIO, EMAIL Y PASSWORD DE LA PETICIÓN

	try {
		const salt = await bcryptjs.genSalt(10)
		const hashedPassword = await bcryptjs.hash(password, salt)
		const newUser = await Usuario.create({
			username, email, password : hashedPassword
		})
		const payload = {
			user : {
				id : newUser._id
			}

		}

		jwt.sign(
			payload, 
			process.env.SECRET,
			{
				expiresIn : 360000
			}, 
			(error,token)=>{
				if(error)throw error
				res.json({token})
			}
		)

	} catch (error) {
		return res.status(400).json({
			msg: error,
		})
	}
})

// INICIAR SESIÓN
app.post('/login', async (req, res) => {
	const { email, password } = req.body

	try {
	} catch (error) {
		res.json({ msg: 'Hubo un error', error })
	}
})

app.get('/verificar', auth, async (req, res) => {
	try {
	} catch (error) {
		// EN CASO DE ERROR DEVOLVEMOS UN MENSAJE CON EL ERROR
		res.status(500).json({
			msg: 'Hubo un error',
			error,
		})
	}
})

app.put('/actualizar', auth, async (req, res) => {
	const { nombre, email } = req.body
	try {
	} catch (error) {
		res.status(500).json({
			msg: 'Hubo un error actualizando la Usuario',
		})
	}
})

module.exports = app
