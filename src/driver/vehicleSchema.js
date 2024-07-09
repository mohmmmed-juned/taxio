const vehicleSchema = `
    CREATE TABLE IF NOT EXISTS vehicles (
        id BIGINT(20) UNSIGNED AUTO_INCREMENT NOT NULL,
        driver_id VARCHAR(255) NULL,
        vehicle_type VARCHAR(255) NULL,
        vehicle_name VARCHAR(255) NULL,
        vehicle_make VARCHAR(255) NULL,
        vehicle_model VARCHAR(255) NULL,
        vehicle_year VARCHAR(255) NULL,
        vehicle_reg_number VARCHAR(255) NULL,
        vehicle_color VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX (driver_id)
    )
`;

export default vehicleSchema;
