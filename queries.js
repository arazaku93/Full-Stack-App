const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      return response.status(500).json({ error: error.message })
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(500).json({ error: error.message })
    }
    if (results.rows.length === 0) {
      return response.status(404).json({ error: 'User not found' })
    }
    response.status(200).json(results.rows[0])
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      return response.status(500).json({ error: error.message })
    }
    response.status(201).json(results.rows[0])
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id],
    (error, results) => {
      if (error) {
        return response.status(500).json({ error: error.message })
      }
      if (results.rows.length === 0) {
        return response.status(404).json({ error: 'User not found' })
      }
      response.status(200).json(results.rows[0])
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id], (error, results) => {
    if (error) {
      return response.status(500).json({ error: error.message })
    }
    if (results.rows.length === 0) {
      return response.status(404).json({ error: 'User not found' })
    }
    response.status(200).json({ message: `User deleted with ID: ${id}`, user: results.rows[0] })
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}