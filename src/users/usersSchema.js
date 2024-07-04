const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NULL,
      images LONGTEXT NULL, -- Adding the images column with LONGTEXT datatype
      phone VARCHAR(20) UNIQUE,
      email VARCHAR(255) NULL,
      gender VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
  )
`;


export default userSchema;
