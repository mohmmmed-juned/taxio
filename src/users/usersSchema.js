const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NULL,
      images LONGTEXT NULL, -- Adding the images column with LONGTEXT datatype
      country_code VARCHAR(20) NULL,
      phone VARCHAR(20) NULL,
      email VARCHAR(255) NULL,
      gender VARCHAR(255) NULL,
      user_type bigint(20) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
  )
`;

export default userSchema;
