const otpsSchema = `
  CREATE TABLE IF NOT EXISTS otp_verifications (
      id VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(20),
      otp VARCHAR(6) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
  )
`;


export default otpsSchema;
